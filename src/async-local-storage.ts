import { AsyncLocalStorage } from 'node:async_hooks'
import { createMiddleware } from 'hono/factory'
import { Context } from 'hono'

type Callback<T> = (c: Context) => T

export const asyncLocalStorage = <T>() => {
  const localStorage = new AsyncLocalStorage<T>()
  return {
    store: (callback: Callback<T>) =>
      createMiddleware(async (c, next) => {
        const obj = callback(c)
        return localStorage.run(obj, () => {
          next()
        })
      }),
    get: (key: keyof T) => {
      const store = localStorage.getStore() as T
      return store[key]
    }
  }
}
