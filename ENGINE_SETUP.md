# 🔧 Configuração do Thirdweb Engine

Este servidor **É** o Thirdweb Engine. O CDP SDK precisa saber a URL deste servidor para se conectar.

## 🎯 Solução

### 1. Obter a URL do Servidor no Render

Após o deploy no Render, você receberá uma URL como:
- `https://cdp-sdk-api.onrender.com`
- `https://seu-app.onrender.com`

### 2. Configurar no Render

1. **No Render, vá para seu serviço**
2. **Clique em "Environment"**
3. **Adicione a variável:**
   - Key: `THIRDWEB_ENGINE_URL`
   - Value: `https://seu-app.onrender.com` (use a URL que o Render forneceu)

4. **OU use:**
   - Key: `CDP_ENGINE_URL`
   - Value: `https://seu-app.onrender.com`

### 3. Fazer Novo Deploy

Após adicionar a variável:
1. Clique em **"Save Changes"**
2. Vá em **"Manual Deploy"**
3. Clique em **"Deploy latest commit"**

## 🔍 Como Funciona

O código detecta automaticamente a URL do Render através da variável `RENDER_EXTERNAL_URL`. Se você configurar `THIRDWEB_ENGINE_URL` manualmente, ela terá prioridade.

**Ordem de prioridade:**
1. `THIRDWEB_ENGINE_URL` (variável manual)
2. `CDP_ENGINE_URL` (variável manual alternativa)
3. `RENDER_EXTERNAL_URL` (detectada automaticamente pelo Render)
4. `null` (usa configuração padrão do CDP SDK)

## ✅ Verificação

Após configurar, nos logs você verá:

```
✅ CDP Client configured successfully
✅ Engine URL: https://seu-app.onrender.com
🚀 Servidor rodando na porta [PORT]
🌍 URL pública: https://seu-app.onrender.com
```

## ⚠️ Importante

- A URL do Engine deve ser a URL **pública** do seu servidor no Render
- Certifique-se de que a URL está acessível (não bloqueada por firewall)
- Use HTTPS (o Render fornece HTTPS automaticamente)

## 🐛 Troubleshooting

### Erro: "Engine instance could not be reached"

1. **Verifique se a URL está correta:**
   - Acesse a URL no navegador: `https://seu-app.onrender.com/health`
   - Deve retornar: `{"status":"ok","timestamp":"..."}`

2. **Verifique se a variável está configurada:**
   - No Render: Environment → `THIRDWEB_ENGINE_URL`
   - Deve ter o valor: `https://seu-app.onrender.com`

3. **Verifique os logs:**
   - Nos logs do servidor, você deve ver: `✅ Engine URL: https://...`

4. **Aguarde o servidor "acordar":**
   - No plano gratuito, o servidor pode "dormir" após 15 minutos
   - A primeira requisição pode levar ~30 segundos

## 📝 Exemplo Completo

**No Render (Environment):**
```
CDP_API_KEY_ID=seu-api-key-id
CDP_API_KEY_SECRET=seu-api-key-secret
CDP_WALLET_SECRET=seu-wallet-secret
THIRDWEB_ENGINE_URL=https://cdp-sdk-api.onrender.com
```

**URL do servidor (exemplo):**
```
https://cdp-sdk-api.onrender.com
```

