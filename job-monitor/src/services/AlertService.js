import nodemailer from 'nodemailer'
import JobService from './JobServices.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // senha de app do gmail, não a senha normal
  },
})

const AlertService = {
  async sendPendingAlerts() {
    const jobs = await JobService.findUnsent()

    if (jobs.length === 0) {
      console.log('📭 Nenhuma vaga nova para alertar')
      return
    }

    const html = `
      <h2>🔍 ${jobs.length} nova(s) vaga(s) encontrada(s)!</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%">
        <thead style="background:#f0f0f0">
          <tr>
            <th>Cargo</th>
            <th>Empresa</th>
            <th>Cidade</th>
            <th>Fonte</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          ${jobs
            .map(
              (job) => `
            <tr>
              <td>${job.title}</td>
              <td>${job.company || '—'}</td>
              <td>${job.city || '—'}</td>
              <td>${job.source || '—'}</td>
              <td><a href="${job.link}">Ver vaga</a></td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    `

    try {
      await transporter.sendMail({
        from: `"Job Monitor 🔍" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `🚀 ${jobs.length} nova(s) vaga(s) encontrada(s) — Job Monitor`,
        html,
      })

      // marca todas como enviadas após o email
      for (const job of jobs) {
        await JobService.markAsSent(job.id)
      }

      console.log(`📧 Alerta enviado — ${jobs.length} vaga(s) notificadas`)
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error.message)
    }
  },
}

export default AlertService
