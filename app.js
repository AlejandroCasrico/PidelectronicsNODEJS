const express = require('express');
const env = require('dotenv');
const app = express();
const cors = require('cors')
env.config();
const routes = require('./src/routes/user.routes');
const routesAuth = require('./src/routes/auth.routes');
app.use(cors())
app.use(express.json());
app.use('/auth',routesAuth);
app.use('/api',routes);


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});