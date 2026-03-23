import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoute from "./routes/auth.routes.js"
import userRoute from "./routes/user.routes.js"
import rideRoute from "./routes/ride.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080;

const connectDB = () => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

const configuredOrigins = (process.env.ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim().replace(/^'+|'+$/g, "").replace(/^\"+|\"+$/g, ""))
  .filter(Boolean);

const devOrigins = [
  "https://ride-share-pm.vercel.app/",
];

const allowedOrigins = Array.from(new Set([
  ...configuredOrigins,
  ...(process.env.NODE_ENV === "production" ? [] : devOrigins),
]));

//middlewares
app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }
))
app.use(cookieParser())
app.use(express.json())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/rides", rideRoute);


app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: err.status,
    error: errorMessage
  })
})

app.listen(PORT, () => {
  connectDB()
  console.log(`Connected to backend on PORT: ${PORT}`)
})
