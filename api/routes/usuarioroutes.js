import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  const usuario = await prisma.usuario.create({
    data: { nome, email }
  });
  res.json(usuario);
});

export default router;
