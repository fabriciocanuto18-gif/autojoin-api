const express = require("express");
const app = express();

app.use(express.json());

// 🔥 dados atuais do servidor
let currentServer = {
  jobId: null,
  boneco: null,       // nome do bot que encontrou (ex: valysegalera83)
  brainrot: null,     // nome do brainrot (ex: Dragon Cannelloni, Garama and Madundung)
  geracao: null,      // número da geração em amarelo na UI (ex: 5, Gen 3)
  jogadores: 0
};

// Endpoint que o Roblox LÊ
app.get("/jobid", (req, res) => {
  res.json(currentServer);
});

// Endpoint que o hop/bot ENVIA
app.post("/update", (req, res) => {
  const { jobId, boneco, brainrot, geracao, jogadores } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "jobId ausente" });
  }

  currentServer = {
    jobId,
    boneco: boneco || null,
    brainrot: brainrot || null,
    geracao: geracao || null,
    jogadores: jogadores || 0
  };

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API rodando na porta", PORT);
});
