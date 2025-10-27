## ⚙️ FASE 1 — CRIAÇÃO DO PROJETO E AMBIENTE✅⬜

### 🧱 1. Estrutura inicial do backend

- ✅  Criar repositório no GitHub → `agendamento-backend`
- ✅  Clonar repositório localmente
- ✅  Instalar CLI do NestJS globalmente:
    
    ```bash
    npm i -g @nestjs/cli
    
    ```
    
- ✅  Criar projeto NestJS:
    
    ```bash
    nest new backend
    cd backend
    
    ```
    
- ✅  Instalar dependências principais:
    
    ```bash
    npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
    npm install prisma @prisma/client
    npm install -D @types/bcryptjs
    
    ```
    
- ✅  Criar arquivo `.env`:
    
    ```
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/agendamento"
    JWT_SECRET="sua_chave_super_segura"
    PORT=3333
    
    ```
    
- ✅  Adicionar `.env` ao `.gitignore`
- ✅  Rodar servidor para testar:
    
    ```bash
    npm run start:dev
    
    ```
    

---

## 🧰 FASE 2 — CONFIGURAÇÃO DO BANCO DE DADOS

### 🐘 2.1. PostgreSQL + Prisma

- ⬜  Criar banco de dados `agendamento` (local ou via Railway / Neon / Supabase)
- ⬜  Inicializar Prisma:
    
    ```bash
    npx prisma init
    
    ```
    
- ⬜  Atualizar `schema.prisma` com as tabelas:
    - `clientes`
    - `usuarios_empresa`
    - `comercios`
    - `servicos`
    - `funcionarios`
    - `funcionario_servico`
    - `agendamentos`
    - `pagamentos`
    - `avaliacoes`
- ⬜  Rodar migração:
    
    ```bash
    npx prisma migrate dev --name init
    
    ```
    
- ⬜  Testar conexão:
    
    ```bash
    npx prisma studio
    
    ```
    

---

## 🧱 FASE 3 — ESTRUTURA DO SERVIDOR NESTJS

### 🚀 3.1. Estrutura de módulos

- ⬜  Criar módulo global de banco de dados (Prisma):
    
    ```bash
    nest g module prisma
    nest g service prisma
    
    ```
    
- ⬜  Implementar `PrismaService` com `onModuleInit` e `onModuleDestroy`
- ⬜  Estrutura recomendada:
    
    ```
    src/
     ├── main.ts
     ├── app.module.ts
     ├── prisma/
     │   ├── prisma.module.ts
     │   └── prisma.service.ts
     ├── auth/
     ├── clientes/
     ├── usuarios-empresa/
     ├── comercios/
     ├── servicos/
     ├── funcionarios/
     ├── agendamentos/
     ├── pagamentos/
     ├── avaliacoes/
     └── common/
    
    ```
    

---

## 🔐 FASE 4 — AUTENTICAÇÃO E USUÁRIOS

### 👥 4.1. Módulo de autenticação (login e registro)

- ✅  Criar módulos:
    
    ```bash
    nest g module auth
    nest g service auth
    nest g controller auth
    
    ```
    
- ⬜  Adicionar `bcryptjs` para hash de senha
- ⬜  Criar **registro e login separados**:
    - `POST /auth/register/cliente` → cria um cliente
    - `POST /auth/register/empresa` → cria um usuárioEmpresa
    - `POST /auth/login` → login genérico (retorna token e tipo)
- ⬜  Gerar token JWT com:
    - `id`
    - `tipo_usuario` (`CLIENTE` ou `EMPRESA`)
    - `nome`
- ⬜  Criar `JwtAuthGuard` e `RolesGuard`
- ⬜  Criar decorator `@Roles('CLIENTE')` / `@Roles('EMPRESA')`
- ⬜  Proteger rotas específicas:
    - `CLIENTE` → pode agendar, avaliar
    - `EMPRESA` → pode gerenciar comércio, serviços e funcionários

---

## 👤 FASE 5 — CLIENTES

### 🙋 5.1. Módulo de clientes

- ✅  Criar módulo:
    
    ```bash
    nest g module clientes
    nest g service clientes
    nest g controller clientes
    
    ```
    
- ⬜  Rotas:
    - `GET /clientes/:id` → visualizar perfil
    - `PUT /clientes/:id` → editar informações
- ⬜  Clientes poderão:
    - Buscar comércios
    - Agendar serviços
    - Avaliar atendimentos

---

## 🏢 FASE 6 — USUÁRIOS EMPRESA E COMÉRCIOS

### 🧾 6.1. UsuáriosEmpresa

- ✅  Criar módulo:
    
    ```bash
    nest g module usuarios-empresa
    nest g service usuarios-empresa
    nest g controller usuarios-empresa
    
    ```
    
- ⬜  Relacionar `usuarios_empresa` → `comercios` (1:1)
- ⬜  Rotas:
    - `GET /empresa/:id` → ver perfil do dono
    - `PUT /empresa/:id` → editar dados
    - `GET /empresa/:id/comercio` → retornar comércio vinculado

### 💈 6.2. Comercios

- ✅  Criar módulo:
    
    ```bash
    nest g module comercios
    nest g service comercios
    nest g controller comercios
    
    ```
    
- ⬜  Rotas:
    - `POST /comercios` → criar comércio (somente `EMPRESA`)
    - `GET /comercios` → listar todos (busca pública)
    - `GET /comercios/:id` → ver detalhes
    - `PUT /comercios/:id` → editar
- ⬜  Relacionar com `usuarios_empresa.id`

---

## 💇 FASE 7 — SERVIÇOS

- ✅  Criar módulo:
    
    ```bash
    nest g module servicos
    nest g service servicos
    nest g controller servicos
    
    ```
    
