# FoodLedger API

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Visão Geral

FoodLedger API é uma API REST desenvolvida em Node.js e TypeScript com o objectivo de ajudar usuários a gerenciar suas compras pessoais de forma simples e eficiente. Cada usuário pode criar, visualizar, actualizar e apagar suas próprias compras, organizadas por categorias, facilitando o controle financeiro mensal.

Este projecto surgiu como uma iniciativa pessoal e acadêmica para aplicar boas práticas de desenvolvimento backend, arquitectura limpa e segurança, ao mesmo tempo que cria uma ferramenta prática para controle de gastos.

---

## Tecnologias Utilizadas

- **Node.js** – runtime para execução do backend
- **TypeScript** – tipagem estática e qualidade de código
- **Express** – framework para criação da API REST
- **Prisma ORM** – interface para o banco de dados (MySQL)
- **JWT (JSON Web Token)** – autenticação e autorização segura
- **MySQL/PostgreSQL** – bancos de dados suportados (configuráveis)

---

## Arquitectura do Projeto

O projecto é organizado em uma arquitectura modular, onde cada módulo representa uma funcionalidade do sistema (como Usuários, Categorias e Compras). Cada módulo é composto pelas seguintes camadas, seguindo o princípio da separação de responsabilidades:

- **Controller:** Lida com as requisições HTTP e respostas, direcionando as chamadas para os serviços.
- **Service:** Contém a lógica de negócio, regras, validações e orquestração das operações.
- **Repository:** Responsável pela comunicação com o banco de dados, abstraindo o acesso aos dados via Prisma.
- **DTO (Data Transfer Object):** Define os contratos de dados que são trocados entre as camadas, garantindo segurança e consistência.

Essa organização modular facilita a manutenção, escalabilidade e entendimento do código.

**Fluxo de uma requisição em um módulo:**

1. O cliente faz uma requisição HTTP para um endpoint específico do módulo.
2. O **Controller** recebe a requisição e faz validações básicas.
3. O **Service** executa a lógica de negócio necessária.
4. O **Repository** realiza operações no banco de dados.
5. O resultado é retornado pelo controller para o cliente.

---

## Autenticação e Autorização

- O login é feito via JWT, onde o usuário recebe um token após autenticação bem-sucedida.
- O token JWT é enviado nas requisições subsequentes via cabeçalho `Authorization`.
- Middleware de autenticação (`authMiddleware`) valida o token e injecta o `userId` na requisição (`req.user`), evitando passar dados sensíveis via corpo da requisição.
- A activação da conta do usuário é feita via token de activação enviado no processo de cadastro.

---

## Principais Funcionalidades

### Usuários

- Cadastro e ativação de conta
- Login com geração de JWT
- Protecção das rotas para operações privadas

### Categorias

- Criação, listagem, obtenção por Id
- Actualização e soft delete (marcar como deletado sem apagar fisicamente)

### Compras

- Criar compra associada ao usuário autenticado
- Listar compras filtrando por mês e ano
- Actualizar e deletar compras (soft delete)

### Resumo Mensal

- Relatórios com total gasto
- Gastos distribuídos por categoria
- Filtros por período (mês/ano)

---

## Rotas da API (exemplos)

### Rotas Públicas

- `POST /users/register` – criar usuário
- `GET /activate` – activar conta
- `POST /login` – login e obtenção do token JWT

### Rotas Protegidas (necessário token)

- `POST /categories` – criar categoria
- `GET /categories` – listar categorias
- `PUT /categories/:id` – actualizar categoria
- `DELETE /categories/:id` – deletar categoria (soft delete)

- `POST /purchases` – criar compra
- `GET /purchases` – listar todas as compras
- `GET /purchases?month=MM&year=YYYY` – listar compras filtradas por mês e ano
- `PUT /purchases/:id` – actualizar compras
- `GET /summary?month=MM&year=YYYY` – resumo mensal dos gastos

---

