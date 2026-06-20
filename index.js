const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();

const uri = process.env.MONGODB_URI;

const app = express()


const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    await client.connect();

    const db = client.db("study-nook");
    const studyNookCollection = db.collection("rooms");

    app.post('/rooms', async (req, res) => {
        const studyNookData = req.body;
        console.log(studyNookData);
        const result = await studyNookCollection.insertOne(studyNookData);
        res.send(result);
    })












    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir); 


app.get('/', (req, res) =>  {
    res.send("Server is running fine")
})

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
    
})