import { Router } from 'express'
import JobService from '../services/JobServices.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { stack, city, source } = req.query
    const jobs = await JobService.findAll({ stack, city, source })
    return res.status(200).json(jobs)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao buscar vagas', error: error.message })
  }
})

router.get('/unsent', async (req, res) => {
  try {
    const jobs = await JobService.findUnsent()
    return res.status(200).json(jobs)
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar vagas não enviadas',
      error: error.message,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const job = await JobService.findById(req.params.id)
    if (!job) return res.status(404).json({ message: 'Vaga não encontrada' })
    return res.status(200).json(job)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao buscar vaga', error: error.message })
  }
})

router.patch('/:id/sent', async (req, res) => {
  try {
    await JobService.markAsSent(req.params.id)
    return res.status(200).json({ message: 'Vaga marcada como enviada' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao atualizar vaga', error: error.message })
  }
})

export default router
