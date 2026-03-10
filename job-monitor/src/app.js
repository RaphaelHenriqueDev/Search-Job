import express from 'express'
import 'dotenv/config'
import conn from './config/conn.js'
import initCron from './config/cron.js'
import jobRoutes from './routes/JobRoutes.js'

const app = express()

app.use(express.json())
app.use('/jobs', (req, res, next) => jobRoutes(req, res, next))

const start = async () => {
  try {
    await conn.sync()
    console.log('✅ Banco de dados sincronizado')

    app.listen(3030, () => {
      console.log('🚀 Servidor rodando em http://localhost:3030')
      initCron()
    })
  } catch (error) {
    console.error('❌ Erro ao iniciar aplicação:', error.message)
    process.exit(1)
  }
}

start()
