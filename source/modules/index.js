import MSQLServerClient from './sql-server-client'

let msql = new MSQLServerClient()

let list = msql.connect().then((resp) => {
  console.log("LIST: ");
  console.log(resp);
})

export default MSQLServerClient
