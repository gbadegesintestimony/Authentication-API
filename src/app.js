import express from "express";
import userRoutes from "./routes/user_routes.js";
import errorMiddleware from "./middlewares/error_middleware.js";

const app = express();

// Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1/users", userRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
