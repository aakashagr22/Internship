// create a test script testConnection.js
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect('mongodb+srv://akashkumargupta9918:VEatmBWCydT1N9W9@cluster0.gt1mr.mongodb.net/apollo247clone');
    console.log('Connected successfully');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(' Collections:', collections.map(c => c.name));
    
    const doctorCount = await mongoose.connection.db.collection('doctor').countDocuments();
    console.log(` Doctor documents: ${doctorCount}`);
    
  } catch (error) {
    console.error(' Connection failed:', error);
  } finally {
    mongoose.disconnect();
  }
}

testConnection();