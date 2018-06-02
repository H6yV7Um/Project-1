import { SERVER } from './server'
import { coin } from './apis/coin'
export default {
  SERVER,
  ...coin(SERVER)
}
