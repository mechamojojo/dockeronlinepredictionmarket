import { CdpClient } from "@coinbase/cdp-sdk";
import { parseEther } from "viem";
import dotenv from "dotenv";
import express from "express";
import { networkInterfaces } from "os";

dotenv.config();

const app = express();

// CORS - permite requisições de qualquer origem (ajuste conforme necessário)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const cdp = new CdpClient();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0"; // 0.0.0.0 permite acesso de outras máquinas

// Função para obter o IP local da máquina
function getLocalIP(): string | null {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

// Endpoint para criar uma conta
app.post("/api/create-account", async (req, res) => {
  try {
    const owner = await cdp.evm.createAccount({});
    console.log("Created owner account:", owner.address);
    res.json({ success: true, address: owner.address });
  } catch (error: any) {
    console.error("Error creating account:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint para criar smart account
app.post("/api/create-smart-account", async (req, res) => {
  try {
    // Para simplificar, criamos uma nova conta owner primeiro
    // Em produção, você deveria gerenciar as contas de forma persistente
    const owner = await cdp.evm.createAccount({});
    const smartAccount = await cdp.evm.createSmartAccount({
      owner,
    });
    console.log("Created smart account:", smartAccount.address);
    res.json({
      success: true,
      smartAccountAddress: smartAccount.address,
      ownerAddress: owner.address,
    });
  } catch (error: any) {
    console.error("Error creating smart account:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint para enviar user operation
app.post("/api/send-user-operation", async (req, res) => {
  try {
    const {
      ownerAddress,
      smartAccountAddress,
      to = "0x0000000000000000000000000000000000000000",
      value = "0",
      data = "0x",
      network = "base-sepolia",
    } = req.body;

    if (!smartAccountAddress) {
      return res.status(400).json({
        success: false,
        error: "smartAccountAddress is required",
      });
    }

    // Recriar o owner a partir do endereço (em produção, você deveria armazenar a chave privada)
    const owner = await cdp.evm.createAccount({});

    // Recriar o smart account (em produção, você deveria persistir isso)
    const smartAccount = await cdp.evm.createSmartAccount({
      owner,
    });

    const result = await cdp.evm.sendUserOperation({
      smartAccount,
      network,
      calls: [
        {
          to,
          value: parseEther(value),
          data,
        },
      ],
    });

    console.log("User operation status:", result.status);

    res.json({
      success: true,
      userOpHash: result.userOpHash,
      status: result.status,
    });
  } catch (error: any) {
    console.error("Error sending user operation:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint para aguardar confirmação de user operation
app.post("/api/wait-for-user-operation", async (req, res) => {
  try {
    const { smartAccountAddress, userOpHash } = req.body;

    if (!smartAccountAddress || !userOpHash) {
      return res.status(400).json({
        success: false,
        error: "smartAccountAddress and userOpHash are required",
      });
    }

    console.log("Waiting for user operation to be confirmed...");
    const userOperation = await cdp.evm.waitForUserOperation({
      smartAccountAddress,
      userOpHash,
    });

    if (userOperation.status === "complete") {
      const explorerLink = `https://sepolia.basescan.org/tx/${userOperation.transactionHash}`;
      console.log(
        "User operation confirmed. Block explorer link:",
        explorerLink
      );
      res.json({
        success: true,
        status: userOperation.status,
        transactionHash: userOperation.transactionHash,
        explorerLink,
      });
    } else {
      console.log("User operation failed");
      res.json({
        success: false,
        status: userOperation.status,
      });
    }
  } catch (error: any) {
    console.error("Error waiting for user operation:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint de health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint raiz
app.get("/", (req, res) => {
  res.json({
    message: "CDP SDK Example Server",
    endpoints: {
      "POST /api/create-account": "Cria uma nova conta",
      "POST /api/create-smart-account": "Cria uma smart account",
      "POST /api/send-user-operation": "Envia uma user operation",
      "POST /api/wait-for-user-operation":
        "Aguarda confirmação de user operation",
      "GET /health": "Health check",
    },
  });
});

app.listen(Number(PORT), HOST, () => {
  const localIP = getLocalIP();
  const isProduction = process.env.NODE_ENV === "production";
  const deployedUrl =
    process.env.DEPLOYED_URL ||
    process.env.RAILWAY_PUBLIC_DOMAIN ||
    process.env.RENDER_EXTERNAL_URL;

  console.log("\n" + "=".repeat(60));
  console.log(`🚀 Servidor CDP SDK rodando!`);
  console.log("=".repeat(60));

  if (isProduction && deployedUrl) {
    console.log(`🌍 Online:    ${deployedUrl}`);
    console.log(`📍 Ambiente:  PRODUÇÃO`);
  } else {
    console.log(`📍 Local:     http://localhost:${PORT}`);
    if (localIP) {
      console.log(`🌐 Rede:      http://${localIP}:${PORT}`);
    }
  }

  console.log(`🔧 Host:      ${HOST}:${PORT}`);
  console.log("=".repeat(60) + "\n");

  if (isProduction && deployedUrl) {
    console.log(`✅ Servidor acessível online em: ${deployedUrl}\n`);
  } else if (localIP) {
    console.log(`💡 Para acesso na rede local:`);
    console.log(`   http://${localIP}:${PORT}\n`);
    console.log(`💡 Para acesso online (túnel):`);
    console.log(`   1. Instale: npm install -g localtunnel`);
    console.log(`   2. Execute: npm run tunnel`);
    console.log(`   3. Ou use ngrok: npx ngrok http ${PORT}\n`);
  } else {
    console.log(`⚠️  Não foi possível detectar o IP local automaticamente.`);
    console.log(
      `   Execute 'ifconfig' (macOS/Linux) ou 'ipconfig' (Windows) para descobrir seu IP.\n`
    );
  }
});
