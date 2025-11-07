# CDP SDK Example

Servidor HTTP simples usando o CDP SDK da Coinbase, rodando na porta 3005.

## Instalação

```bash
npm install
```

## Como Executar

```bash
npm start
```

Ou em modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

## Servidor

O servidor roda na porta **3005**:
- **Local:** http://localhost:3005
- **Rede:** http://SEU_IP:3005

## Endpoints

### GET /
Lista todos os endpoints disponíveis.

### GET /health
Health check do servidor.

### POST /api/create-smart-account
Cria uma nova smart account.

### POST /api/send-user-operation
Envia uma user operation.

### POST /api/wait-for-user-operation
Aguarda confirmação de uma user operation.

## Variáveis de Ambiente

Crie um arquivo `.env` se necessário.

## Requisitos

- Node.js 18+
- npm ou yarn
