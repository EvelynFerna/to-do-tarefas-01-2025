export async function cadastrarTarefa(req, res) {
  const { id, descricao, setor, prioridade, usuarioId } = req.body
  if (!descricao || !setor || !prioridade || !usuarioId) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
  }

  const data = { descricao, setor, prioridade, usuarioId }
  const tarefa = id
    ? await prisma.tarefa.update({ where: { id: Number(id) }, data })
    : await prisma.tarefa.create({ data })

  res.status(200).json(tarefa)
}

export async function listarTarefas(_, res) {
  const tarefas = await prisma.tarefa.findMany({
    include: { usuario: true },
    orderBy: { id: 'desc' }
  })
  res.json(tarefas)
}

export async function excluirTarefa(req, res) {
  const id = Number(req.params.id)
  await prisma.tarefa.delete({ where: { id } })
  res.status(204).end()
}

export async function alterarStatus(req, res) {
  const id = Number(req.params.id)
  const { status } = req.body
  await prisma.tarefa.update({ where: { id }, data: { status } })
  res.status(200).json({ ok: true })
}
