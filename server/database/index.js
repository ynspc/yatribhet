import mongoose from 'mongoose';
import { dbConfig } from "../config/index";

export default class Database {
    connect() {
        mongoose.connect( dbConfig.URI, dbConfig.OPTIONS )
            .then( client => {
                console.log(`db connected on. ${dbConfig.URI}`);
            })
            .catch( error => {
                console.log("database error found", error.name);
            });
    }
}
