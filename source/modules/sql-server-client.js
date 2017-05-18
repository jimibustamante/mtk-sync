require('dotenv/config')
const sql = require('mssql')

class MSQLServerClient {

  constructor() {
    // TODO: handle this data as envirionment variables
    this.config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_SERVER,
      stream: true,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE
    }
    // this.address = `mssql://${this.config.user}:${this.config.password}@${this.config.url}:${this.config.port}/${this.config.database}?encrypt=true}`
    console.log(this.config);
  }

  async connect() {
    console.log(this.config);
    try {
      console.log('CONNECT');
      const pool = await sql.connect(this.config)
      const request = new sql.Request()
      console.log(request);
      const response = await request.query('select * from CRM_listado1_mtkta;')
      return response
    } catch (err) {
      console.log(err);
    }
  }

  foo () {
    console.log('JIMI!');
  }
}

export default MSQLServerClient
