import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
const port = process.env.PORT || 5000;

connectDB(); // connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());


app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // Set __dirname to the current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // Set static folder for production mode
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that doesn't match the above will redirect to index.html file
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running!!!!!!");
  });
  
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
