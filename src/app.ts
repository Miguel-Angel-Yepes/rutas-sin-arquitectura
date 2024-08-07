import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import userRoutes from "./routes/userRoutes";
import authRoutes from './routes/authRoutes'


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', authRoutes);

export default app;