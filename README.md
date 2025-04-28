# Financial Control API

API para controle financeiro de clientes, produtos e políticas.

## Rotas da API

### Autenticação

#### Login

```http
POST /auth/login
```

**Body da Requisição:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Resposta de Sucesso (200):**

```json
{
  "access_token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Usuários

#### Criar Usuário

```http
POST /users
```

**Body da Requisição:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "VIEWER | ADVISOR | BROKER | ADMIN"
}
```

**Resposta de Sucesso (200):**

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

#### Buscar Usuários

```http
GET /users
```

**Parâmetros de Query:**

- `id`: string (opcional) - ID do usuário
- `email`: string (opcional) - Email do usuário
- `name`: string (opcional) - Nome do usuário
- `role`: string (opcional) - Role do usuário

**Resposta de Sucesso (200):**

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

ou

```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

#### Atualizar Usuário

```http
PUT /users/:id
```

**Parâmetros de URL:**

- `id`: string - ID do usuário

**Body da Requisição:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

**Resposta de Sucesso (200):**

```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

#### Deletar Usuário

```http
DELETE /users/:id
```

**Parâmetros de URL:**

- `id`: string - ID do usuário

**Resposta de Sucesso (200):**

```json
{
  "message": "User deleted successfully"
}
```

### Clientes

#### Criar Cliente

```http
POST /clients
```

**Body da Requisição:**

```json
{
  "name": "string",
  "email": "string",
  "sinacorCode": "string",
  "accountNumber": "string"
}
```

**Resposta de Sucesso (200):**

```json
{
  "client": {
    "id": "string",
    "name": "string",
    "email": "string",
    "sinacorCode": "string",
    "accountNumber": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)",
    "deletedAt": "string (ISO date) | null"
  }
}
```

#### Buscar Clientes

```http
GET /clients
```

**Parâmetros de Query:**

- `id`: string (opcional) - ID do cliente
- `email`: string (opcional) - Email do cliente
- `sinacorCode`: string (opcional) - Código Sinacor
- `accountNumber`: string (opcional) - Número da conta
- `role`: string (opcional) - Role do usuário (ADVISOR ou BROKER)
- `userId`: string (opcional) - ID do usuário (quando role é informado)

**Resposta de Sucesso (200):**

```json
{
  "client": {
    "id": "string",
    "name": "string",
    "email": "string",
    "sinacorCode": "string",
    "accountNumber": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)",
    "deletedAt": "string (ISO date) | null"
  }
}
```

ou

```json
{
  "clients": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "sinacorCode": "string",
      "accountNumber": "string",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)",
      "deletedAt": "string (ISO date) | null"
    }
  ]
}
```

#### Atualizar Cliente

```http
PUT /clients/:id
```

**Parâmetros de URL:**

- `id`: string - ID do cliente

**Body da Requisição:**

```json
{
  "name": "string",
  "email": "string",
  "sinacorCode": "string",
  "accountNumber": "string"
}
```

**Resposta de Sucesso (200):**

```json
{
  "client": {
    "id": "string",
    "name": "string",
    "email": "string",
    "sinacorCode": "string",
    "accountNumber": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)",
    "deletedAt": "string (ISO date) | null"
  }
}
```

#### Deletar Cliente

```http
DELETE /clients/:id
```

**Parâmetros de URL:**

- `id`: string - ID do cliente

**Resposta de Sucesso (200):**

```json
{
  "message": "Client deleted successfully"
}
```

### Produtos

#### Criar Produto

```http
POST /products
```

**Body da Requisição:**

```json
{
  "name": "string"
}
```

**Resposta de Sucesso (200):**

