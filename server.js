const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json({ limit: '10mb' }));

const pastaFotos = path.join(__dirname, 'fotos');
if (!fs.existsSync(pastaFotos)) fs.mkdirSync(pastaFotos);

app.post('/upload', (req, res) => {
  const imgData = req.body.imagem;
  if (!imgData) return res.status(400).send('Imagem não enviada');

  const base64 = imgData.replace(/^data:image\/png;base64,/, "");
  const filename = `foto_${Date.now()}.png`;
  fs.writeFileSync(path.join(pastaFotos, filename), base64, 'base64');
  console.log(`Imagem salva: ${filename}`);
  res.sendStatus(200);
});

app.get('/', (req, res) => res.send('Servidor de fotos online'));
app.listen(process.env.PORT || 3000, () => console.log('Servidor rodando'));
