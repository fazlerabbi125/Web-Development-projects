import express, { Express, Request, Response } from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev',
    // {// log only 4xx and 5xx responses to console
    //     skip: function (req, res) { return res.statusCode < 400 }
    // }
))

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port-${port}`);
});