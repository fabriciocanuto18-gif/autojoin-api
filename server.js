const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Múltiplos jobs (um por bot) - chave = nome do bot (boneco)
const jobsMap = {};

// Recebe dados do seu script
app.post("/update", (req, res) => {
  const { jobId, boneco, brainrot, geracao, jogadores } = req.body || {};
  if (!jobId || !boneco || typeof jogadores !== "number") {
    return res.status(400).json({ ok: false, error: "payload inválido" });
  }

  const botKey = boneco.toString();
  jobsMap[botKey] = {
    jobId,
    boneco,
    brainrot: brainrot || null,
    geracao: geracao || null,
    jogadores,
    updatedAt: new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T') + '-03:00'
  };

  return res.json({ ok: true });
});

// Retorna array com todos os jobs (um por bot)
app.get("/jobid", (req, res) => {
  const jobs = Object.values(jobsMap);
  // opcional: ?single=true retorna só o último (compatibilidade)
  if (req.query.single === "true" && jobs.length > 0) {
    const sorted = jobs.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    return res.json(sorted[0]);
  }
  return res.json(jobs);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
