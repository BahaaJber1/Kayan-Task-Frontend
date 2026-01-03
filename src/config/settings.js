const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost";
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const API = import.meta.env.VITE_API ?? "/api/v1";

const BASE_URL =
  `${BACKEND_URL}:${BACKEND_PORT}${API}` ?? "http://localhost:8000/api/v1";

export { BASE_URL, BACKEND_URL, BACKEND_PORT, API };
