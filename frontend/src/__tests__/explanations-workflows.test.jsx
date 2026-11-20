// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import axios from "axios";
import Explicacoes from "../Explicacoes";
import ExplicacoesConfirmadasExplicador from "../ExplicacoesConfirmadasExplicador";
import ExplicacoesConfirmadasExplicando from "../ExplicacoesConfirmadasExplicando";
import ExplicacoesPendentes from "../ExplicacoesPendentes";
import { formatLessonTime, isLessonInProgress } from "../lessonTiming";

vi.mock("axios", () => ({
  default: {
    defaults: { headers: {} },
    interceptors: { request: { use: vi.fn() } },
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

// Substitui o seletor de data por inputs nativos para testar os formulários sem UI externa.
vi.mock("react-datepicker", () => ({
  default: ({ onChange, placeholderText, selected, showTimeSelectOnly }) => (
    <input
      aria-label={
        showTimeSelectOnly ? "Hora de Início" : placeholderText || "Data"
      }
      type={showTimeSelectOnly ? "time" : "date"}
      value={
        selected
          ? showTimeSelectOnly
            ? `${String(selected.getHours()).padStart(2, "0")}:${String(selected.getMinutes()).padStart(2, "0")}`
            : selected.toISOString().slice(0, 10)
          : ""
      }
      onChange={(event) => {
        if (showTimeSelectOnly) {
          const [hours, minutes] = event.target.value.split(":").map(Number);
          const selectedTime = new Date();
          selectedTime.setHours(hours, minutes, 0, 0);
          onChange(selectedTime);
          return;
        }
        onChange(new Date(`${event.target.value}T00:00:00`));
      }}
    />
  ),
}));

const student = {
  email: "aluno@example.com",
  id: "student-id",
  name: "Aluno Teste",
};
const teacher = {
  email: "explicador@example.com",
  id: "teacher-id",
  name: "Explicador Teste",
};
const futureDate = (days = 30) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};
const pastDate = () => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - 2);
  return date.toISOString().slice(0, 10);
};
const todayDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};
const currentLessonWindow = () => {
  const start = new Date();
  start.setSeconds(0, 0);
  start.setMinutes(start.getMinutes() - 1);
  const end = new Date(start.getTime() + 3 * 60 * 1000);
  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return { horaInicio: formatTime(start), horaFim: formatTime(end) };
};
const at = (date, patch = {}) => ({
  _id: "lesson-1",
  explicandoId: student.id,
  data: `${date}T12:00:00.000Z`,
  horaInicio: "10:00",
  horaFim: "12:00",
  linguagem: "JavaScript",
  tipo: "On-line",
  pagamento: "MBWay",
  confirmacao: "Pendente",
  ...patch,
});

const configureApi = (seed = []) => {
  const lessons = seed.map((lesson) => ({ ...lesson }));
  let nextId = lessons.length + 1;

  axios.get.mockImplementation((url) => {
    if (url === "/explicacoes") {
      return Promise.resolve({
        data: lessons.map((lesson) => ({ ...lesson })),
      });
    }
    if (url === "/explicandos") {
      return Promise.resolve({
        data: [{ _id: student.id, nome: student.name }],
      });
    }
    if (url === `/explicandos/${student.email}`) {
      return Promise.resolve({
        data: { explicandoId: student.id, nome: student.name },
      });
    }
    if (url === `/explicandos/${teacher.email}`) {
      return Promise.resolve({
        data: { explicandoId: teacher.id, nome: teacher.name },
      });
    }
    return Promise.reject(new Error(`Pedido inesperado: ${url}`));
  });

  axios.post.mockImplementation((url, payload) => {
    if (url !== "/explicacoes") {
      return Promise.reject(new Error(`Pedido inesperado: ${url}`));
    }
    const conflict = lessons.some(
      (lesson) =>
        lesson.data.slice(0, 10) === payload.data &&
        payload.horaInicio < lesson.horaFim &&
        payload.horaFim > lesson.horaInicio,
    );
    if (conflict) {
      return Promise.resolve({
        data: { sucesso: false, confirmacao: "Não" },
      });
    }
    lessons.push({
      ...payload,
      _id: `lesson-${nextId++}`,
      confirmacao: "Pendente",
    });
    return Promise.resolve({
      data: { sucesso: true, confirmacao: "Pendente" },
    });
  });

  axios.patch.mockImplementation((url, payload) => {
    const lesson = lessons.find((item) => url === `/explicacoes/${item._id}`);
    if (!lesson) {
      return Promise.reject(new Error(`Explicação não encontrada: ${url}`));
    }
    lesson.confirmacao = payload.confirmacao;
    return Promise.resolve({ data: { ...lesson } });
  });

  return lessons;
};

