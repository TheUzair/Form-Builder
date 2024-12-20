import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import routes from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database and initialize collections
connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the Form Builder App!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

