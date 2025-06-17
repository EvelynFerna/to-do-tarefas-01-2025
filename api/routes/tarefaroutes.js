import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const tarefas = await prisma.tarefa.findMany({ include: { usuario: true } });
  res.json(tarefas);
});

router.post('/', async (req, res) => {
  const { descricao, setor, prioridade, status, usuarioId } = req.body;
  const tarefa = await prisma.tarefa.create({
    data: {
      descricao,
      setor,
      prioridade,
      status,
      usuarioId
    }
  });
  res.json(tarefa);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { descricao, setor, prioridade, status, usuarioId } = req.body;
  const tarefa = await prisma.tarefa.update({
    where: { id: Number(id) },
    data: { descricao, setor, prioridade, status, usuarioId }
  });
  res.json(tarefa);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.tarefa.delete({
    where: { id: Number(id) }
  });
  res.sendStatus(204);
});

export default router;
