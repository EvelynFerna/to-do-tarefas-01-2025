import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioroutes.js';
import tarefaRoutes from './routes/tarefaroutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/usuarios', usuarioRoutes);
app.use('/tarefas', tarefaRoutes);

app.get('/', (req, res) => {
  res.send('API de gerenciamento de tarefas funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
