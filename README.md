# 🔍 Search and Job Monitor — Automação de Busca de Vagas

> Scraping automatizado de vagas de emprego com alertas por email.  
> Stack: Node.js · Puppeteer · Express · Sqlite · Docker

---

## 🚀 O que faz?

- Coleta vagas automaticamente de portais como Gupy e InfoJobs
- Filtra por stack (Node.js, TypeScript, Back-end...)
- Salva no banco sem duplicatas
- Envia alertas por email com novas oportunidades a cada 6 horas
- API REST para consultar e filtrar vagas

---

## 🛠️ Tecnologias

| Camada      | Tecnologia         |
| ----------- | ------------------ |
| Scraping    | Puppeteer          |
| API         | Node.js + Express  |
| Banco       | Sqlite + Sequelize |
| Agendamento | Node-Cron          |
| Alertas     | Nodemailer         |
| Container   | Docker + Compose   | Ainda em desenvolvimento

---

## ⚙️ Como rodar

### Pré-requisitos

- Docker instalado
- Conta Gmail (para alertas)

### 1. Clone o repositório

git clone https://github.com/RaphaelHenriqueDev/job-monitor.git
cd job-monitor

### 2. Configure o .env

cp .env.example .env

# Edite com suas credenciais

### 3. Suba com Docker

docker-compose up -d

### 4. Acesse a API

GET http://localhost:3000/jobs?stack=node&cidade=sao-paulo

---

## 📬 Exemplo de alerta recebido

Nova vaga encontrada!
Empresa: Startup XYZ  
Cargo: Dev Node.js Júnior  
Link: https://...

---

## 📌 Endpoints

| Método | Rota             | Descrição             |
| ------ | ---------------- | --------------------- |
| GET    | /jobs            | Lista todas as vagas  |
| GET    | /jobs?stack=node | Filtra por tecnologia |
| GET    | /jobs?cidade=sp  | Filtra por cidade     |

---

## 🧠 Aprendizados do projeto

- Web Scraping com Puppeteer em sites dinâmicos
- Evitar duplicatas com upsert no Sqlite
- Agendamento de tarefas com node-cron
- Containerização com Docker Compose

---

Desenvolvido por [Raphael Henrique](https://github.com/RaphaelHenriqueDev)
