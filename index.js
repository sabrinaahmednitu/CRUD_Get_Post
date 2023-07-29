
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://node_mongo_crud:PqGGK01zrRf3DAj4@cluster0.fkjuk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    const client = new MongoClient(uri);
    const crudCollection = client.db('node_mongo_crud').collection('users');
   

    app.get('/user', async (req, res) => {
      const query = {}
      const cursor = crudCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
      
    })

    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await crudCollection.insertOne(user);
      res.send(result);
    })

    app.delete('/user/:id', async (req, res) => {
      const id = req.params.id;
      const query={_id: mongoObjectId(id)}
      const result = await crudCollection.deleteOne(query);
      res.send(result);
    })
 

  } finally {
    
  }
}
run().catch(console.dir);





// async function run() {
//   try {
//     // Connect the client to the server	
//     await client.connect();
   
//       const crudCollection = client.db('node_mongo_crud').collection('users');
//     const user = { name: 'mohonanodi', email: 'sgsgh@gmail.com' }
//     const result=await crudCollection.insertOne(user)
//     console.log(`user inserted with id : ${result.insertedId}`);
   
//   } finally {
    
//   }
// }
// run().catch(console.dir);




app.get('/', (req, res) => {
    res.send(
        '<h1  style="color:red ;text-align:center ; margin:20% auto" >Hello from node mongo CRUD</h1>'
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
