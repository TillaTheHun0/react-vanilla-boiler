import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

export const devApiUrl = 'http://localhost:9000'
export const jyveApiUrl = 'https://api.jyve.io'

const ENV_PREFIX = 'REACT_APP_'
function getEnv (key) {
  return process.env[`${ENV_PREFIX}${key}`]
}

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

function isProduction () {
  return process.env.NODE_ENV.toLowerCase() === 'production'
}

function baseUrl () {
  return getEnv('BASE_URL') || (isProduction() ? jyveApiUrl : devApiUrl)
}

const api = axios.create({
  baseURL: baseUrl(),
  adapter: cache.adapter
})

export { api }
