import Express  from "express";
import {connectDb} from "./config/connectDb.js";
import { accountRouter } from "./route/accountRoute.js";
import { rentRouter } from "./route/rentMoneyRoute.js";
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

app.use('/account', accountRouter)
app.use('/rent', rentRouter)

app.listen(PORT, async() => {
    await connectDb(URL)
    console.log(`Server running on http://localhost:${PORT}...`)
})

