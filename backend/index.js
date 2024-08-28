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
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRoute)
app.use('/admin',adminRoute)


app.listen(port,() => {
    console.log(`server is runnning on http://localhost:${port}`);
})