# 🚀 Deploy no Render.com - Passo a Passo

Seu código já está no GitHub: https://github.com/mechamojojo/dockeronlinepredictionmarket

## 📋 Passo a Passo no Render.com

### 1. Criar Conta no Render

1. Acesse [https://render.com](https://render.com)
2. Clique em **"Get Started for Free"** ou **"Sign Up"**
3. Escolha **"Sign up with GitHub"** (recomendado)
4. Autorize o Render a acessar seus repositórios

### 2. Criar Novo Web Service

1. No dashboard do Render, clique no botão **"New +"** (canto superior direito)
2. Selecione **"Web Service"**

### 3. Conectar Repositório

1. Na seção **"Connect a repository"**, procure por:
   - `mechamojojo/dockeronlinepredictionmarket`
2. Clique no repositório para conectá-lo
3. Se não aparecer, clique em **"Configure account"** e autorize o acesso

### 4. Configurar o Serviço

Preencha os seguintes campos:

**Configurações Básicas:**
- **Name:** `cdp-sdk-example` (ou qualquer nome que você preferir)
- **Region:** Escolha a região mais próxima (ex: `Oregon (US West)` ou `Frankfurt (EU Central)`)

**Build & Deploy:**
- **Runtime:** `Node` (já deve estar selecionado automaticamente)
- **Build Command:** `npm install` (já está configurado no `render.yaml`)
- **Start Command:** `npm start` (já está configurado no `render.yaml`)

**Plan:**
- Selecione **"Free"** (plano gratuito)

**Advanced:**
- Deixe as configurações padrão
- O arquivo `render.yaml` já configura tudo automaticamente

### 5. Variáveis de Ambiente (Opcional)

Se você tiver variáveis de ambiente (como API keys):

1. Role até a seção **"Environment Variables"**
2. Clique em **"Add Environment Variable"**
3. Adicione as variáveis necessárias:
   - `NODE_ENV=production`
   - Outras variáveis se necessário

### 6. Criar e Fazer Deploy

1. Clique em **"Create Web Service"**
2. Render começará a fazer o build automaticamente
3. Aguarde 2-5 minutos enquanto o Render:
   - Instala as dependências
   - Faz o build do projeto
   - Inicia o servidor

### 7. Verificar Deploy

1. Após o deploy concluir, você verá uma URL como:
   - `https://cdp-sdk-example.onrender.com`
   - Ou `https://dockeronlinepredictionmarket.onrender.com`

2. Clique na URL ou no botão **"Visit"** para acessar seu servidor

3. Teste o endpoint:
   ```
   https://seu-app.onrender.com/health
   ```

## ✅ Pronto!

Seu servidor está online e acessível de qualquer lugar do mundo!

## 🔍 Verificando os Logs

Para ver os logs do servidor:

1. No dashboard do Render, clique no seu serviço
2. Vá para a aba **"Logs"**
3. Você verá os logs em tempo real

## 🔄 Atualizações Futuras

Toda vez que você fizer push para o GitHub, o Render fará deploy automático:

```bash
git add .
git commit -m "Sua mensagem"
git push
```

O Render detectará as mudanças e fará um novo deploy automaticamente!

## 🐛 Troubleshooting

### Erro de Build
- Verifique os logs no Render
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se o Node.js está na versão correta

### Servidor não inicia
- Verifique os logs para ver o erro
- Certifique-se de que a porta está configurada como `process.env.PORT`
- Verifique se o comando `npm start` está funcionando localmente

### Erro 503 ou Timeout
- No plano gratuito, o servidor "dorme" após 15 minutos de inatividade
- A primeira requisição após dormir pode demorar ~30 segundos para acordar
- Considere usar um serviço de "keep-alive" ou upgrade para um plano pago

## 📝 Checklist

- [x] Código no GitHub
- [x] Conta no Render criada
- [x] Repositório conectado
- [ ] Serviço criado no Render
- [ ] Deploy concluído
- [ ] URL funcionando
- [ ] Endpoint `/health` testado

## 🎯 Próximos Passos

1. ✅ Faça o deploy no Render seguindo os passos acima
2. 🔒 Adicione autenticação se necessário
3. 📊 Configure monitoramento (opcional)
4. 🚀 Compartilhe sua API!

---

**Dúvidas?** Consulte a [documentação do Render](https://render.com/docs) ou os logs do seu serviço.

