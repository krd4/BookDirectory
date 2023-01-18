import express from "express";
import morgan from "morgan";

const port = 3000;
const app = express();

app.use(morgan("short"))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})