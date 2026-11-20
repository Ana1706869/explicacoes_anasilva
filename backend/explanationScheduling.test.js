const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

process.env.JWT_SECRET = "explanation-scheduling-test-secret";

const Explicandos = require("./modelos/Explicandos");
const Explicacoes = require("./modelos/Explicacoes");
const { app } = require("./server");

const studentId = "507f1f77bcf86cd799439011";
const studentToken = jwt.sign(
  { id: studentId, email: "aluno@example.com", role: "Explicando" },
  process.env.JWT_SECRET,
);
const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);

let server;
let baseUrl;
let existingLessons = [];
let savedLessons = [];
let originalFindById;
let originalFindOne;
let originalFind;
let originalSave;

before(async () => {
  // Substitui o acesso à base de dados por dados em memória para testar apenas a rota.
  originalFindById = Explicandos.findById;
  originalFindOne = Explicacoes.findOne;
  originalFind = Explicacoes.find;
  originalSave = Explicacoes.prototype.save;

  Explicandos.findById = async (id) => (String(id) === studentId ? { _id: studentId } : null);
  Explicacoes.findOne = async (query) =>
    existingLessons.find(
      (lesson) =>
        lesson.data === query.data &&
        lesson.horaInicio < query.horaInicio.$lt &&
        lesson.horaFim > query.horaFim.$gt,
    ) || null;
  Explicacoes.find = async () => [];
  Explicacoes.prototype.save = async function save() {
    savedLessons.push(this);
    return this;
  };

  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  Explicandos.findById = originalFindById;
  Explicacoes.findOne = originalFindOne;
  Explicacoes.find = originalFind;
  Explicacoes.prototype.save = originalSave;
});

const postLesson = async (horaInicio, horaFim) => {
  const response = await fetch(`${baseUrl}/explicacoes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${studentToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      explicandoId: studentId,
      data: futureDate,
      horaInicio,
      horaFim,
      linguagem: "JavaScript",
      tipo: "On-line",
      pagamento: "MBWay",
    }),
  });
  return { status: response.status, body: await response.json() };
};

test("lista apenas explicações a partir do dia atual", async () => {
  let filtroRecebido;
  const estadoOriginal = mongoose.connection.readyState;
  const dataAtual = new Date();
  dataAtual.setHours(0, 0, 0, 0);
  Explicacoes.find = async (filtro) => {
    filtroRecebido = filtro;
    return [];
  };

  mongoose.connection.readyState = 1;
  let response;
  try {
    response = await fetch(`${baseUrl}/explicacoes`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
  } finally {
    mongoose.connection.readyState = estadoOriginal;
  }

  assert.equal(response.status, 200);
  assert.deepEqual(filtroRecebido, {
    explicandoId: studentId,
    data: { $gte: dataAtual },
  });
});

test("recusa uma marcação cujo intervalo se sobrepõe a uma explicação existente", async () => {
  existingLessons = [
    { data: futureDate, horaInicio: "10:00", horaFim: "12:00" },
  ];
  savedLessons = [];

  const response = await postLesson("11:00", "13:00");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { sucesso: false, confirmacao: "Não" });
  assert.equal(savedLessons.length, 0);
});

test("aceita horários contíguos sem sobreposição", async () => {
  existingLessons = [
    { data: futureDate, horaInicio: "10:00", horaFim: "11:00" },
  ];
  savedLessons = [];

  const response = await postLesson("11:00", "13:00");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { sucesso: true, confirmacao: "Pendente" });
  assert.equal(savedLessons.length, 1);
});

test("aceita uma explicação que termina exatamente às 18:00", async () => {
  existingLessons = [];
  savedLessons = [];

  const response = await postLesson("16:00", "18:00");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { sucesso: true, confirmacao: "Pendente" });
  assert.equal(savedLessons.length, 1);
});

test("rejeita início após as 16:00 e fim após as 18:00", async () => {
  existingLessons = [];
  savedLessons = [];

  const inicioTardio = await postLesson("16:30", "18:30");
  const fimTardio = await postLesson("15:00", "18:30");

  assert.equal(inicioTardio.status, 400);
  assert.equal(fimTardio.status, 400);
  assert.equal(savedLessons.length, 0);
});

test("rejeita explicações com início às 12:00, 12:30 ou 13:00", async () => {
  existingLessons = [];
  savedLessons = [];

  const horaDeAlmoco12 = await postLesson("12:00", "14:00");
  const horaDeAlmoco1230 = await postLesson("12:30", "14:30");
  const horaDeAlmoco13 = await postLesson("13:00", "15:00");

  assert.equal(horaDeAlmoco12.status, 400);
  assert.equal(horaDeAlmoco1230.status, 400);
  assert.equal(horaDeAlmoco13.status, 400);
  assert.equal(savedLessons.length, 0);
});
