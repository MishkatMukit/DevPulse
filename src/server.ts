import app from "./app";
import config from "./config";
import { initDB } from "./DB/index.db";

const main=async()=>{
    initDB()
    app.listen(config.port, ()=>{
        console.log(`Server is listening on port ${config.port}`);
    })
}

main()