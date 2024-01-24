import { Hono } from 'hono'
import { asyncLocalStorage } from './async-local-storage'
import { createClient, type API_CLIENT } from './client'

const app = new Hono()

const { store, get } = asyncLocalStorage<{ client: API_CLIENT }>()
app.use('*', store({ client: createClient() }))

app.get('/', async (c) => {
  return c.json({ result: await get('client').request() })
})

export default app
