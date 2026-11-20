// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StrictMode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ExplicacoesOnline from "../ExplicacoesOnline";
import Forum from "../Forum";

vi.mock("axios", () => ({
  default: {
    defaults: { headers: {} },
    interceptors: { request: { use: vi.fn() } },
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("peerjs", () => ({
  default: class {
    constructor() {
      this.id = "peer-self";
    }
    on(event, callback) {
      if (event === "open") callback("peer-self");
      return this;
    }
    destroy() {}
  },
  StreamConnection: class {},
}));

// Simula transporte, gravação e armazenamento local sem depender de dispositivos reais.
class TestWebSocket {
  static OPEN = 1;
  static instances = [];

  constructor() {
    this.readyState = TestWebSocket.OPEN;
    this.send = vi.fn();
    this.close = vi.fn();
    TestWebSocket.instances.push(this);
  }
}

class TestMediaRecorder {
  constructor(stream) {
    this.stream = stream;
    this.mimeType = "video/webm";
  }
  start() {}
  stop() {
    this.ondataavailable({ data: new Blob(["recording"]) });
    this.onstop();
  }
}

const makeStream = () => {
  const track = { stop: vi.fn() };
  return {
    getVideoTracks: () => [track],
    getAudioTracks: () => [track],
    getTracks: () => [track],
  };
};

const renderOnline = async ({ strictMode = false } = {}) => {
  const room = (
    <MemoryRouter initialEntries={["/ExplicacoesOnline/lesson-1"]}>
      <Routes>
        <Route
          path="/ExplicacoesOnline/:explicacaoId"
          element={<ExplicacoesOnline />}
        />
      </Routes>
    </MemoryRouter>
  );
  render(strictMode ? <StrictMode>{room}</StrictMode> : room);
  await screen.findByText("Explicações on-line");
  await waitFor(() => expect(TestWebSocket.instances).toHaveLength(1));
  return TestWebSocket.instances[0];
};

beforeEach(() => {
  sessionStorage.clear();
  TestWebSocket.instances = [];
  vi.clearAllMocks();
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("chat e ficheiros", () => {
  let sharedRecordings;

  beforeEach(() => {
    sharedRecordings = [];
    sessionStorage.setItem("emailUsuario", "aluno@example.com");
    sessionStorage.setItem("token", "token-teste");
    sessionStorage.setItem("explicandoId", "student-id");
    axios.get.mockImplementation((url) => {
      if (url === "/explicacoes/lesson-1/recordings") {
        return Promise.resolve({ data: [...sharedRecordings] });
      }
      if (url.includes("/recordings/")) {
        return Promise.resolve({
          data: new Blob(["recording"], { type: "video/webm" }),
        });
      }
      return url.endsWith("/explicacoes/lesson-1")
        ? Promise.resolve({
            data: {
              _id: "lesson-1",
              confirmacao: "Confirmada",
              tipo: "On-line",
            },
          })
        : Promise.resolve({
            data: { nome: "Aluno Teste", explicandoId: "student-id" },
          });
    });
    axios.post.mockImplementation((_url, formData) => {
      const file = formData.get("recording");
      const recording = {
        id: `recording-${sharedRecordings.length + 1}`,
        name: file.name,
        uploadedAt: new Date().toISOString(),
        size: file.size,
        mimeType: file.type,
      };
      sharedRecordings.push(recording);
      return Promise.resolve({ data: recording });
    });
    vi.stubGlobal("WebSocket", TestWebSocket);
    vi.stubGlobal("MediaRecorder", TestMediaRecorder);
    vi.stubGlobal(
      "MediaStream",
      class {
        constructor(tracks) {
          this.tracks = tracks;
        }
        getTracks() {
          return this.tracks;
        }
      },
    );
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(makeStream()),
        getDisplayMedia: vi.fn().mockResolvedValue(makeStream()),
      },
    });
  });

  it("pede a câmara apenas uma vez quando StrictMode repete os efeitos", async () => {
    await renderOnline({ strictMode: true });

    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledTimes(1);
  });

  it("mostra um aviso quando a câmara já está a ser utilizada", async () => {
    navigator.mediaDevices.getUserMedia.mockRejectedValue(
      new DOMException("Device in use", "NotReadableError"),
    );

    await renderOnline();

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Verifique as permissões");
  });

  it("mostra uma única mensagem quando o servidor devolve o eco do chat", async () => {
    const socket = await renderOnline();
    act(() => socket.onopen());
    expect(JSON.parse(socket.send.mock.calls[0][0])).toMatchObject({
      type: "join-room",
      roomId: "lesson-1",
      peerId: "peer-self",
    });
    fireEvent.change(screen.getByPlaceholderText("Mensagem"), {
      target: { value: "Olá, explicador" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    const sentMessage = JSON.parse(socket.send.mock.calls.at(-1)[0]);
    act(() => {
      socket.onmessage({
        data: JSON.stringify({
          ...sentMessage,
          type: "chat-message",
          sender: "Aluno Teste",
        }),
      });
    });
    expect(await screen.findAllByText("Olá, explicador")).toHaveLength(1);
  });

  it("mostra uma única cópia do ficheiro enviado depois do eco do servidor", async () => {
    const socket = await renderOnline();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            originalname: "apontamentos.pdf",
            url: "/uploads/apontamentos.pdf",
          }),
      }),
    );
    const user = userEvent.setup();
    const file = new File(["conteúdo"], "apontamentos.pdf", {
      type: "application/pdf",
    });
    await user.upload(document.querySelector('input[type="file"]'), file);
    await user.click(screen.getByRole("button", { name: "Enviar Ficheiro" }));

    await waitFor(() =>
      expect([
        ...document.querySelectorAll('a[href="/uploads/apontamentos.pdf"]'),
      ]).toHaveLength(1),
    );
    const sentFile = JSON.parse(socket.send.mock.calls.at(-1)[0]);
    expect(sentFile).toMatchObject({
      type: "send-file",
      id: expect.any(String),
    });

    act(() => {
      socket.onmessage({
        data: JSON.stringify({
          ...sentFile,
          type: "receive-file",
          sender: "Aluno Teste",
        }),
      });
    });

    expect([
      ...document.querySelectorAll('a[href="/uploads/apontamentos.pdf"]'),
    ]).toHaveLength(1);
  });

  it("partilha gravações entre os participantes e carrega o vídeo sob pedido", async () => {
    await renderOnline();
    const createObjectURL = vi.fn().mockReturnValue("blob:gravacao-partilhada");
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revokeObjectURL,
    });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar gravação" }));
    await screen.findByRole("button", { name: "Parar gravação" });
    fireEvent.click(screen.getByRole("button", { name: "Parar gravação" }));
    fireEvent.click(screen.getByRole("button", { name: "Iniciar gravação" }));
    await screen.findByRole("button", { name: "Parar gravação" });
    fireEvent.click(screen.getByRole("button", { name: "Parar gravação" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver gravações" }));

    expect(await screen.findByRole("dialog")).toBeTruthy();
    expect(
      screen.getAllByRole("button", { name: "Carregar gravação" }),
    ).toHaveLength(2);
    expect(sharedRecordings).toHaveLength(2);

    cleanup();
    TestWebSocket.instances = [];
    sessionStorage.setItem("emailUsuario", "explicador@example.com");
    sessionStorage.setItem("tipoUsuario", "Explicador");
    await renderOnline();
    act(() => {
      TestWebSocket.instances[0].onmessage({
        data: JSON.stringify({
          type: "recording-created",
          recording: {
            id: "recording-live",
            name: "gravacao-em-direto.webm",
            uploadedAt: new Date().toISOString(),
          },
        }),
      });
    });
    fireEvent.click(screen.getByRole("button", { name: "Ver gravações" }));
    expect(
      await screen.findAllByRole("button", { name: "Carregar gravação" }),
    ).toHaveLength(3);
    expect(screen.getByText("gravacao-em-direto.webm")).toBeTruthy();
    fireEvent.click(
      screen.getAllByRole("button", { name: "Carregar gravação" })[0],
    );
    expect(
      await screen.findByLabelText(/^Pré-visualização de gravacao-/),
    ).toBeTruthy();
    const download = screen.getByRole("link", { name: "Descarregar gravação" });
    expect(download.getAttribute("download")).toMatch(/^gravacao-.*\.webm$/);
    expect(download.href).toBe("blob:gravacao-partilhada");
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).not.toHaveBeenCalled();
  });
});

describe("fórum", () => {
  it("guarda um ficheiro enviado e disponibiliza o respetivo download", async () => {
    sessionStorage.setItem("emailUsuario", "aluno@example.com");
    sessionStorage.setItem("explicandoId", "student-id");
    const forumMessages = [];
    axios.get.mockImplementation((url) => {
      if (url === "/explicandos/aluno@example.com") {
        return Promise.resolve({
          data: { nome: "Aluno Teste", explicandoId: "student-id" },
        });
      }
      if (url === "/forum")
        return Promise.resolve({ data: [...forumMessages] });
      return Promise.reject(new Error(`Pedido inesperado: ${url}`));
    });
    axios.post.mockImplementation((_url, formData) => {
      const file = formData.get("ficheiro");
      forumMessages.push({
        nome: "Aluno Teste",
        mensagem: "",
        criadoEm: new Date().toISOString(),
        ficheiro: file.name,
      });
      return Promise.resolve({ data: { sucesso: true } });
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Forum />
      </MemoryRouter>,
    );
    const file = new File(["conteúdo"], "apontamentos.pdf", {
      type: "application/pdf",
    });
    await user.upload(document.querySelector('input[type="file"]'), file);
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const download = await screen.findByRole("link", {
      name: "apontamentos.pdf",
    });
    expect(download.getAttribute("download")).toBe("");
    expect(download.href).toContain("/uploads/apontamentos.pdf");
  });
});
