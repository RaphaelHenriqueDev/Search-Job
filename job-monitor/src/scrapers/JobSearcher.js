import puppeteer from 'puppeteer'
import JobService from '../services/JobServices.js'

const JobSearcher = {
  async searchGupy(
    keywords = [
      'Node.js',
      'TypeScript',
      'Back-end',
      'NestJS',
      'Desenvolvedor Júnior',
      'Desenvolvedor Pleno',
      'Desenvolvedor Sênior',
      'Analista de Sistemas',
      'Desenvolvedor',
      'Analista de Sistemas Júnior',
      'Analista de Sistemas Pleno',
      'Analista de Sistemas Sênior',
      'QA',
      'Java',
      'C#',
      'Programador',
      'Linux',
      'AWS',
      'Front-end',
      'HTML',
      'Wordpress',
    ],
  ) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    const jobs = []

    for (const keyword of keywords) {
      try {
        await page.goto(
          `https://portal.gupy.io/job-search/term=${encodeURIComponent(keyword)}`,
          {
            waitUntil: 'networkidle2',
          },
        )

        let hasNextPage = true

        while (hasNextPage) {
          await page.waitForSelector('ul.biBubC', { timeout: 5000 })

          const results = await page.evaluate(() => {
            const cards = document.querySelectorAll('ul.biBubC li')
            return Array.from(cards).map((card) => ({
              title: card.querySelector('h3')?.innerText?.trim() || null,
              company:
                card.querySelector('div[role="group"]')?.innerText?.trim() ||
                null,
              city:
                card
                  .querySelector('span[data-testid="job-location"]')
                  ?.innerText?.trim() || null,
              link: card.querySelector('a')?.href || null,
              published:
                card
                  .querySelector('span[data-testid="listing-card-footer"]')
                  ?.innerText?.trim() || null,
              link: card.querySelector('a')?.href || null,
            }))
          })

          jobs.push(...results)
          console.log(
            `📄 Página coletada — ${results.length} vagas encontradas`,
          )

          hasNextPage = await page.evaluate(() => {
            const nextBtn = document.querySelector(
              'button[aria-label="Próxima página"]',
            )
            return nextBtn && !nextBtn.disabled
          })

          if (hasNextPage) {
            await page.click('button[aria-label="Próxima página"]')
            await page.waitForNetworkIdle({ timeout: 5000 })
          }
        }

        console.log(`✅ Keyword "${keyword}" finalizada`)
      } catch (error) {
        console.warn(`⚠️ Erro ao buscar keyword "${keyword}":`, error.message)
        continue
      }
    }

    await browser.close()
    return jobs
  },

  async saveJobs(jobs, source = 'gupy') {
    let saved = 0
    let skipped = 0

    for (const job of jobs) {
      if (!job.link || !job.title) continue

      const result = await JobService.create({
        ...job,
        stack: job.title,
        source,
      })

      result ? saved++ : skipped++
    }

    console.log(`✅ ${saved} vagas salvas | ⏭️ ${skipped} duplicatas ignoradas`)
  },

  async run() {
    console.log('🔍 Iniciando busca de vagas...')
    const jobs = await this.searchGupy()
    await this.saveJobs(jobs)
    console.log('✅ Busca finalizada!')
  },
}

export default JobSearcher
