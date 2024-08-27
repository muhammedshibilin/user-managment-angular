const express = require('express')
const client = require('./src/models/db')
const port = 3003

const app = express()

client.connect()
.then(() => console.log('connected to postgres psql'))
.catch( err => console.log(err,'cannot connnect to psql'))

app.listen(port,() => {
    console.log(`server is runnning on http://localhost:${port}`);
})