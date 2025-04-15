# Financial Control API

API para controle financeiro de apólices e pagamentos.

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
