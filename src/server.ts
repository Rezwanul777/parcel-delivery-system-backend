
import mongoose from "mongoose"
import {Server} from 'http'
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";


// import { seedSuperAdmin } from "./utils/seedSuperAdmin";

let server:Server;
const createServer= async()=>{
    console.log(envVars.NODE_ENV);
    
    try {
       await mongoose.connect(envVars.DB_URL);
    
    console.log('database is connected')

    server= app.listen(envVars.PORT,()=>{
        console.log(`server is running on port ${envVars.PORT}`);
    }) 
    } catch (error) {
        console.log(error);
        
    }
}

(async()=>{
    await createServer();
    await seedSuperAdmin();// create super admin after server start
})()

// signal handeling

process.on ('SIGTERM',()=>{
    console.log('SIGTERM--signal is received');
    if(server){
        server.close();
    }
     process.exit(1);
})

// server error handeling unhandeling
process.on('unhandledRejection',error=>{
    if(server){
        server.close(()=>{
            console.log(error);
            process.exit(1);
        })
    }
    else{
        process.exit(1);
    }
})


// server error handeling uncaught
process.on('uncaughtException',error=>{
    if(server){
        server.close(()=>{
            console.log(error);
            process.exit(1);
        })
    }
    else{
        process.exit(1);
    }
})
