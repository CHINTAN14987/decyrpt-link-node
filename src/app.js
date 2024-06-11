import path from "path";
import express from "express";
import cors from "cors";
import morgan from "morgan";


import routes from "./routes/index.js";



const app = express();


app.use(morgan('dev'));

app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));


app.use(express.static("public"));

app.use("/", routes);

app.get("/", (req, res) => {
    return res.status(200).send("healthy");
});

app.all("*", (req, res) => {
    return res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode,
        success: err.success,
        message: err.message,
        // errors: err.error
    })
})


export default app;