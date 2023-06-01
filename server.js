import express, { json } from 'express';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8800;

// @routes starts
import USERS from './routes/users.js';
import AUTH from './routes/auth.js';
import LECTURER from './routes/lecturer.js'
import NOTIFICATIONS from './routes/notifications.js';
import TIMETABLE from './routes/timetable.js';
// @routes ends

// connecting to database
connectDB();
app.use(json({extended: false}));
app.use('/api/users', USERS);
app.use('/api/auth', AUTH);
app.use('/api/lecturer', LECTURER);
app.use('/api/notifications', NOTIFICATIONS);
app.use('/api/timetable', TIMETABLE);

app.get('/',(req, res)=> res.json({msg:"Hello from server app"}));
app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT);
});
