#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${1:-}"
REGION="${2:-europe-west1}"
SERVICE_NAME="${3:-explicacoes-app}"
JWT_SECRET_NAME="${4:-explicacoes-jwt-secret}"

if [[ -z "$PROJECT_ID" ]]; then
  echo "Uso: ./deploy-gcp-cloudrun.sh <PROJECT_ID> [REGION] [SERVICE_NAME] [JWT_SECRET_NAME]"
  exit 1
fi

echo "Projeto: $PROJECT_ID"
echo "Regiao: $REGION"
echo "Servico: $SERVICE_NAME"
echo "Secret JWT: $JWT_SECRET_NAME"

gcloud config set project "$PROJECT_ID"
# Ativa as APIs necessárias para construir a imagem, publicar no Cloud Run e ler o segredo.
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
RUNTIME_SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
gcloud secrets add-iam-policy-binding "$JWT_SECRET_NAME" \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"

# Constrói e publica a imagem a partir do contexto do projeto.
gcloud builds submit --tag "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"

gcloud run deploy "$SERVICE_NAME" \
  --image "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest" \
  --platform managed \
  --region "$REGION" \
  --service-account "$RUNTIME_SERVICE_ACCOUNT" \
  --set-secrets "JWT_SECRET=${JWT_SECRET_NAME}:latest" \
  --allow-unauthenticated \
  --port 8080

echo "Deploy concluido. Configure as variaveis MONGO_URI e PUBLIC_BASE_URL no Cloud Run."