const loginAs = (account, role) => {
  sessionStorage.setItem("emailUsuario", account.email);
  sessionStorage.setItem("explicandoId", account.id);
  sessionStorage.setItem("tipoUsuario", role);
  sessionStorage.setItem("token", `token-${role}`);
};
const LocationProbe = () => (
  <output data-testid="location">{useLocation().pathname}</output>
);

const webSockets = [];
class TestWebSocket {
  static OPEN = 1;

  constructor(url) {
    this.url = url;
    this.readyState = TestWebSocket.OPEN;
    this.listeners = new Map();
    this.send = vi.fn();
    webSockets.push(this);
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type, listener) {
    this.listeners.get(type)?.delete(listener);
  }

  close() {
    this.readyState = 3;
  }

  dispatchMessage(message) {
    for (const listener of this.listeners.get("message") || []) {
      listener({ data: JSON.stringify(message) });
    }
  }

  dispatchOpen() {
    for (const listener of this.listeners.get("open") || []) {
      listener();
    }
  }
}

const schedule = async ({ date = futureDate(), time = "10:00" } = {}) => {
  loginAs(student, "Explicando");
  vi.spyOn(window, "alert").mockImplementation(() => {});
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Explicacoes />
      <LocationProbe />
    </MemoryRouter>,
  );

  fireEvent.change(screen.getByLabelText("Data"), { target: { value: date } });
  fireEvent.change(screen.getByLabelText("Hora de Início"), {
    target: { value: time },
  });
  await user.type(
    document.querySelector(
      '.formularioExplicacoes input[type="text"]:not([readonly])',
    ),
    "JavaScript",
  );
  await user.selectOptions(screen.getAllByRole("combobox")[1], "MBWay");
  await user.click(screen.getByRole("button", { name: "Submeter" }));
  return user;
};

const openPending = async () => {
  cleanup();
  loginAs(teacher, "Explicador");
  render(
    <MemoryRouter>
      <ExplicacoesPendentes />
    </MemoryRouter>,
  );
};

