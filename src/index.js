import path from 'path'
import { config } from 'dotenv'

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV environment variable is not set.')
}

config({
  path: path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    `.env.${process.env.NODE_ENV}`
  )
})
