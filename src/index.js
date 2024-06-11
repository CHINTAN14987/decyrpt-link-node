import 'dotenv/config';
import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERR::", error);
            throw error;
        })
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        })  
    })
    .catch((err) => {
        console.log("Mongo Connections error", err);
    })