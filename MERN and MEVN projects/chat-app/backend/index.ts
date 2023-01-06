import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { failure } from "./utils/commonResponse";
import HTTP_STATUS from "./utils/httpStatus";
import { Server } from "socket.io";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

const port = process.env.PORT || 8000;
const DB_URI = process.env.MONGO_DB_URI || "";
const DB_NAME = process.env.DB_NAME || "";

app.use(express.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(express.json()); // Parses JSON data
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000", //true for all, array or string for specific
        credentials: true,
    })
); //cors
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
    morgan(
        "dev"
        // {// log only 4xx and 5xx responses to console
        //     skip: function (req, res) { return res.statusCode < 400 }
        // }
    )
);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
});

mongoose
    .connect(DB_URI, { dbName: DB_NAME })
    .then(() => {
        console.log("MongoDB database is connected!!");
        server.listen(port, () => {
            console.log(`Server is running at port-${port}`);
        });
    })
    .catch((err: Error) => console.log(err.message));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use(
    (
        err: Record<string, any>,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        console.log(err);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .send(failure("Internal Server Error!", err.message));
    }
);
