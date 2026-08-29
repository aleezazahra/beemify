import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import express from 'express'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: `${__dirname}/../.env` })

const { default: dayRoutes } = await import('./routes/day.js')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/api', dayRoutes)

app.listen(PORT, () => {
  console.log(`Perfect Day Generator server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`Model: ${process.env.MODEL || 'meta-llama/llama-3.3-70b-instruct'}`)
})
