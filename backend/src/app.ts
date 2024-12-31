import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoute from './routes/job.route'
dotenv.config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoute);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
