import { Router } from 'express';
import {LecturerNotsInfo, Student} from '../controllers/Notifications.js';
const router = Router();

router.get('/notsinfo', async(req, res)=> {
    try {
        LecturerNotsInfo(req,res)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

router.get('/student', async(req,res)=>{
    try {
       Student(req, res);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

export default router;