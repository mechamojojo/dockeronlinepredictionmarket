# CDP SDK API Server

API HTTP simples para usar o CDP SDK da Coinbase.

## 🚀 Instalação

```bash
npm install
```

## 💻 Executar Localmente

```bash
npm start
```

Ou em modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

## 📡 Endpoints

### GET /
Lista todos os endpoints disponíveis.

### GET /health
Health check do servidor.

### POST /api/create-smart-account
Cria uma nova smart account.

**Resposta:**
```json
{
  "success": true,
  "ownerAddress": "0x...",
  "smartAccountAddress": "0x..."
}
```

### POST /api/send-user-operation
Envia uma user operation.

**Body:**
```json
{
  "to": "0x0000000000000000000000000000000000000000",
  "value": "0",
  "data": "0x",
  "network": "base-sepolia"
}
```

**Resposta:**
```json
{
  "success": true,
  "userOpHash": "...",
  "status": "...",
  "smartAccountAddress": "0x...",
  "ownerAddress": "0x..."
}
```

### POST /api/wait-for-user-operation
Aguarda confirmação de uma user operation.

**Body:**
```json
{
  "smartAccountAddress": "0x...",
  "userOpHash": "..."
}
```

**Resposta:**
```json
{
  "success": true,
  "status": "complete",
  "transactionHash": "0x...",
  "explorerLink": "https://sepolia.basescan.org/tx/..."
}
```

## 🌐 Deploy no Render.com

### Passo 1: Enviar para o GitHub

```bash
git add .
git commit -m "Add API server"
git push
```

### Passo 2: Configurar no Render

1. Acesse [render.com](https://render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name:** `cdp-sdk-api`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
5. Clique em **"Create Web Service"**

### Passo 3: Aguardar Deploy

O Render fará o deploy automaticamente. Você receberá uma URL como:
`https://cdp-sdk-api.onrender.com`

## 📝 Exemplo de Uso

### Criar Smart Account

```bash
curl -X POST https://seu-app.onrender.com/api/create-smart-account \
  -H "Content-Type: application/json"
```

### Enviar User Operation

```bash
curl -X POST https://seu-app.onrender.com/api/send-user-operation \
  -H "Content-Type: application/json" \
  -d '{
    "to": "0x0000000000000000000000000000000000000000",
    "value": "0",
    "network": "base-sepolia"
  }'
```

### JavaScript/Fetch

```javascript
// Criar smart account
const response = await fetch('https://seu-app.onrender.com/api/create-smart-account', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});
const data = await response.json();
console.log(data);
```

## ⚠️ Notas

- No plano gratuito do Render, o servidor pode "dormir" após 15 minutos de inatividade
- A primeira requisição após dormir pode levar ~30 segundos
- Para produção, considere adicionar autenticação e rate limiting
