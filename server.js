require('dotenv').config();

const express = require('express');
const app = express();
const port =  3025;

app.use(express.json());


app.listen(port, ()=>{
    console.log('server running on port', port); 
});
