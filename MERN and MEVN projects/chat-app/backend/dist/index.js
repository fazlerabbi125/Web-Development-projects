"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const commonResponse_1 = require("./utils/commonResponse");
const httpStatus_1 = __importDefault(require("./utils/httpStatus"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const DB_URI = process.env.MONGO_DB_URI || "";
const DB_NAME = process.env.DB_NAME || "";
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(express_1.default.json()); // Parses JSON data
app.use((0, cors_1.default)({ origin: true, credentials: true })); //cors
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((0, morgan_1.default)('dev'));
mongoose_1.default.connect(DB_URI, { dbName: DB_NAME }).then(() => {
    console.log("MongoDB database is connected!!");
    app.listen(port, () => {
        console.log(`Server is running at port-${port}`);
    });
}).catch((err) => console.log(err.message));
app.use;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).send((0, commonResponse_1.failure)('Internal Server Error!', err.message));
});
