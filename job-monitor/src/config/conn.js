import { Sequelize } from 'sequelize'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const conn = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../../db/Jobs.sqlite'),
  logging: false,
})

try {
  await conn.authenticate()
  console.log('Conectado com sucesso!!')
} catch (error) {
  console.error(`Não foi possível conectar: ${error}`)
}

export default conn
