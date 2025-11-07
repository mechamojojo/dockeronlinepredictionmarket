# 🔗 Conectando Thirdweb ao Servidor no Render

## 📋 Como Funciona

Anteriormente você usava:
- **Docker local**: `localhost:3005`
- **Thirdweb Engine URL**: `localhost:3005`

Agora você vai usar:
- **Servidor no Render**: `https://seu-app.onrender.com`
- **Thirdweb Engine URL**: `https://seu-app.onrender.com`

## 🚀 Passo a Passo

### 1. Obter a URL do Render

Após o deploy no Render, você receberá uma URL como:
- `https://cdp-sdk-api.onrender.com`
- `https://seu-app.onrender.com`

### 2. Configurar na Thirdweb

1. Acesse o painel da **Thirdweb**
2. Vá nas configurações do seu projeto
3. Encontre a opção **"Engine URL"** ou **"Backend URL"**
4. Configure:
   - **Antes**: `http://localhost:3005`
   - **Agora**: `https://seu-app.onrender.com` (sua URL do Render)

### 3. Testar a Conexão

A Thirdweb vai tentar se conectar ao seu servidor. Verifique:

1. **No Render (Logs):**
   - Você deve ver requisições chegando
   - Verifique se há erros de conexão

2. **Na Thirdweb:**
   - Deve mostrar "Connected" ou similar
   - Se houver erro, verifique a URL

## ⚠️ Importante

### Sobre a Variável `THIRDWEB_ENGINE_URL`

**Você NÃO precisa** configurar `THIRDWEB_ENGINE_URL` no código do servidor se:
- A Thirdweb já está configurada para usar a URL do Render
- O servidor não precisa se conectar a si mesmo

**Você PRECISA** configurar `THIRDWEB_ENGINE_URL` apenas se:
- O CDP SDK estiver tentando se conectar a um Engine
- Você receber erro "Engine instance could not be reached"

### Configuração no Render (Opcional)

Se o erro persistir, adicione no Render:

1. **Environment** → **Add Environment Variable**
2. Key: `THIRDWEB_ENGINE_URL`
3. Value: `https://seu-app.onrender.com` (mesma URL que você configurou na Thirdweb)

## 🔍 Troubleshooting

### Erro: "Engine instance could not be reached"

1. **Verifique se o servidor está online:**
   ```bash
   curl https://seu-app.onrender.com/health
   ```
   Deve retornar: `{"status":"ok",...}`

2. **Verifique a URL na Thirdweb:**
   - Deve ser: `https://seu-app.onrender.com`
   - **NÃO** use `http://` (use HTTPS)
   - **NÃO** adicione porta (Render usa porta padrão)

3. **Aguarde o servidor "acordar":**
   - No plano gratuito, pode levar ~30 segundos na primeira requisição

4. **Verifique os logs no Render:**
   - Veja se há requisições chegando
   - Veja se há erros

### O Servidor Está "Dormindo"

No plano gratuito do Render:
- Servidor "dorme" após 15 minutos sem uso
- Primeira requisição pode levar ~30 segundos
- Considere usar um serviço de "keep-alive" ou upgrade para plano pago

## 📝 Checklist

- [ ] Servidor deployado no Render
- [ ] URL do Render obtida (ex: `https://cdp-sdk-api.onrender.com`)
- [ ] URL configurada na Thirdweb
- [ ] Servidor testado: `curl https://seu-app.onrender.com/health`
- [ ] Thirdweb conectada com sucesso

## 🎯 Resumo

**Configuração na Thirdweb:**
```
Engine URL: https://seu-app.onrender.com
```

**Variáveis no Render (apenas se necessário):**
```
CDP_API_KEY_ID=...
CDP_API_KEY_SECRET=...
CDP_WALLET_SECRET=...
THIRDWEB_ENGINE_URL=https://seu-app.onrender.com (opcional)
```

