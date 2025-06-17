import express from 'express'
import {
  cadastrarTarefa,
  listarTarefas,
  excluirTarefa,
  alterarStatus
} from '../controllers/tarefas'

const router = express.Router()

router.post('/', cadastrarTarefa)
router.put('/', cadastrarTarefa)
router.get('/', listarTarefas)
router.delete('/:id', excluirTarefa)
router.patch('/:id/status', alterarStatus)

export default router
