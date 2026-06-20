import axios from "axios";

const normalizeBaseUrl = (value) => (value ? value.replace(/\/+$/, "") : "");

const apiBaseUrl = normalizeBaseUrl(process.env.REACT_APP_SERVER_URI);
const runtimeOrigin = typeof window !== "undefined" ? normalizeBaseUrl(window.location.origin) : "";

if (apiBaseUrl) {
  axios.defaults.baseURL = apiBaseUrl;
}

if (apiBaseUrl && typeof window !== "undefined" && typeof window.fetch === "function") {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input, init) => {
    if (typeof input === "string" && input.startsWith("/")) {
      return originalFetch(`${apiBaseUrl}${input}`, init);
    }

    if (input instanceof Request && input.url.startsWith(`${window.location.origin}/`)) {
      const updatedUrl = input.url.replace(window.location.origin, apiBaseUrl);
      return originalFetch(new Request(updatedUrl, input), init);
    }

    return originalFetch(input, init);
  };
}

export const wsBaseUrl = normalizeBaseUrl(process.env.REACT_APP_WS_URL)
  || (apiBaseUrl ? apiBaseUrl.replace(/^http/i, "ws") : "");

export const httpBaseUrl = apiBaseUrl || runtimeOrigin;
