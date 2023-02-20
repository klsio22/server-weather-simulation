import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/previsao-do-tempo', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}&q=${city}&units=metric&lang=pt_br`
    );

    return res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