- ⬜  Rotas:
    - `POST /servicos` → criar serviço (empresa)
    - `GET /servicos/:id_comercio` → listar serviços do comércio
    - `PUT /servicos/:id` → editar serviço
    - `DELETE /servicos/:id` → excluir serviço
- ⬜  Associar com `comercio_id`

---

## 💼 FASE 8 — FUNCIONÁRIOS E RELACIONAMENTO COM SERVIÇOS

### 👷 8.1. Funcionários

- ✅  Criar módulo:
    
    ```bash
    nest g module funcionarios
    nest g service funcionarios
    nest g controller funcionarios
    
    ```
    
- ⬜  Rotas:
    - `POST /funcionarios` → cadastrar funcionário
    - `GET /funcionarios/:id` → visualizar funcionário
    - `PUT /funcionarios/:id` → editar
    - `DELETE /funcionarios/:id` → excluir

### 🔗 8.2. Relacionamento funcionário x serviço

- ⬜  Criar tabela `funcionario_servico` no Prisma
- ⬜  Rotas:
    - `POST /funcionarios/:id/servicos` → vincular serviço
    - `GET /funcionarios/:id/servicos` → listar serviços oferecidos
    - `DELETE /funcionarios/:id/servico/:id_servico` → desvincular

---

## 📅 FASE 9 — AGENDAMENTOS E HORÁRIOS

### 🕒 9.1. Agendamentos

- ✅  Criar módulo:
    
    ```bash
    nest g module agendamentos
    nest g service agendamentos
    nest g controller agendamentos
    
    ```
    
- ⬜  Rotas:
    - `POST /agendamentos` → criar agendamento (cliente)
    - `GET /agendamentos/cliente/:id` → listar do cliente
    - `GET /agendamentos/comercio/:id` → listar do comércio
    - `PUT /agendamentos/:id/status` → atualizar status
- ⬜  Lógica:
    - Verificar disponibilidade do funcionário
    - Calcular `hora_fim` a partir da duração do serviço

### 📆 9.2. Horários disponíveis

- ✅  Criar módulo:
    
    ```bash
    nest g module horarios
    nest g service horarios
    nest g controller horarios
    
    ```
    
- ⬜  Rotas:
    - `POST /horarios` → cadastrar disponibilidade
    - `GET /horarios/funcionario/:id` → listar horários
- ⬜  Bloquear horário automaticamente após agendamento

---

## 💰 FASE 10 — PAGAMENTOS (OPCIONAL NO MVP)

- ⬜  Criar módulo:
    
    ```bash
    nest g module pagamentos
    nest g service pagamentos
    nest g controller pagamentos
    
    ```
    
- ⬜  Rotas:
    - `POST /pagamentos` → iniciar pagamento
    - `GET /pagamentos/:id_agendamento` → ver status
- ⬜  Integrar futuramente com **Stripe** ou **Mercado Pago**

---

## ⭐ FASE 11 — AVALIAÇÕES (RECURSO EXTRA)

- ✅  Criar módulo:
    
    ```bash
    nest g module avaliacoes
    nest g service avaliacoes
    nest g controller avaliacoes
    
    ```
    
- ⬜  Rotas:
    - `POST /avaliacoes` → cliente avalia serviço
    - `GET /avaliacoes/comercio/:id` → listar avaliações
- ⬜  Relacionar com `id_cliente` e `id_comercio`

---

## 🧪 FASE 12 — TESTES E DEPLOY DO BACKEND

### 🧾 12.1. Testes

- ⬜  Testar rotas no **Insomnia / Postman**
- ⬜  Testar fluxo:
    1. Criar cliente
    2. Criar usuárioEmpresa
    3. Criar comércio e serviços
    4. Cadastrar funcionário
    5. Vincular serviço → agendar → concluir
- ⬜  Criar testes unitários com Jest:
    
    ```bash
    npm run test
    
    ```
    

### 🚀 12.2. Deploy

- ⬜  Gerar build:
    
    ```bash
    npm run build
    
    ```
    
- ⬜  Fazer deploy (Render / Railway / VPS)
- ⬜  Configurar `.env` no ambiente remoto
- ⬜  Rodar migrations:
    
    ```bash
    npx prisma migrate deploy
    
    ```
    
- ⬜  Validar API no ambiente remoto

---

# 🌐 CHECKLIST RESUMIDO — FRONTEND (Next.js)

### 🧱 1. Preparação

- ⬜  Criar projeto Next.js:
    
    ```bash
    npx create-next-app@latest frontend --typescript
    
    ```
    
- ⬜  Instalar TailwindCSS
- ⬜  Criar `.env.local` com `NEXT_PUBLIC_API_URL`

### 🔗 2. Conexão com backend

- ⬜  Criar `src/lib/api.ts` com Axios
- ⬜  Testar rota `/ping` do backend

### 💇 3. Páginas principais

- ⬜  `/` — busca por cidade e serviços
- ⬜  `/comercio/[id]` — perfil do comércio
- ⬜  `/login` e `/cadastro` (separar abas: Cliente / Empresa)
- ⬜  `/painel` — painel do dono do comércio
- ⬜  `/agendamentos` — lista do cliente

### 🧾 4. Fluxo principal

- ⬜  **Cliente:** login → busca → selecionar serviço → agendar → confirmar
- ⬜  **UsuárioEmpresa:** login → gerenciar serviços, funcionários e horários

---

# 🏁 FASE FINAL — MVP PRONTO

✅ **Backend NestJS + Prisma + PostgreSQL**

✅ **Autenticação com dois tipos de usuário (Cliente e Empresa)**

✅ **CRUDs de usuários, comércios, serviços e agendamentos**

✅ **Frontend conectado (Next.js)**

✅ **Fluxo completo de agendamento testado**

✅ **Deploy online com banco e variáveis seguras**
