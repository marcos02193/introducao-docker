# 🐳 Introdução ao Docker

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)
[![Made with Node.js](https://img.shields.io/badge/NestJS-TypeScript-red)](https://nestjs.com/)
[![Build with Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://www.prisma.io/)

Bem-vindo ao projeto **introducao-docker**! Este repositório tem como objetivo demonstrar o uso do Docker com uma aplicação backend moderna utilizando NestJS + TypeScript + Prisma 🛠️.

---

🧰 Tecnologias Utilizadas

🐳 Docker & Docker Compose

🔺 NestJS (framework Node.js)

🟦 TypeScript

🧬 Prisma ORM

🧪 Jest (testes)

## 📁 Estrutura do Projeto


---

## 🚀 Como rodar com Docker

### ✅ Pré-requisitos

- Docker instalado
- Docker Compose
- Node.js (opcionalmente, para rodar fora do Docker)

### ▶️ Subir a aplicação

```bash
docker-compose up --build

📦 Scripts disponíveis

Use os comandos abaixo dentro do container ou localmente (se preferir rodar sem Docker):

Comando	Descrição
npm install	Instala dependências
npm run start	Inicia a aplicação (produção)
npm run start:dev	Modo dev com auto-reload
npm run test	Executa testes unitários
npm run test:cov	Gera cobertura de testes

💡 Boas práticas com Docker

✅ Use .dockerignore para evitar arquivos desnecessários na imagem
✅ Mantenha o Dockerfile otimizado e limpo
✅ Evite hardcode de variáveis — use .env
✅ Separe ambientes: dev, staging, produção


6️⃣ A aplicação estará disponível
- API: http://localhost:3001/api

📌 Endpoints CRUD
👥 **Usuários**
Método	Rota	Descrição
- GET	/users	Listar todos os usuários
- GET	/users/:id	Buscar usuário por ID
- POST	/users	Criar novo usuário
- PUT	/users/:id	Atualizar usuário
- DELETE	/users/:id	Deletar usuário

📦 Produtos
Método	Rota	Descrição
- GET	/produtos	Listar todos os produtos
- GET	/produtos/:id	Buscar produto por ID
- POST	/produtos	Criar novo produto
- PUT	/produtos/:id	Atualizar produto
- DELETE	/produtos/:id	Deletar produto

###AUTOR
marcos