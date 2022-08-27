require('dotenv').config();
const express = require('express');
const { saveAd, imageTest } = require('./functions/saveAd');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/', async(req, res) => {
  await imageTest();
  res.send('Hello world');
});

app.post('/save-ad', async(req, res) => {
  try {
    const id = await saveAd(req.body.price, req.body.description);
    res.json({error: false, url: `http://localhost:${PORT}/images/${id}.png`});
  } catch (error) {
    res.json({error: true, msg: error});
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})