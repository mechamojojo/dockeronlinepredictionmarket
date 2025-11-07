# 🚀 Guia de Deploy no Render.com

## Passo a Passo

### 1. Enviar Código para o GitHub

```bash
git add .
git commit -m "Add API server for Render deployment"
git push
```

### 2. Configurar no Render.com

1. **Acesse [render.com](https://render.com)** e faça login
2. **Clique em "New +"** → **"Web Service"**
3. **Conecte seu repositório:**
   - Selecione `mechamojojo/dockeronlinepredictionmarket`
   - Ou clique em "Configure account" se não aparecer

### 3. Configurações do Serviço

**Nome:**
- `cdp-sdk-api` (ou qualquer nome)

**Build & Deploy:**
- **Runtime:** `Node` (já selecionado)
- **Build Command:** `npm install` (ou deixe vazio - Render faz npm install automaticamente)
- **Start Command:** `npm start`

**IMPORTANTE:** Se o deploy falhar, verifique manualmente no painel do Render:
1. Vá em **Settings** → **Build & Deploy**
2. Certifique-se de que:
   - Build Command está como: `npm install` (ou vazio)
   - Start Command está como: `npm start`
3. Salve e faça um novo deploy

**Plan:**
- Selecione **"Free"**

### 4. Criar e Deploy

1. Clique em **"Create Web Service"**
2. Aguarde 2-5 minutos para o deploy
3. Você receberá uma URL como: `https://cdp-sdk-api.onrender.com`

### 5. Testar

```bash
# Health check
curl https://seu-app.onrender.com/health

# Criar smart account
curl -X POST https://seu-app.onrender.com/api/create-smart-account \
  -H "Content-Type: application/json"
```

## ✅ Pronto!

Seu servidor estará online e você poderá usar na sua aplicação!

## 📝 Exemplo de Uso na Aplicação

```javascript
// Criar smart account
const createAccount = async () => {
  const response = await fetch('https://seu-app.onrender.com/api/create-smart-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  console.log('Smart Account:', data.smartAccountAddress);
  return data;
};

// Enviar user operation
const sendOperation = async (to, value) => {
  const response = await fetch('https://seu-app.onrender.com/api/send-user-operation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      value,
      network: 'base-sepolia'
    })
  });
  return await response.json();
};
```

## ⚠️ Importante

- No plano gratuito, o servidor pode "dormir" após 15 minutos sem uso
- A primeira requisição após dormir pode levar ~30 segundos
- Para produção, considere um plano pago ou use um serviço de keep-alive

