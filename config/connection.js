import { createConnection } from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const hostName = process.env.HOSTNAME;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const connection = createConnection({
  host: hostName,
  user: user,
  password: password,
  database: database,
});

export default connection;
