import express from 'express';
import cors from 'cors';

import clienteRoutes from './routes/clienteRoutes.js';
import destinoTuristicoRoutes from './routes/destinoTuristicoRoutes.js';
import pacoteViagemRoutes from './routes/pacoteViagemRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/cliente', clienteRoutes);
app.use('/destino', destinoTuristicoRoutes);
app.use('/pacote', pacoteViagemRoutes);

app.listen(3000, () => {
  console.log('API (CRUD) ativa na porta 3000.');
});