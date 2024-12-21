import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import countriesRoutes from "./routes/countries.js";

dotenv.config({path: "./config/config.env"});
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", countriesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

export default app;