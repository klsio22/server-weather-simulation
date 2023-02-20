import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 3000, // 3 minutos
  max: 10, // máximo de 10 solicitações por janela
  message: {
    error:
      'Você atingiu o limite máximo de solicitações por minuto. Tente novamente em três minutos.',
  },
});

app.use(limiter);

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
  res.json('Busque uma cidade para previsão do tempo');
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