## Como Rodar o Projecto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/Ddacosta-akirfa/food-ledger-api.git
   cd food-ledger-api
   ```

2. Instale as dependências:

   ```bash
   npm install pnpm
   ```

   Depois:

   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`

   Para rodar o projecto localmente, é necessário criar um arquivo `.env` na raiz do projecto com as variáveis de ambiente necessárias para a configuração do banco de dados, autenticação e envio de emails.

   Você pode começar copiando o arquivo `.env.example`,esse arquivo também se encontra na raíz:

   ```bash
    DATABASE_URL="mysql://usuario:senha@localhost:3307/nome_do_banco"

    PORT=8888

    NODE_ENV="development"

    JWT_ACTIVATION_SECRET="seu_jwt_activation_secret_aqui"
    JWT_SECRET="seu_jwt_secret_aqui"

    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=seu_email@gmail.com
    SMTP_PASS=sua_senha_app_smtp

    CONTACT_RECEIVER_EMAIL=email_de_recebimento@exemplo.com
   ```

   Depois, edite o arquivo .env para preencher os valores correctos conforme seu ambiente:

   - **DATABASE_URL**: URL de conexão com seu banco de dados. Exemplo para MySQL:

     ```bash
         mysql://usuario:senha@localhost:3307/nome_do_banco
     ```

   - **PORT**: Porta onde a API será executada (ex: 8888).
   - **NODE_ENV**: Ambiente da aplicação (development, production, etc).
   - **JWT_ACTIVATION_SECRET** e **JWT_SECRET**: Segredos usados para gerar tokens JWT. Use strings longas e seguras, que podem ser geradas com ferramentas como [jwt.io](https://www.jwt.io/)
     ou `openssl rand -base64 32`.
   - **SMTP_HOST**, **SMTP_PORT**, **SMTP_USER**, **SMTP_PASS**: Configurações para envio de emails (exemplo para Gmail SMTP).
   - **CONTACT_RECEIVER_EMAIL**: Email que receberá notificações ou contactos.
   - **CORS_ORIGIN** (opcional): URL(s) permitida(s) para requisições CORS, caso use front-end separado.

4. Rode as migrations do Prisma para criar o schema no banco:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

---

## Testes Manuais (Insomnia / Postman)

Siga a sequência para testar o fluxo completo:

1. Criar usuário (`POST /users/register`)
2. Ativar conta (`POST /activate`)
3. Login para obter token JWT (`POST /users/logi`n)
4. Criar categorias (`POST /categories`)
5. Criar compras associadas (`POST /purchases`)
6. Consultar resumo mensal (`GET /summary`)

Lembre-se de incluir o token JWT no cabeçalho `Authorization` para as rotas protegidas.

---

## Boas Práticas Aplicadas

- Soft Delete: Uso de campo deletedAt para exclusão lógica.
- Validações no Service: Garantindo integridade dos dados e regras de negócio.
- Segurança: JWT para autenticação, middleware para protecção de rotas.
- Arquitectura modular: Cada módulo contém suas próprias camadas controller, service, repository e DTO.
- Organização de commits: Convenção de commits baseada em Conventional Commits para facilitar histórico e colaboração.

---

## Futuras Melhorias (Roadmap)

- Paginação nas listagens
- Filtros avançados nas compras e categorias
- Exportação de dados (CSV / Excel)
- Dashboards com gráficos mensais
- Implementação de roles (admin / usuário)
- Testes automatizados (unitários e integração)
- Cache para melhorar performance
- Implementar refresh token para segurança aprimorada
- Rate limiting para evitar abusos

---

## Status do Projecto

Este projecto está em desenvolvimento e serve como um estudo prático para aprimorar conhecimentos em backend, arquitetura e segurança, focando em boas práticas e aplicação real.

---

## Contato

Desenvolvido por [Ddacosta](https://github.com/Ddacosta-akirfa)

Email: dacostadanyel9@gmail.com

---

Obrigado por visitar o repositório!

Sinta-se à vontade para contribuir ou abrir issues. 😊
