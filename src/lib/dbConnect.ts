import  { connect } from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    //console.log("connecting....")

    //check if already connected
    if (connection.isConnected) {
        console.log("Database is already connected");
        return;
    }

    try {
        //connnect the DB
        const db = await connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = db.connections[0].readyState;
        console.log(
            `Database connected Successfully`
        )
    } catch (error) {
         console.error("ERROR occur while connecting database", error)
        //gracefully exit in case of connection error
        process.exit(1);

    }
}

export default dbConnect;