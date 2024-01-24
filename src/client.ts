export const createClient = (): API_CLIENT => {
  console.log('create client!!')
  return {
    request: async () => {
      console.log('request!!')
      return 'Hello from API'
    }
  }
}

export type API_CLIENT = {
  request: () => Promise<string>
}
