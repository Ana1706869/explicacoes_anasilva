const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const { Readable, Writable } = require("node:stream");

process.env.JWT_SECRET = "online-room-integration-test-secret";

const Explicacoes = require("./modelos/Explicacoes");
const { server, wss } = require("./server");

const lessonOneId = "507f1f77bcf86cd799439021";
const lessonTwoId = "507f1f77bcf86cd799439022";
const studentOneId = "507f1f77bcf86cd799439011";
const studentTwoId = "507f1f77bcf86cd799439012";
const studentOne = { id: studentOneId, email: "um@example.com", nome: "Aluno Um" };
const studentTwo = { id: studentTwoId, email: "dois@example.com", nome: "Aluno Dois" };
const teacher = {
  id: "507f1f77bcf86cd799439013",
  email: "explicador@example.com",
  nome: "Explicador",
};
const lessons = new Map([
  [lessonOneId, { _id: lessonOneId, explicandoId: studentOneId, tipo: "On-line", confirmacao: "Confirmada" }],
  [lessonTwoId, { _id: lessonTwoId, explicandoId: studentTwoId, tipo: "On-line", confirmacao: "Confirmada" }],
]);
const recordingFiles = [];

class TestGridFSBucket {
  constructor() {}

  find(query) {
    const matches = () =>
      recordingFiles.filter((file) =>
        Object.entries(query).every(([key, value]) => {
          if (key === "_id") return String(file._id) === String(value);
          if (key === "metadata.lessonId") {
            return file.metadata.lessonId === value;
          }
          return false;
        }),
      );
    const cursor = {
      sort: () => cursor,
      toArray: async () => matches(),
      next: async () => matches()[0] || null,
    };
    return cursor;
  }

  openUploadStream(filename, options) {
    const chunks = [];
    const upload = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
      final(callback) {
        const data = Buffer.concat(chunks);
        recordingFiles.push({
          _id: upload.id,
          filename,
          contentType: options.contentType,
          metadata: options.metadata,
          uploadDate: new Date(),
          length: data.length,
          data,
        });
        callback();
      },
    });
    upload.id = new mongoose.mongo.ObjectId();
    return upload;
  }

  openDownloadStream(id) {
    const file = recordingFiles.find((entry) => String(entry._id) === String(id));
    return Readable.from([file.data]);
  }

  async delete(id) {
    const index = recordingFiles.findIndex((entry) => String(entry._id) === String(id));
    if (index >= 0) recordingFiles.splice(index, 1);
  }
}

let originalFindById;
let originalFindByIdAndDelete;
let originalFindByIdAndUpdate;
let originalReadyState;
let originalDatabase;
let originalGridFSBucketDescriptor;
let baseUrl;

const makeToken = (user, role = "Explicando") =>
  jwt.sign(
    { id: user.id, email: user.email, nome: user.nome, role },
    process.env.JWT_SECRET,
  );

const connect = (user, role) =>
  new Promise((resolve, reject) => {
    const token = encodeURIComponent(makeToken(user, role));
    const socket = new WebSocket(`${baseUrl.replace("http", "ws")}/ws?token=${token}`);
    socket.once("open", () => resolve(socket));
    socket.once("error", reject);
  });

const waitForMessage = (socket, type) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      socket.off("message", onMessage);
      reject(new Error(`Timeout à espera de mensagem ${type}`));
    }, 2000);
    const onMessage = (raw) => {
      const message = JSON.parse(raw.toString());
      if (message.type !== type) return;
      clearTimeout(timeout);
      socket.off("message", onMessage);
      resolve(message);
    };
    socket.on("message", onMessage);
  });

const joinRoom = async (socket, roomId, peerId) => {
  const roomUpdate = waitForMessage(socket, "room-update");
  const joined = waitForMessage(socket, "join-room");
  socket.send(JSON.stringify({ type: "join-room", roomId, peerId }));
  return { roomUpdate: await roomUpdate, joined: await joined };
};

const closeSocket = (socket) =>
  new Promise((resolve) => {
    if (socket.readyState === WebSocket.CLOSED) {
      resolve();
      return;
    }
    socket.once("close", resolve);
    socket.close();
  });

