require('dotenv').config();
const express = require('express');
const { saveAd } = require('./functions/saveAd');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/save-ad', async(req, res) => {
  const id = await saveAd();
  res.sendFile(`/images/${id}.png`);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})