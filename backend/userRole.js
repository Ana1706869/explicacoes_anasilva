const DEFAULT_EXPLICADOR_EMAIL = "anasilva_pinhel@hotmail.com";
// Também reconhece o endereço configurado no ambiente, além do endereço predefinido.
const configuredExplicadorEmail = (process.env.EXPLICADOR_EMAIL || "")
  .trim()
  .toLowerCase();
const explicadorEmails = new Set(
  [DEFAULT_EXPLICADOR_EMAIL, configuredExplicadorEmail].filter(Boolean),
);

// Normaliza o email antes da comparação; qualquer outro utilizador é tratado como explicando.
const getUserRole = (email) =>
  explicadorEmails.has(String(email || "").trim().toLowerCase())
    ? "Explicador"
    : "Explicando";

module.exports = getUserRole;