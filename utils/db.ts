import {createPool} from "mysql2/promise";
import {dataBaseConfig} from "./config/db.config";

export const pool =createPool(dataBaseConfig);
