import axios from "axios";

// Remove barras finais para construir URLs sem duplicar separadores.
const normalizeBaseUrl = (value) => (value ? value.replace(/\/+$/, "") : "");

const runtimeOrigin =
  typeof window !== "undefined" ? normalizeBaseUrl(window.location.origin) : "";
const apiBaseUrl = import.meta.env.DEV
  ? "/api"
  : normalizeBaseUrl(
      import.meta.env.VITE_SERVER_URI ||
        "https://explicacoes-backend.onrender.com",
    );
const absoluteApiBaseUrl = apiBaseUrl.startsWith("/")
  ? `${runtimeOrigin}${apiBaseUrl}`
  : apiBaseUrl;

if (apiBaseUrl) {
  axios.defaults.baseURL = apiBaseUrl;
}

axios.interceptors.request.use((config) => {
  // O token da sessão é enviado em todas as chamadas Axios autenticadas.
  const token =
    typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("token")
      : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

if (
  apiBaseUrl &&
  typeof window !== "undefined" &&
  typeof window.fetch === "function"
) {
  const originalFetch = window.fetch.bind(window);

  const withAuth = (url, init) => {
    const token = sessionStorage.getItem("token");
    if (!token || !url.startsWith(absoluteApiBaseUrl)) return init;
    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${token}`);
    return { ...init, headers };
  };

  window.fetch = (input, init) => {
    if (typeof input === "string") {
      // Redireciona caminhos relativos do frontend para a API configurada.
      const url = input.startsWith("/")
        ? input.startsWith(`${apiBaseUrl}/`) && apiBaseUrl.startsWith("/")
          ? `${runtimeOrigin}${input}`
          : `${absoluteApiBaseUrl}${input}`
        : input;
      return originalFetch(url, withAuth(url, init));
    }

    if (
      input instanceof Request &&
      input.url.startsWith(`${window.location.origin}/`)
    ) {
      const requestPath = input.url.slice(window.location.origin.length);
      const updatedUrl =
        apiBaseUrl.startsWith("/") && requestPath.startsWith(`${apiBaseUrl}/`)
          ? input.url
          : `${absoluteApiBaseUrl}${requestPath}`;
      return originalFetch(
        new Request(updatedUrl, input),
        withAuth(updatedUrl, init),
      );
    }

    return originalFetch(input, init);
  };
}

export const wsBaseUrl =
  normalizeBaseUrl(import.meta.env.VITE_WS_URL) ||
  (apiBaseUrl ? apiBaseUrl.replace(/^http/i, "ws") : "");

export const httpBaseUrl = absoluteApiBaseUrl || runtimeOrigin;

export const wsUrl = () =>
  `${wsBaseUrl}/ws?token=${encodeURIComponent(sessionStorage.getItem("token") || "")}`;

// Remove credenciais antigas guardadas antes de a aplicação usar sessionStorage.
if (typeof localStorage !== "undefined") {
  ["emailUsuario", "token", "explicandoId", "tipoUsuario"].forEach((key) => {
    localStorage.removeItem(key);
  });
}

if (
  typeof sessionStorage !== "undefined" &&
  sessionStorage.getItem("emailUsuario") &&
  !sessionStorage.getItem("token")
) {
  // Evita manter uma identidade de sessão sem o token que a valida.
  sessionStorage.clear();
}
