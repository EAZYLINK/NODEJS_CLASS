import Express  from "express";
import connectDb from "./connectDb.js";


const app = Express();
const port = 3000;
const url = "mongodb://localhost:27017/week6"

app.listen(port, async() => {
    await connectDb(url)
    console.log(`Server running on port ${port}`)
})

