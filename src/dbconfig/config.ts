import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        console.log('Successfully connected')
        connection.on('connected', () => {
            console.log('connected');
        })
    }
    catch(err){

    }
}