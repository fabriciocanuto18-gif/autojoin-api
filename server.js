const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Aqui guarda o último envio
let last = {
  jobId: null,
  boneco: null,
  jogadores: 0,
  updatedAt: null
};

// Recebe dados do seu script
app.post("/update", (req, res) => {
  const { jobId, boneco, jogadores } = req.body || {};
  if (!jobId || !boneco || typeof jogadores !== "number") {
    return res.status(400).json({ ok: false, error: "payload inválido" });
  }

  last = {
    jobId,
    boneco,
    jogadores,
    updatedAt: new Date().toISOString()
  };

  return res.json({ ok: true });
});

// Mostra o último envio
app.get("/jobid", (req, res) => {
  return res.json(last);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});