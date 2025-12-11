📘 Projeto DevOps — Pipeline CI/CD, Deploy Docker, Monitoramento e Aplicação FullStack

Este projeto aplica na prática os principais conceitos de DevOps, incluindo:

Integração Contínua (CI)

Entrega e Deploy Contínuo (CD)

Versionamento Git

Docker e Docker Compose

Aplicação Backend + Frontend + Banco de Dados

Monitoramento com Healthchecks

Organização e automação de ambiente

Todo o sistema é construído utilizando Node.js, Vue.js, MongoDB, Docker, GitHub Actions e executado dentro de uma instância EC2 Ubuntu.

📌 Índice

Arquitetura do Projeto

Tecnologias Utilizadas

Como rodar localmente

Como rodar em produção (EC2)

Estrutura dos Containers

Pipeline CI/CD

Monitoramento

Principais Endpoints da API

Variáveis de Ambiente

Comandos úteis

🏗 Arquitetura do Projeto
 ┌──────────────┐
 │   Frontend   │ → Vue.js + Vite
 └───────┬──────┘
         │
 ┌───────▼──────────┐    ┌───────────────┐
 │     Backend      │ → Node.js + Express
 │  Porta: 3000     │    │    MongoDB     │
 └────────┬─────────┘    └──────┬────────┘
          │ Docker               │ Docker
          ▼                      ▼
     Containers               Containers


A aplicação é dividida em:

Frontend

✔ Construído com Vue.js
✔ Servido pelo Nginx

Backend

✔ Construído com Node.js + Express
✔ Healthcheck configurado
✔ Comunicação com MongoDB via Mongoose

Banco de Dados — MongoDB Atlas

✔ Seguro
✔ Escalável
✔ Conexão via string MONGO_URI

⚙ Tecnologias Utilizadas
Tecnologia	Uso
Node.js	Backend
Express	API REST
Vue.js	Frontend
Vite	Build do frontend
MongoDB Atlas	Banco de dados
Docker	Conteinerização
Docker Compose	Orquestração
Nginx	Servir frontend
GitHub Actions	CI/CD
PM2 (opcional)	Gerenciamento de processos
EC2 Ubuntu	Deploy em Produção
🧪 Como Rodar Localmente
1️⃣ Clone o repositório
git clone https://github.com/guilhermeJ15/Projeto_DevOps.git
cd Projeto_DevOps

2️⃣ Configure a variável de ambiente

Crie um arquivo .env na pasta backend:

MONGO_URI=sua_string_do_mongo

3️⃣ Suba tudo com Docker
docker-compose up -d --build

4️⃣ Teste se o backend está funcionando
curl http://localhost:3000/items

5️⃣ Acesse o frontend no navegador
http://localhost:8080

🚀 Como Rodar em Produção (EC2)
1️⃣ Instale dependências
sudo apt update
sudo apt install docker.io docker-compose -y

2️⃣ Clone o projeto dentro da EC2
git clone https://github.com/guilhermeJ15/Projeto_DevOps.git
cd Projeto_DevOps

3️⃣ Configure variáveis no arquivo docker-compose.yml

Na seção:

environment:
  - MONGO_URI=mongodb+srv://...

4️⃣ Suba os containers
docker-compose up -d --build

5️⃣ Teste o backend
curl http://localhost:3000/items

6️⃣ Acesse o frontend via IP público
http://SEU_IP_PUBLICO

🐳 Estrutura dos Containers

O docker-compose sobe 4 serviços:

1. backend

Porta 3000

Usa Node.js

Conecta no MongoDB Atlas

2. frontend

Porta 80

Servido via Nginx

3. mongo

Apenas usado se quiser banco local (não necessário com Atlas)

4. mongo-express

Dashboard web do MongoDB

Porta 8081

🔄 Pipeline CI/CD

O projeto possui um fluxo completo de CI/CD baseado em GitHub Actions:

✔ CI

Instala dependências

Roda testes (se habilitado)

Valida build do backend

Valida build do frontend

✔ CD

No push para main:

EC2 puxa alterações com git pull

Recria containers

Faz build e deploy automático

Esse processo garante que toda mudança enviada ao GitHub seja automaticamente refletida no servidor.

🩺 Monitoramento (Health Check)

O backend possui um HEALTHCHECK direto no Dockerfile:

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/items', (r) => { if (r.statusCode !== 200) throw new Error() })"


Isso garante:

Reinício automático do container se a API travar

Registro de falhas via docker ps

Alta disponibilidade

Exemplo de verificação:

docker ps --format "table {{.Names}}\t{{.Status}}"

📡 Principais Endpoints da API
Método	Endpoint	Descrição
GET	/items	Lista itens
POST	/items	Cria item
PUT	/items/:id	Atualiza item
DELETE	/items/:id	Remove item
GET	/health	Healthcheck
🔐 Variáveis de Ambiente
MONGO_URI="mongodb+srv://..."
PORT=3000

🔧 Comandos úteis
Ver logs do backend
docker logs devops_backend -f

Ver status dos containers
docker ps

Subir containers
docker-compose up -d --build

Derrubar containers
docker-compose down