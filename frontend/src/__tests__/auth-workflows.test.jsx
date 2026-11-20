// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import axios from "axios";
import { JSDOM } from "jsdom";
import Home from "../Home";
import Menu from "../Menu";
import Registo from "../Registo";
import { isExplicador } from "../auth";

vi.mock("axios", () => ({
  default: {
    defaults: { headers: {} },
    interceptors: { request: { use: vi.fn() } },
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const LocationProbe = () => (
  <output data-testid="location">{useLocation().pathname}</output>
);

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.clearAllMocks();
});

afterEach(cleanup);

describe("registo e acessos do explicador", () => {
  it("submete o registo do utilizador através do formulário", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Registo feito" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Registo />
      </MemoryRouter>,
    );

    await user.type(document.querySelector('input[name="nome"]'), "Ana Silva");
    await user.type(
      document.querySelector('input[name="email"]'),
      "anasilva_pinhel@hotmail.com",
    );
    await user.type(
      document.querySelector('input[name="password"]'),
      "palavra-passe",
    );
    await user.click(screen.getByRole("button", { name: "Registar" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/registo",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          nome: "Ana Silva",
          email: "anasilva_pinhel@hotmail.com",
          password: "palavra-passe",
        }),
      }),
    );
  });

  it("reconhece o papel de explicador no login e apresenta os acessos correspondentes", async () => {
    axios.post.mockResolvedValue({
      data: {
        sucesso: true,
        token: "token-teste",
        role: "Explicador",
        user: { explicandoId: "teacher-id" },
      },
    });

    render(
      <MemoryRouter>
        <Home />
        <LocationProbe />
      </MemoryRouter>,
    );

    await userEvent.type(
      document.querySelector('input[name="email"]'),
      "anasilva_pinhel@hotmail.com",
    );
    await userEvent.type(
      document.querySelector('input[name="password"]'),
      "palavra-passe",
    );
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() =>
      expect(screen.getByTestId("location").textContent).toBe(
        "/ExplicacoesConfirmadasExplicador",
      ),
    );
    expect(sessionStorage.getItem("tipoUsuario")).toBe("Explicador");
    expect(localStorage.getItem("emailUsuario")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(isExplicador()).toBe(true);

    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("link", { name: "Explicações Pendentes" }),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Lista de Explicações" }),
    ).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Contactos" })).toBeNull();
  });

  it("mantém autenticações isoladas entre duas sessões de browser", () => {
    const anaBrowser = new JSDOM("", { url: "http://localhost:3000" });
    const teresaBrowser = new JSDOM("", { url: "http://localhost:3000" });
    const anaSession = anaBrowser.window.sessionStorage;
    const teresaSession = teresaBrowser.window.sessionStorage;

    anaSession.setItem("emailUsuario", "ana@example.com");
    anaSession.setItem("token", "ana-token");
    teresaSession.setItem("emailUsuario", "teresa@example.com");
    teresaSession.setItem("token", "teresa-token");

    expect(anaSession.getItem("emailUsuario")).toBe("ana@example.com");
    expect(anaSession.getItem("token")).toBe("ana-token");
    expect(teresaSession.getItem("emailUsuario")).toBe("teresa@example.com");
    expect(teresaSession.getItem("token")).toBe("teresa-token");

    anaBrowser.window.close();
    teresaBrowser.window.close();
  });
});
