import mongoose from 'mongoose';
import Comprehension from '../models/Comprehension.js';
import Cloze from '../models/Cloze.js';
import Categorize from '../models/Categorize.js';

const initializeDB = async () => {
  try {
    const dbName = 'form-builder';
    console.log(`Attempting to connect to the database: ${dbName}`);

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    console.log(`Successfully connected to the database: ${dbName}`);

    const db = mongoose.connection.db;

    const adminDb = db.admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Current databases:', dbInfo.databases.map(db => db.name));

    const collections = await db.listCollections().toArray();
    console.log(`Collections in the ${dbName} database:`);
    collections.forEach(collection => console.log(collection.name));

  } catch (error) {
    console.error(`Error initializing the database: ${error.message}`);
    throw error; 
  }
};

export default initializeDB;
