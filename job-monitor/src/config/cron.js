import cron from 'node-cron'
import JobSearcher from '../scrapers/JobSearcher.js'
import AlertService from '../services/AlertService.js'

const initCron = () => {
  // roda imediatamente na inicialização
  console.log('🔍 Rodando busca inicial...')
  JobSearcher.run().then(() => AlertService.sendPendingAlerts())

  // depois repete a cada 6 horas
  cron.schedule('0 */6 * * *', async () => {
    console.log(
      `🕐 [${new Date().toLocaleString('pt-BR')}] Iniciando ciclo automático...`,
    )

    try {
      await JobSearcher.run()
      await AlertService.sendPendingAlerts()
      console.log(
        `✅ [${new Date().toLocaleString('pt-BR')}] Ciclo finalizado!`,
      )
    } catch (error) {
      console.error('❌ Erro no ciclo automático:', error.message)
    }
  })

  console.log('⏰ Cron iniciado — buscando vagas a cada 6 horas')
}

export default initCron
