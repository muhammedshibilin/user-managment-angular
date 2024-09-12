const express = require('express')
const db = require('./src/utils/db');
const userRoute = require('./src/routes/userRoute');
const adminRoute = require('./src/routes/adminRoute');
const cors = require('cors');


const port = 3003




const app = express()
app.use(cors({
    origin: 'http://localhost:4200' 
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRoute)
app.use('/admin',adminRoute)


app.listen(port,() => {
    console.log(`server is runnning on http://localhost:${port}`);
})