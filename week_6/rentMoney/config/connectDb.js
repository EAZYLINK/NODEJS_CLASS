import {connect} from 'mongoose';

export  const connectDb =  async(url) =>{
    await connect(url)
     console.log("Connected to database...")
 }