import Job from '../models/Job.js'
import { Op } from 'sequelize'
import { UniqueConstraintError } from 'sequelize'

const JobService = {
  async create(data) {
    try {
      const job = await Job.create(data)
      return job
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return null // vaga já existe, ignora silenciosamente
      }
      throw error
    }
  },

  async findAll(filters = {}) {
    const where = {}

    if (filters.stack) where.stack = { [Op.like]: `%${filters.stack}%` }
    if (filters.city) where.city = { [Op.like]: `%${filters.city}%` }
    if (filters.source) where.source = { [Op.like]: `%${filters.source}%` }

    return await Job.findAll({ where })
  },

  async findById(id) {
    return await Job.findByPk(id)
  },

  async findUnsent() {
    return await Job.findAll({
      where: { sent: false },
    })
  },

  async markAsSent(id) {
    return await Job.update({ sent: true }, { where: { id } })
  },
}

export default JobService
