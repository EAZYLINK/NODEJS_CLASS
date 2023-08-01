import {connect} from 'mongoose';

export  async function connectDb (url){
    await connect(url)
     console.log("Connected to database")
 }