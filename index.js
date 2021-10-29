const express = require ('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')


const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qlklf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async() =>{
     try{
          await client.connect;
          console.log('database connected')
     }
     finally{

     }
}
run().catch(console.dir)







app.get('/', (req,res) =>{

     res.send('server running')
})


app.listen(port, ()=>{
     console.log('listening from port', port)
})