beforeEach(() => {
  webSockets.length = 0;
  vi.stubGlobal("WebSocket", TestWebSocket);
  sessionStorage.clear();
  vi.clearAllMocks();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("marcação, confirmação e rejeição", () => {
  it("cria a marcação pendente e apresenta as ações ao explicador", async () => {
    configureApi();
    await schedule();

    expect(axios.post).toHaveBeenCalledWith(
      "/explicacoes",
      expect.objectContaining({
        explicandoId: student.id,
        horaInicio: "10:00",
        horaFim: "12:00",
        linguagem: "JavaScript",
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("location").textContent).toBe("/MBWay"),
    );

    await openPending();
    expect(
      await screen.findByRole("row", { name: /Aluno Teste.*JavaScript/ }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Recusar" })).toBeTruthy();
  });

  it.each(["Confirmada", "Recusada"])(
    "propaga a decisão %s para a lista do explicando",
    async (decision) => {
      configureApi();
      await schedule();
      await openPending();
      await screen.findByRole("row", { name: /Aluno Teste.*JavaScript/ });
      await userEvent.click(
        screen.getByRole("button", {
          name: decision === "Confirmada" ? "Confirmar" : "Recusar",
        }),
      );

      await waitFor(() =>
        expect(axios.patch).toHaveBeenCalledWith("/explicacoes/lesson-1", {
          confirmacao: decision,
        }),
      );
      expect(
        await screen.findByText("Nenhuma explicação pendente encontrada."),
      ).toBeTruthy();

      cleanup();
      loginAs(student, "Explicando");
      render(
        <MemoryRouter>
          <ExplicacoesConfirmadasExplicando />
        </MemoryRouter>,
      );
      expect(
        await screen.findByRole("row", {
          name: new RegExp(`JavaScript.*${decision}`),
        }),
      ).toBeTruthy();
    },
  );

  it("mostra conflito quando o intervalo marcado se sobrepõe a outra explicação", async () => {
    const date = futureDate();
    configureApi([at(date, { horaInicio: "10:00", horaFim: "12:00" })]);
    await schedule({ date, time: "11:00" });

    expect(
      await screen.findByText(/não pode ser agendada para esse período/),
    ).toBeTruthy();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("location").textContent).toBe("/");
  });
});

describe("datas futuras nas listas de explicações", () => {
  it.each(["Confirmada", "Recusada"])(
    "apresenta a explicação logo que o explicador a marca como %s",
    async (confirmacao) => {
      const lesson = at(futureDate(), {
        _id: "decided-lesson",
        confirmacao: "Pendente",
      });
      configureApi([lesson]);
      loginAs(student, "Explicando");
      render(
        <MemoryRouter>
          <ExplicacoesConfirmadasExplicando />
        </MemoryRouter>,
      );

      expect(
        await screen.findByText("Nenhuma explicação pendente encontrada."),
      ).toBeTruthy();
      const socket = webSockets[0];
      act(() => socket.dispatchOpen());
      expect(socket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "subscribe-explanation-list" }),
      );
      act(() =>
        socket.dispatchMessage({
          type: "explanation-status-updated",
          explanation: { ...lesson, confirmacao },
        }),
      );

      expect(
        await screen.findByRole("row", { name: new RegExp(confirmacao) }),
      ).toBeTruthy();
    },
  );

  it("remove da lista do explicador uma explicação eliminada pelo aluno", async () => {
    configureApi([
      at(futureDate(), {
        _id: "deleted-lesson",
        linguagem: "Explicação eliminada",
        confirmacao: "Confirmada",
      }),
    ]);
    loginAs(teacher, "Explicador");
    render(
      <MemoryRouter>
        <ExplicacoesConfirmadasExplicador />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("row", { name: /Explicação eliminada/ }),
    ).toBeTruthy();
    const socket = webSockets[0];
    act(() =>
      socket.dispatchMessage({
        type: "explanation-deleted",
        explanationId: "deleted-lesson",
      }),
    );

    await waitFor(() =>
      expect(
        screen.queryByRole("row", { name: /Explicação eliminada/ }),
      ).toBeNull(),
    );
  });

  it("limpa os filtros de data e nome e volta a mostrar a lista original", async () => {
    const firstDate = futureDate(10);
    const secondDate = futureDate(20);
    configureApi([
      at(firstDate, { _id: "first-lesson", linguagem: "Primeira" }),
      at(secondDate, { _id: "second-lesson", linguagem: "Segunda" }),
    ]);
    loginAs(teacher, "Explicador");
    render(
      <MemoryRouter>
        <ExplicacoesPendentes />
      </MemoryRouter>,
    );

    const dateInput = screen.getByLabelText("Seleccione uma data");
    fireEvent.change(dateInput, { target: { value: firstDate } });
    fireEvent.click(screen.getByRole("button", { name: "Pesquisar por Data" }));

    expect(await screen.findByRole("row", { name: /Primeira/ })).toBeTruthy();
    expect(screen.queryByRole("row", { name: /Segunda/ })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Limpar data" }));
    expect(dateInput.value).toBe("");
    expect(await screen.findByRole("row", { name: /Segunda/ })).toBeTruthy();

    const nameInput = screen.getByPlaceholderText("Nome do explicando");
    fireEvent.change(nameInput, { target: { value: "Nome inexistente" } });
    fireEvent.click(screen.getByRole("button", { name: "Pesquisar por Nome" }));
    expect(screen.queryByRole("row", { name: /Primeira/ })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Limpar nome" }));
    expect(nameInput.value).toBe("");
    expect(await screen.findByRole("row", { name: /Primeira/ })).toBeTruthy();
  });

  it("limpa o filtro de confirmação e restaura todos os estados", async () => {
    configureApi([
      at(futureDate(), {
        _id: "confirmed-lesson",
        linguagem: "Confirmada",
        confirmacao: "Confirmada",
      }),
      at(futureDate(), {
        _id: "rejected-lesson",
        linguagem: "Recusada",
        confirmacao: "Recusada",
      }),
    ]);
    loginAs(student, "Explicando");
    render(
      <MemoryRouter>
        <ExplicacoesConfirmadasExplicando />
      </MemoryRouter>,
    );

    const statusFilter = screen.getByRole("combobox");
    fireEvent.change(statusFilter, { target: { value: "Recusada" } });
    fireEvent.click(
      screen.getByRole("button", { name: "Pesquisar por Confirmação" }),
    );

    expect(
      await screen.findByRole("row", { name: /Recusada.*Recusada/ }),
    ).toBeTruthy();
    expect(
      screen.queryByRole("row", { name: /Confirmada.*Confirmada/ }),
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Limpar confirmação" }));
    expect(statusFilter.value).toBe("");
    expect(
      await screen.findByRole("row", { name: /Confirmada.*Confirmada/ }),
    ).toBeTruthy();
  });

  it("apresenta apenas explicações pendentes posteriores a hoje na fila do explicador", async () => {
    configureApi([
      at(futureDate(), { _id: "future-pending", linguagem: "Futura" }),
      at(pastDate(), { _id: "past-pending", linguagem: "Passada" }),
      at(futureDate(), {
        _id: "future-confirmed",
        linguagem: "Já Confirmada",
        confirmacao: "Confirmada",
      }),
    ]);
    loginAs(teacher, "Explicador");
    render(
      <MemoryRouter>
        <ExplicacoesPendentes />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("row", { name: /Futura/ })).toBeTruthy();
    expect(screen.queryByRole("row", { name: /Passada/ })).toBeNull();
    expect(screen.queryByRole("row", { name: /Já Confirmada/ })).toBeNull();
  });

  it("apresenta resultados futuros confirmados ou rejeitados na lista do explicando", async () => {
    configureApi([
      at(futureDate(), {
        _id: "future-confirmed",
        linguagem: "Futura OK",
        confirmacao: "Confirmada",
      }),
      at(futureDate(), {
        _id: "future-rejected",
        linguagem: "Futura Recusada",
        confirmacao: "Recusada",
      }),
      at(pastDate(), { _id: "past-confirmed", linguagem: "Passada OK" }),
      at(futureDate(), {
        _id: "future-pending",
        linguagem: "Futura Pendente",
        confirmacao: "Pendente",
      }),
      at(futureDate(), {
        _id: "other-student",
        explicandoId: "other-student-id",
        linguagem: "Outro aluno",
      }),
    ]);
    loginAs(student, "Explicando");
    render(
      <MemoryRouter>
        <ExplicacoesConfirmadasExplicando />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("row", { name: /Futura OK.*Confirmada/ }),
    ).toBeTruthy();
    expect(
      await screen.findByRole("row", { name: /Futura Recusada.*Recusada/ }),
    ).toBeTruthy();
    expect(screen.queryByRole("row", { name: /Passada OK/ })).toBeNull();
    expect(screen.queryByRole("row", { name: /Futura Pendente/ })).toBeNull();
    expect(screen.queryByRole("row", { name: /Outro aluno/ })).toBeNull();
  });

  it("apresenta explicações futuras decididas na lista do explicador", async () => {
    configureApi([
      at(futureDate(), {
        _id: "future-confirmed",
        linguagem: "Futura OK",
        confirmacao: "Confirmada",
      }),
      at(futureDate(), {
        _id: "future-rejected",
        linguagem: "Futura Recusada",
        confirmacao: "Recusada",
      }),
      at(pastDate(), { _id: "past-confirmed", linguagem: "Passada OK" }),
      at(futureDate(), {
        _id: "future-pending",
        linguagem: "Futura Pendente",
        confirmacao: "Pendente",
      }),
    ]);
    loginAs(teacher, "Explicador");
    render(
      <MemoryRouter>
        <ExplicacoesConfirmadasExplicador />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("row", { name: /Futura OK.*Confirmada/ }),
    ).toBeTruthy();
    expect(
      await screen.findByRole("row", { name: /Futura Recusada.*Recusada/ }),
    ).toBeTruthy();
    expect(screen.queryByRole("row", { name: /Passada OK/ })).toBeNull();
    expect(screen.queryByRole("row", { name: /Futura Pendente/ })).toBeNull();
  });
});

describe("entrada em explicações online", () => {
  it("permite ao explicando entrar apenas durante o horário da sessão confirmada", async () => {
    const window = currentLessonWindow();
    configureApi([
      at(todayDate(), {
        _id: "online-confirmed",
        confirmacao: "Confirmada",
        tipo: "On-line",
        ...window,
      }),
      at(futureDate(), {
        _id: "online-future",
        confirmacao: "Confirmada",
        tipo: "On-line",
      }),
      at(futureDate(), {
        _id: "in-person-confirmed",
        confirmacao: "Confirmada",
        tipo: "Presencial",
      }),
      at(futureDate(), {
        _id: "online-pending",
        confirmacao: "Pendente",
        tipo: "On-line",
      }),
    ]);
    loginAs(student, "Explicando");
    render(
      <MemoryRouter>
        <ExplicacoesConfirmadasExplicando />
      </MemoryRouter>,
    );

    const joinLink = await screen.findByRole("link", {
      name: "Entrar na explicação",
    });
    expect(joinLink.getAttribute("href")).toBe(
      "/ExplicacoesOnline/online-confirmed",
    );
    expect(
      screen.getAllByRole("link", { name: "Entrar na explicação" }),
    ).toHaveLength(1);
  });

  it("oferece ao explicador a mesma sala durante o horário da sessão", async () => {
    const window = currentLessonWindow();
    configureApi([
      at(todayDate(), {
        _id: "online-confirmed",
        confirmacao: "Confirmada",
        tipo: "On-line",
        ...window,
      }),
    ]);
    loginAs(teacher, "Explicador");
    render(
      <MemoryRouter>
        <ExplicacoesConfirmadasExplicador />
      </MemoryRouter>,
    );

    const joinLink = await screen.findByRole("link", {
      name: "Entrar na explicação",
    });
    expect(joinLink.getAttribute("href")).toBe(
      "/ExplicacoesOnline/online-confirmed",
    );
  });
});

describe("horário de entrada na explicação", () => {
  const lesson = at("2026-01-15", {
    horaInicio: "10:00",
    horaFim: "11:00",
  });
  const atTime = (hours, minutes, seconds = 0) =>
    new Date(2026, 0, 15, hours, minutes, seconds);

  it.each([
    ["antes do início", atTime(9, 59, 59), false],
    ["no início", atTime(10, 0), true],
    ["durante a sessão", atTime(10, 30), true],
    ["no fim", atTime(11, 0), false],
    ["depois do fim", atTime(11, 0, 1), false],
  ])("%s: verifica a janela correta", (_description, now, expected) => {
    expect(isLessonInProgress(lesson, now)).toBe(expected);
  });

  it("reconhece horários antigos guardados com marcador AM/PM", () => {
    const localizedLesson = {
      ...lesson,
      horaInicio: "01:00 PM",
      horaFim: "02:00 PM",
    };

    expect(isLessonInProgress(localizedLesson, atTime(13, 30))).toBe(true);
  });

  it("formata novas horas sempre no padrão de 24 horas", () => {
    expect(formatLessonTime(atTime(13, 5))).toBe("13:05");
    expect(formatLessonTime(atTime(1, 5))).toBe("01:05");
  });
});
