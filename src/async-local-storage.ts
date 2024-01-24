import { AsyncLocalStorage } from 'node:async_hooks'
import { createMiddleware } from 'hono/factory'
import { Context } from 'hono'

type Callback<T> = (obj: T, c: Context) => void

export const asyncLocalStorage = <T>() => {
  const localStorage = new AsyncLocalStorage<T>()
  return {
    store: (obj: T, callback?: Callback<T>) =>
      createMiddleware(async (c, next) => {
        if (callback) {
          return localStorage.run(obj, () => {
            callback(obj, c)
            next()
          })
        } else {
          return localStorage.run(obj, next)
        }
      }),
    get: (key: keyof T) => {
      const store = localStorage.getStore() as T
      return store[key]
    }
  }
}
