# Guia de Requisições - Financial Control API

## Autenticação

### Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "token": "string"
}
```

## Usuários

### Criar Usuário

```http
POST /users
```

Request:

```json
{
  "email": "string",
  "password": "string",
  "role": "VIEWER | ADVISOR | BROKER | ADMIN"
}
```

Response:

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "role": "string",
    "createdAt": "string"
  }
}
```

### Listar Usuários

```http
GET /users
```

Response:

```json
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "role": "string",
      "createdAt": "string"
    }
  ]
}
```

### Atualizar Usuário

```http
PUT /users/:id
```

Request:

```json
{
  "email": "string",
  "password": "string",
  "role": "VIEWER | ADVISOR | BROKER | ADMIN"
}
```

Response:

```json
{
  "user": {
    "id": "string",
    "email": "string",
    "role": "string",
    "updatedAt": "string"
  }
}
```

### Deletar Usuário

```http
DELETE /users/:id
```

Response:

```json
{
  "success": true
}
```

## Clientes

### Criar Cliente

```http
POST /clients
```

Request:

```json
{
  "name": "string",
  "email": "string",
  "sinacorCode": "string",
  "accountNumber": "string"
}
```

Response:

```json
{
  "client": {
    "id": "string",
    "name": "string",
    "email": "string",
    "sinacorCode": "string",
    "accountNumber": "string",
    "createdAt": "string"
  }
}
```

### Listar Clientes

```http
GET /clients
```

Response:

```json
{
  "clients": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "sinacorCode": "string",
      "accountNumber": "string",
      "createdAt": "string"
    }
  ]
}
```

### Atualizar Cliente

```http
PUT /clients/:id
```

Request:

```json
{
  "name": "string",
  "email": "string",
  "sinacorCode": "string",
  "accountNumber": "string"
}
```

Response:

```json
{
  "client": {
    "id": "string",
    "name": "string",
    "email": "string",
    "sinacorCode": "string",
    "accountNumber": "string",
    "updatedAt": "string"
  }
}
```

### Deletar Cliente

```http
DELETE /clients/:id
```

Response:

```json
{
  "success": true
}
```

## Apólices

### Criar Apólice

```http
POST /policies
```

Request:

```json
{
  "name": "string",
  "clientId": "string",
  "productId": "string",
  "policyNumber": "string",
  "validity": "string (ISO date)",
  "frequency": "MONTHLY | ANNUAL",
  "monthlyPremium": "number (optional)",
  "annualPremium": "number (optional)",
  "paymentMethod": "CREDIT | DEBIT | BILL",
  "dueDate": "string (ISO date)"
}
```

Response:

```json
{
  "policy": {
    "id": "string",
    "name": "string",
    "clientId": "string",
    "responsible": {
      "advisor": "string",
      "broker": "string"
    },
    "productId": "string",
    "policyNumber": "string",
    "validity": "string",
    "frequency": "string",
    "monthlyPremium": "number",
    "annualPremium": "number",
    "paymentMethod": "string",
    "dueDate": "string",
    "createdAt": "string"
  }
}
```

### Buscar Apólice

```http
GET /policies/:id
```

ou

```http
GET /policies?policyNumber=string
```

Response:

```json
{
  "policy": {
    "id": "string",
    "name": "string",
    "clientId": "string",
    "responsible": {
      "advisor": "string",
      "broker": "string"
    },
    "productId": "string",
    "policyNumber": "string",
    "validity": "string",
    "frequency": "string",
    "monthlyPremium": "number",
    "annualPremium": "number",
    "paymentMethod": "string",
    "dueDate": "string",
    "createdAt": "string"
  }
}
```

### Listar Todas as Apólices

```http
GET /policies
```

Response:

```json
{
  "policies": [
    {
      "id": "string",
      "name": "string",
      "clientId": "string",
      "responsible": {
        "advisor": "string",
        "broker": "string"
      },
      "productId": "string",
      "policyNumber": "string",
      "validity": "string",
      "frequency": "string",
      "monthlyPremium": "number",
      "annualPremium": "number",
      "paymentMethod": "string",
      "dueDate": "string",
      "createdAt": "string"
    }
  ]
}
```

