import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import routes from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the Form Builder App!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

