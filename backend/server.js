import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js';
const port = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running!!!!!!');
});

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));