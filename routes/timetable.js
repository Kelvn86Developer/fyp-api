import { Router } from 'express';
import {LecturerTimetable, GetFreeClassroom, FreeClassroomSessions} from '../controllers/Timetable.js';
// import {GetFreeClassroom} from '../controllers/FreeClasses.js';
const router = Router();

router.get('/lecturer', (req, res) => {
    try {
        LecturerTimetable(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"server error"});
    }
})

router.get('/freeclassrooms', (req,res)=>{
    try {
        GetFreeClassroom(req,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"server error"});
    }
});

router.get('/:id/sessions', (req,res)=>{
    console.log(req.params);
    try {
        FreeClassroomSessions(req,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"server error"});
    }
});



export default router;