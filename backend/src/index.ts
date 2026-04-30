import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import collegeRoutes from './routes/colleges';
import saveRoutes from './routes/saves';
import questionRoutes from './routes/questions';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/colleges', collegeRoutes);
app.use('/save', saveRoutes);
app.use('/questions', questionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'UniCompass API is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
