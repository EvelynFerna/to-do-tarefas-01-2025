import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function cadastrarUsuario(req, res) {
  const { nome, email } = req.body
  if (!nome || !email || !email.includes('@')) {
    return res.status(400).json({ error: 'Dados inválidos.' })
  }

  const novo = await prisma.usuario.create({ data: { nome, email } })
  res.status(201).json(novo)
}

export async function listarUsuarios(_, res) {
  const lista = await prisma.usuario.findMany()
  res.json(lista)
}
