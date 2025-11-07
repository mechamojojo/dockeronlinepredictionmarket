# 🚀 Guia de Deploy Online

Este guia mostra como colocar seu servidor CDP SDK online para acesso de qualquer lugar.

## 📋 Opções de Deploy

### 1. 🆓 Render.com (Recomendado - Grátis)

**Vantagens:**
- ✅ Grátis para começar
- ✅ Deploy automático via GitHub
- ✅ SSL/HTTPS automático
- ✅ Fácil configuração

**Passos:**

1. **Crie uma conta em [Render.com](https://render.com)**

2. **Faça push do código para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin SEU_REPOSITORIO_GIT
   git push -u origin main
   ```

3. **No Render:**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub
   - Configurações:
     - **Name:** `cdp-sdk-example`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** `Free`

4. **Variáveis de Ambiente (se necessário):**
   - Adicione no painel do Render: `Environment` → `Add Environment Variable`
   - Exemplo: `NODE_ENV=production`

5. **Deploy:**
   - Render fará o deploy automaticamente
   - Você receberá uma URL como: `https://cdp-sdk-example.onrender.com`

---

### 2. 🚂 Railway.app (Recomendado - Grátis)

**Vantagens:**
- ✅ Grátis com $5 de crédito mensal
- ✅ Deploy muito rápido
- ✅ Integração com GitHub
- ✅ SSL automático

**Passos:**

1. **Crie uma conta em [Railway.app](https://railway.app)**

2. **Faça push do código para o GitHub**

3. **No Railway:**
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Escolha seu repositório
   - Railway detectará automaticamente o Node.js

4. **Configurações automáticas:**
   - Railway usa o `Procfile` que já está configurado
   - A porta será definida automaticamente via `$PORT`

5. **Deploy:**
   - Railway fará o deploy automaticamente
   - Você receberá uma URL como: `https://cdp-sdk-example.up.railway.app`

---

### 3. ☁️ Heroku (Clássico)

**Vantagens:**
- ✅ Confiável e estável
- ✅ Ecossistema maduro
- ⚠️ Plano gratuito removido (pago)

**Passos:**

1. **Instale o Heroku CLI:**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Ou baixe de: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **Crie o app:**
   ```bash
   heroku create cdp-sdk-example
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Acesse:**
   ```bash
   heroku open
   ```

---

### 4. 🧪 Ngrok (Para Testes Rápidos)

**Vantagens:**
- ✅ Instantâneo
- ✅ Ideal para testes e desenvolvimento
- ⚠️ URL temporária (muda a cada reinício)

**Passos:**

1. **Instale o ngrok:**
   ```bash
   # macOS
   brew install ngrok
   
   # Ou baixe de: https://ngrok.com/download
   ```

2. **Inicie seu servidor:**
   ```bash
   npm start
   ```

3. **Em outro terminal, execute:**
   ```bash
   ngrok http 3000
   ```

4. **Você receberá uma URL pública:**
   ```
   Forwarding  https://abc123.ngrok.io -> http://localhost:3000
   ```

---

### 5. 🌐 LocalTunnel (Alternativa Grátis ao Ngrok)

**Vantagens:**
- ✅ Grátis e open source
- ✅ Sem necessidade de conta
- ⚠️ URL pode mudar

**Passos:**

1. **Instale:**
   ```bash
   npm install -g localtunnel
   ```

2. **Inicie seu servidor:**
   ```bash
   npm start
   ```

3. **Em outro terminal:**
   ```bash
   npm run tunnel
   # Ou diretamente:
   lt --port 3000
   ```

4. **Você receberá uma URL pública temporária**

---

## 🔒 Configuração de Segurança

### Para Produção, adicione:

1. **Autenticação:**
   ```typescript
   // Adicione middleware de autenticação
   app.use('/api', authenticateToken);
   ```

2. **Rate Limiting:**
   ```bash
   npm install express-rate-limit
   ```

3. **Variáveis de Ambiente:**
   - Nunca commite arquivos `.env`
   - Use variáveis de ambiente da plataforma

4. **HTTPS:**
   - Render, Railway e Heroku fornecem HTTPS automaticamente

---

## 📝 Checklist de Deploy

- [ ] Código no GitHub
- [ ] Variáveis de ambiente configuradas
- [ ] Testes locais passando
- [ ] `.env` no `.gitignore`
- [ ] `Procfile` criado (para Heroku/Railway)
- [ ] `render.yaml` criado (para Render)
- [ ] Servidor ouvindo na porta `process.env.PORT`
- [ ] CORS configurado (se necessário)

---

## 🧪 Testando o Deploy

Após o deploy, teste os endpoints:

```bash
# Health check
curl https://seu-app.onrender.com/health

# Criar smart account
curl -X POST https://seu-app.onrender.com/api/create-smart-account \
  -H "Content-Type: application/json"
```

---

## 🆘 Troubleshooting

### Erro: "Port already in use"
- Certifique-se de usar `process.env.PORT` no código
- Plataformas cloud definem essa variável automaticamente

### Erro: "Build failed"
- Verifique se todas as dependências estão no `package.json`
- Certifique-se de que o Node.js está na versão correta

### Erro: "Application error"
- Verifique os logs da plataforma
- Certifique-se de que o servidor inicia corretamente
- Verifique se não há erros no código

---

## 📚 Recursos Úteis

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Heroku Docs](https://devcenter.heroku.com)
- [Ngrok Docs](https://ngrok.com/docs)

---

## 🎯 Recomendação

Para começar rápido: **Use Render.com** ou **Railway.app**
- Ambos são grátis
- Deploy automático via GitHub
- SSL/HTTPS incluído
- Fácil configuração

Para testes rápidos: **Use ngrok** ou **localtunnel**
- Instantâneo
- Sem configuração complexa
- Ideal para desenvolvimento