```json
{
  "product": {
    "id": "string",
    "name": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

#### Buscar Produtos

```http
GET /products
```

**Parâmetros de Query:**

- `id`: string (opcional) - ID do produto
- `name`: string (opcional) - Nome do produto

**Resposta de Sucesso (200):**

```json
{
  "product": {
    "id": "string",
    "name": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

ou

```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

#### Atualizar Produto

```http
PUT /products/:id
```

**Parâmetros de URL:**

- `id`: string - ID do produto

**Body da Requisição:**

```json
{
  "name": "string"
}
```

**Resposta de Sucesso (200):**

```json
{
  "product": {
    "id": "string",
    "name": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

#### Deletar Produto

```http
DELETE /products/:id
```

**Parâmetros de URL:**

- `id`: string - ID do produto

**Resposta de Sucesso (200):**

```json
{
  "message": "Product deleted successfully"
}
```

### Apólices

#### Criar Apólice

```http
POST /policies
```

**Body da Requisição:**

```json
{
  "name": "string",
  "clientId": "string",
  "productId": "string",
  "policyNumber": "string",
  "validity": "string (ISO date)",
  "frequency": "MONTHLY | ANNUAL",
  "monthlyPremium": "number",
  "annualPremium": "number",
  "paymentMethod": "CREDIT | DEBIT | BILL",
  "dueDate": "string (ISO date)"
}
```

**Resposta de Sucesso (200):**

```json
{
  "policy": {
    "id": "string",
    "name": "string",
    "clientId": "string",
    "productId": "string",
    "policyNumber": "string",
    "validity": "string (ISO date)",
    "frequency": "string",
    "monthlyPremium": "number",
    "annualPremium": "number",
    "paymentMethod": "string",
    "dueDate": "string (ISO date)",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

#### Buscar Apólices

```http
GET /policies
```

**Parâmetros de Query:**

- `id`: string (opcional) - ID da apólice
- `policyNumber`: string (opcional) - Número da apólice
- `clientId`: string (opcional) - ID do cliente
- `productId`: string (opcional) - ID do produto

**Resposta de Sucesso (200):**

```json
{
  "policy": {
    "id": "string",
    "name": "string",
    "clientId": "string",
    "productId": "string",
    "policyNumber": "string",
    "validity": "string (ISO date)",
    "frequency": "string",
    "monthlyPremium": "number",
    "annualPremium": "number",
    "paymentMethod": "string",
    "dueDate": "string (ISO date)",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

ou

```json
{
  "policies": [
    {
      "id": "string",
      "name": "string",
      "clientId": "string",
      "productId": "string",
      "policyNumber": "string",
      "validity": "string (ISO date)",
      "frequency": "string",
      "monthlyPremium": "number",
      "annualPremium": "number",
      "paymentMethod": "string",
      "dueDate": "string (ISO date)",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

#### Atualizar Apólice

```http
PUT /policies/:id
```

**Parâmetros de URL:**

- `id`: string - ID da apólice

**Body da Requisição:**

```json
{
  "name": "string",
  "validity": "string (ISO date)",
  "frequency": "MONTHLY | ANNUAL",
  "monthlyPremium": "number",
  "annualPremium": "number",
  "paymentMethod": "CREDIT | DEBIT | BILL",
  "dueDate": "string (ISO date)"
}
```

**Resposta de Sucesso (200):**

```json
{
  "policy": {
    "id": "string",
    "name": "string",
    "clientId": "string",
    "productId": "string",
    "policyNumber": "string",
    "validity": "string (ISO date)",
    "frequency": "string",
    "monthlyPremium": "number",
    "annualPremium": "number",
    "paymentMethod": "string",
    "dueDate": "string (ISO date)",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

#### Deletar Apólice

```http
DELETE /policies/:id
```

**Parâmetros de URL:**

- `id`: string - ID da apólice

**Resposta de Sucesso (200):**

```json
{
  "message": "Policy deleted successfully"
}
```

### Pagamentos

#### Buscar Pagamentos

```http
GET /payments
```

**Parâmetros de Query:**

- `id`: string (opcional) - ID do pagamento
- `policyId`: string (opcional) - ID da apólice
- `status`: string (opcional) - Status do pagamento (PAID | PENDING | DEFEATED)
- `month`: number (opcional) - Mês do vencimento
- `year`: number (opcional) - Ano do vencimento

**Resposta de Sucesso (200):**

```json
{
  "payment": {
    "id": "string",
    "policyId": "string",
    "plot": "string",
    "price": "number",
    "paymentStatus": "string",
    "parentId": "string | null",
    "dueDate": "string (ISO date)",
    "paymentDate": "string (ISO date) | null",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

ou

```json
{
  "payments": [
    {
      "id": "string",
      "policyId": "string",
      "plot": "string",
      "price": "number",
      "paymentStatus": "string",
      "parentId": "string | null",
      "dueDate": "string (ISO date)",
      "paymentDate": "string (ISO date) | null",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ]
}
```

#### Atualizar Status do Pagamento

```http
PUT /payments/:id/status
```

**Parâmetros de URL:**

- `id`: string - ID do pagamento

**Body da Requisição:**

```json
{
  "paymentStatus": "PAID | PENDING | DEFEATED",
  "paymentDate": "string (ISO date)"
}
```

**Resposta de Sucesso (200):**

```json
{
  "payment": {
    "id": "string",
    "policyId": "string",
    "plot": "string",
    "price": "number",
    "paymentStatus": "string",
    "parentId": "string | null",
    "dueDate": "string (ISO date)",
    "paymentDate": "string (ISO date) | null",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

### Respostas de Erro

Todas as rotas podem retornar os seguintes erros:

**400 Bad Request:**

```json
{
  "statusCode": 400,
  "message": "string",
  "error": "Bad Request"
}
```

**401 Unauthorized:**

```json
{
  "statusCode": 401,
  "message": "string",
  "error": "Unauthorized"
}
```

**404 Not Found:**

```json
{
  "statusCode": 404,
  "message": "string",
  "error": "Not Found"
}
```

**500 Internal Server Error:**

```json
{
  "statusCode": 500,
  "message": "string",
  "error": "Internal Server Error"
}
```

## Exemplos de Uso

### Criar um Cliente

```bash
curl -X POST http://localhost:3000/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "sinacorCode": "123456",
    "accountNumber": "789012"
  }'
```

### Buscar Clientes por Role

```bash
curl -X GET "http://localhost:3000/clients?role=ADVISOR&userId=123"
```

### Atualizar um Cliente

```bash
curl -X PUT http://localhost:3000/clients/123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "email": "joao.novo@email.com"
  }'
```

### Deletar um Cliente

```bash
curl -X DELETE http://localhost:3000/clients/123
```

## Estrutura do Projeto

O projeto segue uma arquitetura limpa (Clean Architecture) com as seguintes camadas:

- **Domain**: Contém as regras de negócio e entidades
- **Application**: Contém os casos de uso e interfaces de repositórios
- **Infra**: Contém as implementações concretas (banco de dados, etc)

## Funcionalidades

### Autenticação

- Login de usuários
- Gerenciamento de tokens JWT

### Usuários

- Criação de usuários com diferentes níveis de acesso (VIEWER, ADVISOR, BROKER, ADMIN)
- Listagem de usuários
- Atualização de usuários
- Deleção de usuários

### Clientes

- Criação de clientes
- Listagem de clientes
- Atualização de clientes
- Deleção de clientes
- Vinculação com usuários (advisors/brokers)

### Produtos

- Criação de produtos
- Listagem de produtos
- Atualização de produtos
- Deleção de produtos

### Apólices

- Criação de apólices
- Listagem de apólices
- Atualização de apólices
- Deleção de apólices
- Vinculação com clientes e produtos
- Cálculo automático de pagamentos

### Pagamentos

- Criação automática de pagamentos
- Listagem de pagamentos
- Atualização de status de pagamentos
- Busca por diferentes critérios:
  - Por ID
  - Por apólice
  - Por status
  - Por mês/ano de vencimento
- Atualização automática de status (PENDING -> DEFEATED)

## Tecnologias Utilizadas

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT para autenticação

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

## Execução

Para desenvolvimento:

```bash
npm run start:dev
```

Para produção:

```bash
npm run build
npm run start:prod
```

## Testes

```bash
npm run test
```

## Documentação da API

A documentação completa da API está disponível em formato OpenAPI/Swagger. Para acessar:

1. Inicie o servidor
2. Acesse: `http://localhost:3000/api`

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Produtos

### Criar Produto

```http
POST /products
Content-Type: application/json

{
  "name": "Nome do Produto"
}
```

Resposta:

```json
{
  "id": "uuid",
  "name": "Nome do Produto",
  "createdAt": "2024-03-14T10:00:00.000Z",
  "updatedAt": "2024-03-14T10:00:00.000Z"
}
```

### Buscar/Listar Produtos

```http
GET /products?id=uuid
```

ou

```http
GET /products
```

Resposta (com ID):

```json
[
  {
    "id": "uuid",
    "name": "Nome do Produto",
    "createdAt": "2024-03-14T10:00:00.000Z",
    "updatedAt": "2024-03-14T10:00:00.000Z"
  }
]
```

Resposta (sem ID - lista todos):

```json
[
  {
    "id": "uuid1",
    "name": "Produto 1",
    "createdAt": "2024-03-14T10:00:00.000Z",
    "updatedAt": "2024-03-14T10:00:00.000Z"
  },
  {
    "id": "uuid2",
    "name": "Produto 2",
    "createdAt": "2024-03-14T11:00:00.000Z",
    "updatedAt": "2024-03-14T11:00:00.000Z"
  }
]
```

### Atualizar Produto

```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Novo Nome do Produto"
}
```

Resposta:

```json
{
  "id": "uuid",
  "name": "Novo Nome do Produto",
  "createdAt": "2024-03-14T10:00:00.000Z",
  "updatedAt": "2024-03-14T12:00:00.000Z"
}
```

### Deletar Produto

```http
DELETE /products/:id
```

Resposta:

```json
{
  "message": "Produto deletado com sucesso"
}
```

### Validações

- Nome do produto é obrigatório
- ID do produto deve ser um UUID válido
- Nome do produto deve ser único

### Mensagens de Erro

- "Nome do produto é obrigatório" - quando o nome não é fornecido
- "ID do produto inválido" - quando o ID não é um UUID válido
- "Produto não encontrado" - quando o produto não existe
- "Erro ao buscar produto(s)" - quando ocorre um erro na busca
- "Erro ao criar produto" - quando ocorre um erro na criação
- "Erro ao atualizar produto" - quando ocorre um erro na atualização
- "Erro ao deletar produto" - quando ocorre um erro na deleção
