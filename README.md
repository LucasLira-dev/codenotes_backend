# 📝 CodeNotes Backend

API REST para gerenciamento de notas de código (code snippets), construída com NestJS, Prisma e PostgreSQL. Permite que desenvolvedores criem, compartilhem e favoritam snippets de código de forma simples e organizada.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 📋 Índice

- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Banco de Dados](#-banco-de-dados)
- [Autenticação](#-autenticação)
- [Validação](#-validação)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Contribuindo](#-contribuindo)

## ✨ Recursos

- 📝 **Gestão de Notas**: CRUD completo para snippets de código
- 🔍 **Busca Avançada**: Pesquisa por título, código ou linguagem
- 🌐 **Notas Públicas**: Compartilhe seus snippets com a comunidade
- 🔒 **Notas Privadas**: Mantenha seus códigos privados quando necessário
- ⭐ **Favoritos**: Salve e organize seus snippets favoritos
- 👤 **Autenticação**: Login com email/senha, GitHub ou Google
- 🎨 **Suporte Multi-linguagem**: Organize por linguagem de programação
- ✅ **Validação**: DTOs com class-validator para dados seguros
- 🏥 **Health Check**: Endpoint para monitoramento da API

## 🚀 Tecnologias

### Core
- **[NestJS](https://nestjs.com/)** v11 - Framework Node.js progressivo e escalável
- **[TypeScript](https://www.typescriptlang.org/)** v5.7 - JavaScript com tipagem estática
- **[Prisma](https://www.prisma.io/)** v7.3 - ORM moderno para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional robusto
- **[Neon](https://neon.tech/)** - PostgreSQL serverless

### Autenticação
- **[@thallesp/nestjs-better-auth](https://github.com/thallesp/nestjs-better-auth)** v2.2.5 - Integração Better Auth para NestJS
- **[Better Auth](https://www.better-auth.com/)** v1.4.18 - Sistema de autenticação moderno
  - Email & Password
  - OAuth (GitHub, Google)
  - Campos customizados de usuário

### Validação & Transformação
- **[class-validator](https://github.com/typestack/class-validator)** v0.14.3 - Validação declarativa
- **[class-transformer](https://github.com/typestack/class-transformer)** v0.5.1 - Transformação de objetos

### Testes
- **[Jest](https://jestjs.io/)** v30 - Framework de testes JavaScript
- **[Supertest](https://github.com/visionmedia/supertest)** v7 - Testes HTTP de alto nível

## 🏗️ Arquitetura

O projeto segue a arquitetura modular do NestJS com separação clara de responsabilidades:

```
src/
├── main.ts                    # Entry point da aplicação
├── app.module.ts              # Módulo raiz
├── app.controller.ts          # Controller principal (health check)
├── app.service.ts             # Service principal
├── prisma.service.ts          # Serviço Prisma (ORM)
│
├── auth/                      # 🔐 Autenticação
│   └── auth.config.ts         # Configuração Better Auth
│
├── notes/                     # 📝 Módulo de notas
│   ├── notes.module.ts
│   ├── notes.controller.ts    # Endpoints de notas
│   ├── notes.service.ts       # Lógica de negócio
│   └── dto/
│       ├── create-note.dto.ts
│       ├── update-note.dto.ts
│       └── update-visibility.dto.ts
│
└── favorites/                 # ⭐ Módulo de favoritos
    ├── favorites.module.ts
    ├── favorites.controller.ts
    ├── favorites.service.ts
    └── dto/
        └── create-favorite.dto.ts
```

### Padrões Utilizados

- **Dependency Injection**: Injeção de dependências nativa do NestJS
- **DTOs (Data Transfer Objects)**: Validação e tipagem de dados
- **Service Layer**: Lógica de negócio separada dos controllers
- **Guards & Decorators**: Proteção de rotas com Better Auth
- **Exception Filters**: Tratamento centralizado de erros

## 📦 Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **PostgreSQL** (ou conta [Neon](https://neon.tech/))
- **Git**

## 🔧 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/LucasLira-dev/codenotes_backend.git
cd codenotes_backend
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

## ⚙️ Configuração

1. **Crie o arquivo `.env` na raiz do projeto**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/codenotes?schema=public"

# Better Auth
BETTER_AUTH_SECRET="seu-secret-super-seguro-aqui"
BETTER_AUTH_URL="http://localhost:3001"

# Frontend
FRONTEND_URL="http://localhost:3000"

# OAuth - GitHub
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"

# OAuth - Google
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# Server
PORT=3001
```

2. **Configure o banco de dados**

```bash
# Gere o Prisma Client
npx prisma generate

# Execute as migrations
npx prisma migrate dev

# (Opcional) Abra o Prisma Studio
npx prisma studio
```

### 🔑 Obtendo Credenciais OAuth

**GitHub:**
1. Acesse [GitHub Developer Settings](https://github.com/settings/developers)
2. Crie um novo OAuth App
3. Configure a callback URL: `http://localhost:3001/api/auth/callback/github`

**Google:**
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto OAuth 2.0
3. Configure a redirect URI: `http://localhost:3001/api/auth/callback/google`

## 🚀 Executando o Projeto

### Desenvolvimento

```bash
npm run start:dev
# ou
yarn start:dev
```

A API estará disponível em `http://localhost:3001`

### Produção

```bash
# Build
npm run build

# Start
npm run start:prod
```

### Debug

```bash
npm run start:debug
```

## 📍 Endpoints da API

### 🏥 Health Check

```http
GET /health
```

Verifica o status da API (sem autenticação necessária).

**Response:**
```json
{
  "status": 200,
  "message": "Service is healthy"
}
```

---

### 🔐 Autenticação

A autenticação é gerenciada pelo Better Auth em `/api/auth/*`

**Endpoints disponíveis:**
- `POST /api/auth/sign-up/email` - Registro com email/senha
- `POST /api/auth/sign-in/email` - Login com email/senha
- `GET /api/auth/sign-in/github` - Login com GitHub
- `GET /api/auth/sign-in/google` - Login com Google
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Obter sessão atual

---

### 📝 Notas

Todas as rotas de notas (exceto `/notes/publicNotes`) requerem autenticação.

#### Criar nota

```http
POST /notes
```

**Body:**
```json
{
  "title": "Função para validar CPF",
  "code": "function validarCPF(cpf) { /* ... */ }",
  "language": "javascript"
}
```

**Response:**
```json
{
  "message": "Nota criada com sucesso",
  "note": {
    "id": "uuid",
    "title": "Função para validar CPF",
    "code": "function validarCPF(cpf) { /* ... */ }",
    "language": "javascript",
    "isPublic": false,
    "authorId": "uuid",
    "createdAt": "2026-02-10T...",
    "updatedAt": "2026-02-10T..."
  }
}
```

#### Listar minhas notas

```http
GET /notes
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Função para validar CPF",
    "code": "...",
    "language": "javascript",
    "isPublic": false,
    "createdAt": "2026-02-10T...",
    "updatedAt": "2026-02-10T..."
  }
]
```

#### Listar notas públicas

```http
GET /notes/publicNotes
```

Endpoint público - retorna todas as notas marcadas como públicas.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Hook customizado React",
    "code": "...",
    "language": "typescript",
    "author": {
      "id": "uuid",
      "name": "João Silva",
      "image": "https://..."
    },
    "isFavorited": false
  }
]
```

#### Buscar notas

```http
GET /notes/search?search=react
```

Busca por título, código ou linguagem nas suas notas.

**Query Params:**
- `search` (string): Termo de busca

#### Obter nota específica

```http
GET /notes/:id
```

#### Atualizar nota

```http
PATCH /notes/:id
```

**Body:** (todos os campos são opcionais)
```json
{
  "title": "Novo título",
  "code": "Novo código",
  "language": "python"
}
```

#### Atualizar visibilidade

```http
PATCH /notes/:id/visibility
```

Alterna entre pública e privada.

**Body:**
```json
{
  "isPublic": true
}
```

#### Deletar nota

```http
DELETE /notes/:id
```

**Response:**
```json
{
  "message": "Note deleted with sucessfull!"
}
```

---

### ⭐ Favoritos

#### Adicionar/Remover favorito

```http
POST /favorites
```

Comportamento toggle: se já estiver favoritado, remove; caso contrário, adiciona.

**Body:**
```json
{
  "noteId": "uuid-da-nota"
}
```

**Response (ao adicionar):**
```json
{
  "message": "Note added to favorites successfully!",
  "favorite": {
    "id": 1,
    "userId": "uuid",
    "noteId": "uuid",
    "note": { /* ... */ }
  },
  "isFavorited": true
}
```

**Response (ao remover):**
```json
{
  "message": "Note removed from favorites successfully!",
  "isFavorited": false
}
```

#### Listar meus favoritos

```http
GET /favorites
```

**Response:**
```json
[
  {
    "id": 1,
    "userId": "uuid",
    "noteId": "uuid",
    "note": {
      "id": "uuid",
      "title": "Hook customizado React",
      "code": "...",
      "language": "typescript",
      "author": {
        "id": "uuid",
        "name": "Maria Santos",
        "image": "https://..."
      }
    }
  }
]
```

---

## 🗄️ Banco de Dados

### Modelos Prisma

**Notes**
```prisma
model Notes {
  id        String     @id @default(uuid())
  title     String
  code      String
  language  String
  isPublic  Boolean    @default(false)
  authorId  String
  author    User       @relation(fields: [authorId], references: [id])
  favorites Favorite[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

**Favorite**
```prisma
model Favorite {
  id     Int    @id @default(autoincrement())
  userId String
  noteId String
  user   User   @relation(fields: [userId], references: [id])
  note   Notes  @relation(fields: [noteId], references: [id])
  
  @@unique([userId, noteId])
}
```

**User** (gerenciado pelo Better Auth)
```prisma
model User {
  id             String     @id
  name           String
  email          String
  emailVerified  Boolean
  image          String?
  role           String     @default("student")
  imageCldPubId  String?
  notes          Notes[]
  favorites      Favorite[]
  sessions       Session[]
  accounts       Account[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}
```

### Comandos Prisma Úteis

```bash
# Gerar client
npx prisma generate

# Criar migration
npx prisma migrate dev --name nome-da-migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Reset database (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio
```

## 🔐 Autenticação

### Better Auth

O projeto utiliza [Better Auth](https://www.better-auth.com/) com os seguintes recursos:

- **Email & Password**: Autenticação tradicional
- **OAuth Providers**: GitHub e Google
- **Campos customizados**: Role e imageCldPubId
- **Cookie-based sessions**: Sessões seguras com SameSite=None

### Protegendo Rotas

```typescript
// Rota protegida (requer autenticação)
@Get()
findAll(@Session() session: UserSession) {
  const userId = session.user.id;
  // ...
}

// Rota pública
@Get('public')
@AllowAnonymous()
findPublic() {
  // ...
}

// Rota com sessão opcional
@Get('mixed')
findMixed(@Session({ optional: true }) session?: UserSession) {
  const userId = session?.user?.id;
  // ...
}
```

### Estrutura de Sessão

```typescript
{
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    imageCldPubId?: string;
  }
}
```

## ✅ Validação

### DTOs com Class Validator

**CreateNoteDto:**
```typescript
{
  title: string;      // 1-255 caracteres, não pode ser vazio
  code: string;       // obrigatório, não pode ser apenas espaços
  language: string;   // max 50 caracteres
}
```

**UpdateVisibilityDto:**
```typescript
{
  isPublic: boolean;  // true ou false
}
```

**CreateFavoriteDto:**
```typescript
{
  noteId: string;     // UUID v4 válido
}
```

### Mensagens de Erro

```json
{
  "statusCode": 400,
  "message": [
    "O título é obrigatório",
    "O código não pode ser apenas espaços em branco"
  ],
  "error": "Bad Request"
}
```

## 🧪 Testes

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e

# Debug
npm run test:debug
```

### Estrutura de Testes

```typescript
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return "Hello World!"', () => {
    expect(appController.getHello()).toBe('Hello World!');
  });
});
```

## 🌐 Deploy

### Vercel (Recomendado)

1. **Instale a Vercel CLI**

```bash
npm i -g vercel
```

2. **Configure as variáveis de ambiente**

No dashboard da Vercel, adicione todas as variáveis do `.env`:

```
DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL
FRONTEND_URL
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

3. **Deploy**

```bash
vercel --prod
```

### Neon Database

1. Crie uma conta em [neon.tech](https://neon.tech/)
2. Crie um novo projeto PostgreSQL
3. Copie a connection string
4. Atualize `DATABASE_URL` no `.env`

### Railway / Render

Plataformas alternativas que suportam NestJS:
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Fly.io](https://fly.io/)

## 🛠️ Scripts Disponíveis

```json
{
  "build": "nest build",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:e2e": "jest --config ./test/jest-e2e.json"
}
```

## 🐛 Tratamento de Erros

A API retorna erros HTTP padronizados:

| Status | Descrição |
|--------|-----------|
| `400` | Bad Request - Dados inválidos |
| `401` | Unauthorized - Não autenticado |
| `403` | Forbidden - Sem permissão |
| `404` | Not Found - Recurso não encontrado |
| `409` | Conflict - Conflito (ex: favorito duplicado) |
| `500` | Internal Server Error |

**Exemplo de resposta de erro:**
```json
{
  "statusCode": 404,
  "message": "Note not found!",
  "error": "Not Found"
}
```

## 📚 Recursos Adicionais

- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Class Validator Docs](https://github.com/typestack/class-validator)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
style: formatação, ponto e vírgula, etc
refactor: refatoração de código
test: adiciona testes
chore: atualiza dependências, configurações
```

## 📝 Licença

Este projeto está sob a licença UNLICENSED - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Lucas Lira**

- GitHub: [@LucasLira-dev](https://github.com/LucasLira-dev)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

**Made with ❤️ and TypeScript**
