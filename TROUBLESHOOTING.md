# 🔧 Troubleshooting - Deploy no Render

## ❌ Erro: Deploy Failed

Se o deploy falhou, siga estes passos:

### 1. Verificar Configurações no Render

No painel do Render, vá em **Settings** → **Build & Deploy**:

**Build Command:**

```
npm install
```

Ou deixe **vazio** (Render faz npm install automaticamente)

**Start Command:**

```
npm start
```

**Node Version:**

- Deixe **automático** ou escolha **20.x**

### 2. Verificar Logs

1. No Render, vá para a aba **"Logs"**
2. Procure por erros durante o build ou start
3. Erros comuns:
   - `tsx: command not found` → tsx precisa estar em dependencies (já está ✅)
   - `Cannot find module` → Verifique se todas as dependências estão no package.json
   - `Port already in use` → Render define PORT automaticamente (já configurado ✅)

### 3. Testar Localmente

Antes de fazer deploy, teste localmente:

```bash
npm install
npm start
```

Se funcionar localmente, deve funcionar no Render.

### 4. Solução Alternativa: Configuração Manual

Se o `render.yaml` não estiver sendo usado:

1. **Remova o render.yaml** temporariamente
2. **Configure manualmente no Render:**
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Salve e faça novo deploy**

### 5. Verificar Dependências

Certifique-se de que `tsx` está em `dependencies` (não em `devDependencies`):

```json
{
  "dependencies": {
    "tsx": "^4.7.0",
    ...
  }
}
```

✅ **Já está correto no package.json atual!**

### 6. Deploy Manual

Se o deploy automático não funcionar:

1. No Render, vá em **"Manual Deploy"**
2. Selecione **"Deploy latest commit"**
3. Aguarde o deploy completar

## ✅ Checklist

- [ ] Build Command: `npm install` (ou vazio)
- [ ] Start Command: `npm start`
- [ ] `tsx` está em `dependencies`
- [ ] Testou localmente com `npm start`
- [ ] Verificou os logs no Render
- [ ] Código está no GitHub

## 🆘 Ainda com Problemas?

1. Verifique os logs completos no Render
2. Teste localmente primeiro
3. Certifique-se de que todas as dependências estão instaladas
4. Verifique se há erros de sintaxe no código

## 💡 Dica

Se continuar falhando, tente criar um novo serviço no Render do zero, em vez de editar o existente.
