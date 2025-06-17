import express from 'express'
import { cadastrarUsuario, listarUsuarios } from '../controllers/usuario'

const router = express.Router()

router.post('/', cadastrarUsuario)
router.get('/', listarUsuarios)

export default router
