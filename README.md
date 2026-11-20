# Explicações

Aplicação web para gerir explicações entre explicandos e explicadores. Permite criar conta e iniciar sessão, pedir e gerir explicações, consultar o estado dos pedidos, participar em explicações online e usar o fórum para trocar mensagens e ficheiros.

## Arquitetura

- **Frontend:** React 18, React Router e Vite. A interface comunica com a API por HTTP e usa WebSocket para atualizações em tempo real e salas de explicação online. PeerJS é usado para a ligação entre participantes.
- **Backend:** Node.js e Express, com endpoints REST, autenticação JWT e WebSocket (`ws`) para comunicação em tempo real.
- **Dados:** MongoDB através de Mongoose. Os modelos principais são explicandos, explicações e mensagens do fórum. Gravações de explicações online são guardadas em GridFS.
- **Ficheiros:** anexos do fórum são guardados em `backend/uploads`; gravações temporárias são processadas em `backend/recording-tmp`.

O backend distingue os papéis `Explicador` e `Explicando`. O endereço predefinido do explicador está em `backend/userRole.js`; `EXPLICADOR_EMAIL` permite configurar outro endereço. O login cria um JWT com validade de oito horas. No frontend, o token é mantido em `sessionStorage` e enviado nos pedidos protegidos.

## Organização do código

```text
backend/
	server.js                  API HTTP, autenticação, WebSocket e arranque
	userRole.js                Determinação do papel pelo endereço de email
	modelos/                   Modelos Mongoose
	*.test.js                  Testes Node.js do backend
	uploads/                   Ficheiros enviados para o fórum
	recording-tmp/             Ficheiros temporários de gravações
frontend/
	src/App.jsx                Rotas da aplicação
	src/apiConfig.js           URL da API, autenticação dos pedidos e WebSocket
	src/*.jsx                  Páginas e funcionalidades da aplicação
	src/__tests__/             Testes de interface e fluxos
	vite.config.js             Servidor de desenvolvimento, proxy e build
```

No frontend, os componentes das páginas estão organizados por fluxo: registo/login, pedidos e confirmação de explicações, explicações online, fórum, contactos e pagamentos. `lessonTiming.js` contém funções partilhadas para interpretar horários e identificar explicações em curso.

## Requisitos

- Node.js 20 ou compatível e npm
- MongoDB acessível localmente ou uma instância MongoDB Atlas

## Configuração local

Instale as dependências em cada aplicação:

```powershell
cd backend
npm ci
cd ..\frontend
npm ci
```

Crie `backend/.env` (não inclua este ficheiro no controlo de versões):

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/explicacoes
JWT_SECRET=substitua-por-um-segredo-aleatorio
EXPLICADOR_EMAIL=explicador@example.com
PORT=9090
```

`MONGO_URI` é obrigatória para as operações que usam a base de dados. Em produção, `JWT_SECRET` também é obrigatória; em desenvolvimento, se não for indicada, o servidor gera uma chave temporária e as sessões deixam de ser válidas quando o processo reinicia. `EXPLICADOR_EMAIL` é opcional: o endereço predefinido do código continua a ser reconhecido.

Arranque o backend e o frontend em terminais separados:

```powershell
# Terminal 1, na pasta backend
npm start
```

```powershell
# Terminal 2, na pasta frontend
npm run start
```

Abra `http://localhost:3000`. O Vite encaminha pedidos `/api` para `http://localhost:9090`; a API também pode ser acedida diretamente em `http://localhost:9090`. Para apontar o frontend a outro backend, defina `VITE_SERVER_URI`; para configurar separadamente o WebSocket, defina `VITE_WS_URL` no ambiente do Vite.

O script `npm run dev` do backend está configurado para usar `nodemon`, mas `nodemon` não está declarado nas dependências do projeto. Use `npm start` ou instale/configure `nodemon` antes de usar esse script.

## Testes e verificações

Os testes não precisam de uma instância MongoDB: os testes do backend substituem os modelos por dados em memória; os testes do frontend simulam pedidos, WebSocket, câmara e gravação.

Backend, a partir de `backend/`:

```powershell
npm test
```

Executa os ficheiros `*.test.js` com o runner nativo `node:test`. A suite cobre atribuição de papéis, regras de agendamento e salas WebSocket, incluindo autorização e gravações.

Frontend, a partir de `frontend/`:

```powershell
npm test
npm run lint
npm run format:check
npm run build
```

`npm test` executa Vitest em modo não interativo. Os testes cobrem autenticação e navegação por papel, marcação e confirmação de explicações, chat, ficheiros e comportamento da sala online. Os outros comandos verificam ESLint, formatação Prettier e compilação de produção.

## Build e deploy

O Dockerfile compila o frontend e cria uma imagem do backend que serve a aplicação compilada e a API no mesmo serviço. O deploy de referência é Google Cloud Run.

### Deploy rápido no Cloud Run

Pré-requisitos: projeto Google Cloud com faturação, `gcloud` instalado e autenticado.

```bash
gcloud auth login
gcloud config set project SEU_PROJECT_ID
```

Na raiz do projeto, execute:

```bash
./deploy-gcp-cloudrun.sh SEU_PROJECT_ID europe-west1 explicacoes-app
```

Antes do primeiro deploy, crie o segredo `explicacoes-jwt-secret` no Secret Manager e adicione-lhe uma versão. O segredo deve ser aleatório e nunca deve ser guardado no repositório. O script aceita outro nome de segredo como quarto argumento.

Depois do deploy, configure `MONGO_URI` e `PUBLIC_BASE_URL` no serviço Cloud Run. `JWT_SECRET` é fornecida ao container através do Secret Manager. Exemplo:

```bash
gcloud run services update explicacoes-app \
	--region europe-west1 \
	--set-env-vars "MONGO_URI=...,PUBLIC_BASE_URL=https://explicacoes-app-xxxxx-ew.a.run.app"
```

### Deploy manual

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com
gcloud builds submit --tag gcr.io/SEU_PROJECT_ID/explicacoes-app:latest

PROJECT_NUMBER="$(gcloud projects describe SEU_PROJECT_ID --format='value(projectNumber)')"
RUNTIME_SERVICE_ACCOUNT="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
gcloud secrets add-iam-policy-binding explicacoes-jwt-secret \
	--member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
	--role="roles/secretmanager.secretAccessor"

gcloud run deploy explicacoes-app \
	--image gcr.io/SEU_PROJECT_ID/explicacoes-app:latest \
	--platform managed \
	--region europe-west1 \
	--service-account "$RUNTIME_SERVICE_ACCOUNT" \
	--set-secrets JWT_SECRET=explicacoes-jwt-secret:latest \
	--set-env-vars "MONGO_URI=...,PUBLIC_BASE_URL=..." \
	--allow-unauthenticated \
	--port 8080
```

Os anexos do fórum e os ficheiros temporários usam o filesystem local. As gravações concluídas são guardadas em GridFS na base de dados MongoDB. O filesystem do Cloud Run é efémero, pelo que anexos e temporários podem perder-se após reinícios ou alterações de instâncias. Para armazenamento persistente de anexos em produção, migre-os para Google Cloud Storage.
