import express from 'express'
import cors from 'cors'
import usuarioRoutes from './src/routes/usuarioroutes.js'
import tarefaRoutes from './src/routes/tarefaroutes.js'

const app = express()

app.use(cors())
app.use(express.json())

// Rotas
app.use('/usuarios', usuarioRoutes)
app.use('/tarefas', tarefaRoutes)

// Rota base
app.get('/', (req, res) => {
  res.send('API de gerenciamento de tarefas funcionando!')
})

// Inicia servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