before(async () => {
  // Usa explicações em memória e um servidor local para testar o protocolo WebSocket completo.
  originalReadyState = mongoose.connection.readyState;
  originalDatabase = mongoose.connection.db;
  originalGridFSBucketDescriptor = Object.getOwnPropertyDescriptor(
    mongoose.mongo,
    "GridFSBucket",
  );
  mongoose.connection.readyState = 1;
  mongoose.connection.db = {};
  Object.defineProperty(mongoose.mongo, "GridFSBucket", {
    configurable: true,
    value: TestGridFSBucket,
  });
  originalFindById = Explicacoes.findById;
  originalFindByIdAndDelete = Explicacoes.findByIdAndDelete;
  originalFindByIdAndUpdate = Explicacoes.findByIdAndUpdate;
  Explicacoes.findById = async (id) => lessons.get(String(id)) || null;
  Explicacoes.findByIdAndDelete = async (id) => {
    const lesson = lessons.get(String(id)) || null;
    lessons.delete(String(id));
    return lesson;
  };
  Explicacoes.findByIdAndUpdate = async (id, updates) => {
    const lesson = lessons.get(String(id)) || null;
    if (lesson) Object.assign(lesson, updates);
    return lesson;
  };
  server.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  for (const socket of wss.clients) socket.terminate();
  await new Promise((resolve) => server.close(resolve));
  Explicacoes.findById = originalFindById;
  Explicacoes.findByIdAndDelete = originalFindByIdAndDelete;
  Explicacoes.findByIdAndUpdate = originalFindByIdAndUpdate;
  mongoose.connection.readyState = originalReadyState;
  mongoose.connection.db = originalDatabase;
  Object.defineProperty(
    mongoose.mongo,
    "GridFSBucket",
    originalGridFSBucketDescriptor,
  );
});

test("utilizadores em explicações diferentes não veem nomes após a atualização da página", async () => {
  const firstUserSocket = await connect(studentOne);
  const firstJoin = await joinRoom(firstUserSocket, lessonOneId, "peer-one");
  assert.deepEqual(firstJoin.roomUpdate.userNames, { "peer-one": studentOne.nome });

  let secondUserSocket = await connect(studentTwo);
  const secondJoin = await joinRoom(secondUserSocket, lessonTwoId, "peer-two-before-refresh");
  assert.deepEqual(secondJoin.roomUpdate.userNames, { "peer-two-before-refresh": studentTwo.nome });
  assert.equal(JSON.stringify(secondJoin.roomUpdate).includes(studentOne.nome), false);

  await closeSocket(secondUserSocket);
  secondUserSocket = await connect(studentTwo);
  const refreshedJoin = await joinRoom(secondUserSocket, lessonTwoId, "peer-two-after-refresh");

  assert.deepEqual(refreshedJoin.roomUpdate.userNames, {
    "peer-two-after-refresh": studentTwo.nome,
  });
  assert.equal(JSON.stringify(refreshedJoin.roomUpdate).includes(studentOne.nome), false);
  await closeSocket(secondUserSocket);
  await closeSocket(firstUserSocket);
});

test("aluno e explicador da mesma explicação partilham a lista de participantes", async () => {
  const studentSocket = await connect(studentOne);
  const studentJoin = await joinRoom(studentSocket, lessonOneId, "peer-student");
  assert.deepEqual(studentJoin.roomUpdate.userNames, {
    "peer-student": studentOne.nome,
  });

  const studentUpdate = waitForMessage(studentSocket, "room-update");
  const teacherSocket = await connect(teacher, "Explicador");
  const teacherJoin = await joinRoom(teacherSocket, lessonOneId, "peer-teacher");
  const updatedStudentRoom = await studentUpdate;
  const expectedNames = {
    "peer-student": studentOne.nome,
    "peer-teacher": teacher.nome,
  };

  assert.deepEqual(teacherJoin.roomUpdate.userNames, expectedNames);
  assert.deepEqual(updatedStudentRoom.userNames, expectedNames);
  await closeSocket(teacherSocket);
  await closeSocket(studentSocket);
});

test("um aluno não pode entrar na sala de uma explicação de outro aluno", async () => {
  const socket = await connect(studentOne);
  const errorMessage = waitForMessage(socket, "error");
  socket.send(JSON.stringify({
    type: "join-room",
    roomId: lessonTwoId,
    peerId: "peer-unauthorized",
  }));

  assert.match((await errorMessage).message, /Sem acesso/);
  await closeSocket(socket);
});

test("identifica gravações com MIME genérico pela assinatura e rejeita ficheiros inválidos", async () => {
  recordingFiles.length = 0;
  const headers = { Authorization: `Bearer ${makeToken(studentOne)}` };
  const webmFormData = new FormData();
  webmFormData.append(
    "recording",
    new Blob([Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x00, 0x00, 0x00, 0x00])], {
      type: "application/octet-stream",
    }),
    "gravacao.webm",
  );

  const webmResponse = await fetch(
    `${baseUrl}/explicacoes/${lessonOneId}/recordings`,
    { method: "POST", headers, body: webmFormData },
  );
  const recording = await webmResponse.json();

  assert.equal(webmResponse.status, 201);
  assert.equal(
    recordingFiles.find((file) => String(file._id) === recording.id).contentType,
    "video/webm",
  );

  const invalidFormData = new FormData();
  invalidFormData.append(
    "recording",
    new Blob(["not a video"], { type: "application/octet-stream" }),
    "gravacao.webm",
  );
  const invalidResponse = await fetch(
    `${baseUrl}/explicacoes/${lessonOneId}/recordings`,
    { method: "POST", headers, body: invalidFormData },
  );

  assert.equal(invalidResponse.status, 415);
  assert.equal(
    (await invalidResponse.json()).message,
    "O ficheiro enviado não é um vídeo suportado",
  );
});

