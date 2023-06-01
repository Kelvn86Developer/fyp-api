import Conn  from "../config/connection.js"
// timetable( venue, module,year, started at and ended at, course title), goals(total,last created, title of the goal  ), 
export const LecturerTimetable = (req, res)=> {
    const id = 1;
    const q = `SELECT l.username AS lecturer, m.code AS code, m.title AS title, m.year AS year, c.title AS course, cl.title AS classroom, DAYNAME(DATE(gT.day ))AS day,gt.startedAt AS startsAt, gT.endedAt AS endsAt FROM modules AS m JOIN lecturers AS l ON (l.id = m.lecturerId) JOIN courses AS c ON (c.id = m.courseId ) JOIN groupTimetable AS gT ON (gT.moduleId = m.id) JOIN classrooms AS cl ON (cl.id = gT.classId) WHERE l.id = ? `;

    Conn.query(q, [id], async (err, results)=> {
        if(err){
            console.error(err.message);
            return res.status(400).json({error:"Sorry!, No records where found"})
        };
        return res.status(200).json({data: results});
    });
}

// GET ALL FREE CLASSROOMS TIMETABLE
export const GetFreeClassroom = (req, res)=>{
    const q = `SELECT * FROM freeClassrooms JOIN classrooms ON (classrooms.id = freeClassrooms.classroomId) WHERE freeClassrooms.occupied = 0 GROUP BY classrooms.title`;

    Conn.query(q,async(err, results)=>{
        if(err){
            return res.status(400).json({error:"Sorry!, No records where found"});
        }
        return res.status(200).json({data: results});
    });
}

// GET ALL FREE SESSIONS OF A SINGLE CLASSROOM
export const FreeClassroomSessions = (req, res)=> {
    // id = req.params.id;
    const id = req.params.id;
    const q = `SELECT * FROM freeClassrooms JOIN classrooms ON (classrooms.id = freeClassrooms.classroomId) WHERE freeClassrooms.occupied = 1 AND freeClassrooms.id = ? GROUP BY classrooms.title`;

    Conn.query(q,[id],async(err, results)=>{
        if(err){
            return res.status(400).json({error:"Sorry!, No records where found"});
        }
        return res.status(200).json({data: results});
    });
}
