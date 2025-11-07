import { CdpClient } from "@coinbase/cdp-sdk";
import { parseEther } from "viem";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

// CORS - permite requisições de qualquer origem
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const cdp = new CdpClient();

// Endpoint raiz
app.get("/", (req, res) => {
  res.json({
    message: "CDP SDK API",
    endpoints: {
      "POST /api/create-smart-account": "Cria uma smart account",
      "POST /api/send-user-operation": "Envia uma user operation",
      "POST /api/wait-for-user-operation": "Aguarda confirmação",
      "GET /health": "Health check",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Criar smart account
app.post("/api/create-smart-account", async (req, res) => {
  try {
    const owner = await cdp.evm.createAccount({});
    const smartAccount = await cdp.evm.createSmartAccount({ owner });

    res.json({
      success: true,
      ownerAddress: owner.address,
      smartAccountAddress: smartAccount.address,
    });
  } catch (error: any) {
    console.error("Error creating smart account:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Enviar user operation
app.post("/api/send-user-operation", async (req, res) => {
  try {
    const {
      ownerAddress,
      to = "0x0000000000000000000000000000000000000000",
      value = "0",
      data = "0x",
      network = "base-sepolia",
    } = req.body;

    // Criar owner e smart account
    const owner = await cdp.evm.createAccount({});
    const smartAccount = await cdp.evm.createSmartAccount({ owner });

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

    res.json({
      success: true,
      userOpHash: result.userOpHash,
      status: result.status,
      smartAccountAddress: smartAccount.address,
      ownerAddress: owner.address,
    });
  } catch (error: any) {
    console.error("Error sending user operation:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Aguardar confirmação
app.post("/api/wait-for-user-operation", async (req, res) => {
  try {
    const { smartAccountAddress, userOpHash } = req.body;

    if (!smartAccountAddress || !userOpHash) {
      return res.status(400).json({
        success: false,
        error: "smartAccountAddress and userOpHash are required",
      });
    }

    const userOperation = await cdp.evm.waitForUserOperation({
      smartAccountAddress,
      userOpHash,
    });

    if (userOperation.status === "complete") {
      res.json({
        success: true,
        status: userOperation.status,
        transactionHash: userOperation.transactionHash,
        explorerLink: `https://sepolia.basescan.org/tx/${userOperation.transactionHash}`,
      });
    } else {
      res.json({
        success: false,
        status: userOperation.status,
      });
    }
  } catch (error: any) {
    console.error("Error waiting for user operation:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
});
