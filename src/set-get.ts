import { Hono } from 'hono'
import type { Log } from './types'

const app = new Hono<{ Variables: Log }>()

app.use(async (c, next) => {
  c.set('requestId', crypto.randomUUID())
  c.set('city', (c.req.raw.cf?.city ?? 'nowhere') as string)
  await next()
})

app.get('/', (c) => {
  return c.json(`${c.var.requestId} is from ${c.var.city}`)
})

export default app