test("partilha gravações com os dois participantes e protege-as de outros explicandos", async () => {
  recordingFiles.length = 0;
  lessons.set(lessonOneId, {
    _id: lessonOneId,
    explicandoId: studentOneId,
    tipo: "On-line",
    confirmacao: "Confirmada",
  });

  const studentSocket = await connect(studentOne);
  await joinRoom(studentSocket, lessonOneId, "recording-student");
  const teacherSocket = await connect(teacher, "Explicador");
  await joinRoom(teacherSocket, lessonOneId, "recording-teacher");
  const studentNotification = waitForMessage(studentSocket, "recording-created");
  const teacherNotification = waitForMessage(teacherSocket, "recording-created");
  const videoBytes = Buffer.concat([
    Buffer.from([0x1a, 0x45, 0xdf, 0xa3]),
    Buffer.from("video bytes"),
  ]);

  const formData = new FormData();
  formData.append(
    "recording",
    new Blob([videoBytes], { type: "video/webm" }),
    "aula.webm",
  );
  const uploadResponse = await fetch(
    `${baseUrl}/explicacoes/${lessonOneId}/recordings`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${makeToken(studentOne)}` },
      body: formData,
    },
  );
  const recording = await uploadResponse.json();

  assert.equal(uploadResponse.status, 201);
  assert.equal((await studentNotification).recording.id, recording.id);
  assert.equal((await teacherNotification).recording.id, recording.id);

  const teacherListResponse = await fetch(
    `${baseUrl}/explicacoes/${lessonOneId}/recordings`,
    { headers: { Authorization: `Bearer ${makeToken(teacher, "Explicador")}` } },
  );
  assert.deepEqual((await teacherListResponse.json()).map((item) => item.id), [recording.id]);

  const downloadResponse = await fetch(
    `${baseUrl}/explicacoes/${lessonOneId}/recordings/${recording.id}`,
    { headers: { Authorization: `Bearer ${makeToken(teacher, "Explicador")}` } },
  );
  assert.deepEqual(Buffer.from(await downloadResponse.arrayBuffer()), videoBytes);

  const unauthorizedResponse = await fetch(
    `${baseUrl}/explicacoes/${lessonOneId}/recordings`,
    { headers: { Authorization: `Bearer ${makeToken(studentTwo)}` } },
  );
  assert.equal(unauthorizedResponse.status, 403);
  await closeSocket(teacherSocket);
  await closeSocket(studentSocket);
});

test("notifica o aluno quando o explicador altera a confirmação", async () => {
  const studentSocket = await connect(studentOne);
  const subscribed = waitForMessage(studentSocket, "explanation-list-subscribed");
  studentSocket.send(JSON.stringify({ type: "subscribe-explanation-list" }));
  await subscribed;

  const statusNotification = waitForMessage(
    studentSocket,
    "explanation-status-updated",
  );
  const response = await fetch(`${baseUrl}/explicacoes/${lessonOneId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${makeToken(teacher, "Explicador")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ confirmacao: "Recusada" }),
  });
  const updatedLesson = await response.json();

  assert.equal(response.status, 200);
  assert.equal(updatedLesson.confirmacao, "Recusada");
  assert.deepEqual(await statusNotification, {
    type: "explanation-status-updated",
    explanation: updatedLesson,
  });
  await closeSocket(studentSocket);
});

test("notifica a lista do explicador quando o aluno elimina uma explicação", async () => {
  const teacherSocket = await connect(teacher, "Explicador");
  const subscribed = waitForMessage(teacherSocket, "explanation-list-subscribed");
  teacherSocket.send(JSON.stringify({ type: "subscribe-explanation-list" }));
  await subscribed;

  const deletionNotification = waitForMessage(
    teacherSocket,
    "explanation-deleted",
  );
  const response = await fetch(`${baseUrl}/explicacoes/${lessonOneId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${makeToken(studentOne)}` },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await deletionNotification, {
    type: "explanation-deleted",
    explanationId: lessonOneId,
  });
  await closeSocket(teacherSocket);
});
