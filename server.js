const express = require("express");
const app = express();

app.use(express.json());

// 🔥 múltiplos jobs (um por bot) - chave = nome do bot (boneco)
const jobsMap = {};

// Endpoint que o Roblox LÊ - retorna array com todos os jobs
app.get("/jobid", (req, res) => {
  const jobs = Object.values(jobsMap);
  // opcional: ?single=true retorna só o último (compatibilidade)
  if (req.query.single === "true" && jobs.length > 0) {
    const sorted = jobs.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    return res.json(sorted[0]);
  }
  res.json(jobs);
});

// Endpoint que o hop/bot ENVIA
app.post("/update", (req, res) => {
  const { jobId, boneco, brainrot, geracao, jogadores } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "jobId ausente" });
  }

  const botKey = (boneco || "unknown").toString();
  jobsMap[botKey] = {
    jobId,
    boneco: boneco || null,
    brainrot: brainrot || null,
    geracao: geracao || null,
    jogadores: jogadores || 0,
    updatedAt: new Date().toISOString()
  };

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API rodando na porta", PORT);
});
