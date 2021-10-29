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
          await client.connect();
          console.log('database connected')
          const database = client.db('tour-services')
          const offerCollection = database.collection('offers') 
          const userCollection = database.collection('users')

          app.get('/offers', async(req,res)=>{
               const query = offerCollection.find({})
               const result = await query.toArray()
               res.json(result)
          })

          app.post('/users', async(req,res)=>{
               const newUser = req.body;
               console.log(newUser)
               const result = await userCollection.insertOne(newUser)
               console.log('hit the api')
               res.json(result)
          })

     }
     finally{
           // await client.close();
     }
}
run().catch(console.dir)







app.get('/', (req,res) =>{

     res.send('server running')
})


app.listen(port, ()=>{
     console.log('listening from port', port)
})