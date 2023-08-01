import Express  from "express";
import {connectDb} from "./config/connectDb.js";
import { accountRoute } from "./route/accountRoute.js";
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT
const URL = process.env.MONGODB_URL
const app = Express();
app.use(Express.json())

app.get('/', (req, res)=>{
    res.json({
        message: "Welcome our RentMoney service...!"
    })
})

app.use('/account', accountRoute)

app.listen(PORT, async() => {
    await connectDb(URL)
    console.log(`Server running on http://localhost:${PORT}...`)
})

