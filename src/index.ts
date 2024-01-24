import { Hono } from 'hono'
import { asyncLocalStorage } from './async-local-storage'
import type { Log } from './types'

const app = new Hono()

const { store, get } = asyncLocalStorage<Record<'request', Log>>()

app.use(
  store((c) => {
    return {
      request: {
        requestId: crypto.randomUUID(),
        city: (c.req.raw.cf?.city ?? 'nowhere') as string
      }
    }
  })
)

app.get('/', async (c) => {
  return c.json(get('request'))
})

export default app
