import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import userRoutes from './routes/userRoutes.js';  
import donationRoutes from './routes/donationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();  
const app = express();

app.use(express.json());  
app.use(cors());   


app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;