### Atualizar Apólice

```http
PUT /policies/:id
```

Request:

```json
{
  "name": "string",
  "clientId": "string",
  "responsible": {
    "advisor": "string",
    "broker": "string"
  },
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

Response:

```json
{
  "policy": {
    "id": "string",
    "name": "string",
    "clientId": "string",
    "responsible": {
      "advisor": "string",
      "broker": "string"
    },
    "productId": "string",
    "policyNumber": "string",
    "validity": "string",
    "frequency": "string",
    "monthlyPremium": "number",
    "annualPremium": "number",
    "paymentMethod": "string",
    "dueDate": "string",
    "updatedAt": "string"
  }
}
```

### Deletar Apólice

```http
DELETE /policies/:id
```

Response:

```json
{
  "success": true
}
```

## Pagamentos

### Buscar Pagamento

```http
GET /payments/:id
```

Response:

```json
{
  "payment": {
    "id": "string",
    "policyId": "string",
    "plot": "string",
    "price": "number",
    "paymentStatus": "PAID | PENDING | DEFEATED",
    "parentId": "string",
    "dueDate": "string",
    "paymentDate": "string",
    "createdAt": "string"
  }
}
```

### Listar Pagamentos

```http
GET /payments?policyId=string&status=PAID|PENDING|DEFEATED
```

Response:

```json
{
  "payments": [
    {
      "id": "string",
      "policyId": "string",
      "plot": "string",
      "price": "number",
      "paymentStatus": "string",
      "parentId": "string",
      "dueDate": "string",
      "paymentDate": "string",
      "createdAt": "string"
    }
  ]
}
```

### Atualizar Pagamento

```http
PUT /payments/:id
```

Request:

```json
{
  "paymentStatus": "PAID | PENDING | DEFEATED",
  "paymentDate": "string (ISO date)"
}
```

Response:

```json
{
  "payment": {
    "id": "string",
    "policyId": "string",
    "plot": "string",
    "price": "number",
    "paymentStatus": "string",
    "parentId": "string",
    "dueDate": "string",
    "paymentDate": "string",
    "updatedAt": "string"
  }
}
```

### Gerenciamento de Pagamentos

#### Buscar Pagamentos Próximos

```http
GET /payments/upcoming?days=number
```

Response:

```json
{
  "payments": [
    {
      "id": "string",
      "policyId": "string",
      "plot": "string",
      "price": "number",
      "paymentStatus": "string",
      "parentId": "string",
      "dueDate": "string",
      "paymentDate": "string",
      "createdAt": "string"
    }
  ]
}
```

#### Buscar Pagamentos Atrasados

```http
GET /payments/overdue
```

Response:

```json
{
  "payments": [
    {
      "id": "string",
      "policyId": "string",
      "plot": "string",
      "price": "number",
      "paymentStatus": "string",
      "parentId": "string",
      "dueDate": "string",
      "paymentDate": "string",
      "createdAt": "string"
    }
  ]
}
```

#### Atualizar Status de Pagamentos Atrasados

```http
PUT /payments/overdue/update-status
```

Response:

```json
{
  "updatedCount": "number"
}
```

#### Marcar Pagamento como Pago

```http
PUT /payments/:id/mark-as-paid
```

Response:

```json
{
  "payment": {
    "id": "string",
    "policyId": "string",
    "plot": "string",
    "price": "number",
    "paymentStatus": "PAID",
    "parentId": "string",
    "dueDate": "string",
    "paymentDate": "string",
    "updatedAt": "string"
  }
}
```

## Enums

### EnumUserRole

- VIEWER
- ADVISOR
- BROKER
- ADMIN

### EnumPaymentStatus

- PAID
- PENDING
- DEFEATED

### EnumFrequency

- MONTHLY
- ANNUAL

### EnumPaymentMethod

- CREDIT
- DEBIT
- BILL
