import { AsyncLocalStorage } from 'node:async_hooks'
import { createMiddleware } from 'hono/factory'

export const asyncLocalStorage = <T>() => {
  const localStorage = new AsyncLocalStorage<T>()
  return {
    store: (obj: T) =>
      createMiddleware(async (_c, next) => {
        return localStorage.run(obj, next)
      }),
    get: (key: keyof T) => {
      const store = localStorage.getStore() as T
      return store[key]
    }
  }
}
