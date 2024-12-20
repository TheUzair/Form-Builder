import mongoose from 'mongoose';
import Comprehension from '../models/Comprehension.js';
import Cloze from '../models/Cloze.js';
import Categorize from '../models/Categorize.js';

const initializeDB = async () => {
  try {
    const dbName = 'form-builder';
    console.log(`Attempting to connect to the database: ${dbName}`);

    // Ensure we're connected to the database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    console.log(`Successfully connected to the database: ${dbName}`);

    // Get the database instance
    const db = mongoose.connection.db;

    // Log the current databases
    const adminDb = db.admin();
    const dbInfo = await adminDb.listDatabases();
    console.log('Current databases:', dbInfo.databases.map(db => db.name));

    // List all collections in the database
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:');
    collections.forEach(collection => console.log(collection.name));

    // Add Sample Data
    await insertSampleData();
  } catch (error) {
    console.error(`Error initializing the database: ${error.message}`);
    throw error; 
  }
};

// Sample Data Insertion Function
const insertSampleData = async () => {
  try {
    // Clear existing data for clean insertion
    await Comprehension.deleteMany({});
    await Cloze.deleteMany({});
    await Categorize.deleteMany({});

    // Insert sample data for Comprehension
    await Comprehension.create({
      questionNumber: 1,
      type: 'comprehension',
      points: 10,
      negativePoints: -2,
      description: 'Read the passage and answer the questions below.',
      passage: 'The quick brown fox jumps over the lazy dog.',
      subQuestions: [
        {
          id: 1,
          title: 'What color is the fox?',
          type: 'mcq',
          points: 5,
          negativePoints: -1,
          options: [
            { id: 1, text: 'Brown', isCorrect: true },
            { id: 2, text: 'Black', isCorrect: false },
            { id: 3, text: 'White', isCorrect: false },
            { id: 4, text: 'Gray', isCorrect: false },
          ],
        },
      ],
    });

    // Insert sample data for Cloze
    await Cloze.create({
      questionNumber: 2,
      type: 'cloze',
      points: 8,
      negativePoints: -1,
      description: 'Fill in the blanks.',
      sentence: 'The ____ fox jumps over the ____ dog.',
      underlinedWords: ['quick', 'lazy'],
      options: ['quick', 'lazy', 'fast', 'active'],
    });

    // Insert sample data for Categorize
    await Categorize.create({
      questionNumber: 3,
      type: 'categorize',
      points: 12,
      negativePoints: -3,
      description: 'Categorize the items into correct groups.',
      categories: [
        { id: 1, name: 'Fruits' },
        { id: 2, name: 'Vegetables' },
      ],
      items: [
        { id: 1, name: 'Apple', category: 'Fruits' },
        { id: 2, name: 'Carrot', category: 'Vegetables' },
        { id: 3, name: 'Banana', category: 'Fruits' },
        { id: 4, name: 'Potato', category: 'Vegetables' },
      ],
    });

    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error(`Error inserting sample data: ${error.message}`);
    throw error;
  }
};

export default initializeDB;
