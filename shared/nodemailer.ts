import { createTransport } from 'nodemailer'
import invariant from 'tiny-invariant'

const
  host = process.env.SMTP_HOST,
  port = process.env.SMTP_PORT,
  secure = /false/.test(process.env.SMTP_SECURE ?? '') ? false : true,
  authUser = process.env.SMTP_USER,
  authPass = process.env.SMTP_PASS

invariant(host, 'Missing SMTP_HOST environment variable')
invariant(port, 'Missing SMTP_PORT environment variable')
invariant(authUser, 'Missing SMTP_USER environment variable')
invariant(authPass, 'Missing SMTP_PASS environment variable')

export const transporter = createTransport({
  host: host,
  port: Number(port),
  secure,
  auth: { 
    user: authUser,
    pass: authPass,
  },
})