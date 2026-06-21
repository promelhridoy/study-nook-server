const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const bookingCollection = db.collection("bookings")

    app.get('/rooms', async (req, res) => {
      const result = await studyNookCollection.find().toArray();
      res.json(result);
    });

    app.get("/rooms/:id", async (req, res) => {
      const { id } = req.params;

      const result = await studyNookCollection.
      findOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });

    app.patch("/rooms/:id", async (req, res) => {
      const { id } = req.params;
      const updatedData = req.body;
      console.log(updatedData);

      const result = await studyNookCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
      );

      res.json(result);
    });


    app.post('/rooms', async (req, res) => {
        const studyNookData = req.body;
        console.log(studyNookData);
        const result = await studyNookCollection.insertOne(studyNookData);
        res.json(result);
    })


    app.delete("/rooms/:id", async (req, res) => {
      const { id } = req.params;
      const result = await studyNookCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.json(result);
    });


    app.post('/bookings', async (req, res) => {
      const bookingData = req.body;
      console.log(bookingData);
      const result = await bookingCollection.insertOne(bookingData);
      res.json(result);
    });

    app.get('/bookings/:userId', async (req, res) => {
      const { userId } = req.params;
      const result = await bookingCollection.find({ userId: userId }).toArray();
      res.json(result);
    });




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