import express, { json } from 'express';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8800;

import USERS from './routes/users.js';
import AUTH from './routes/auth.js';

// connecting to database
connectDB();
app.use(json({extended: false}));
app.use('/api/users', USERS);
app.use('/api/auth', AUTH);

app.get('/',(req, res)=> res.json({msg:"Hello from server app"}));
app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT);
});
