import Conn  from "../config/connection.js"

export const GetFreeClassroom = (req, res)=>{
    const q = `SELECT * FROM freeClassrooms JOIN classrooms ON (classrooms.id = freeClassrooms.classroomId) GROUP BY classrooms.title`;

    Conn.query(q,async(err, results)=>{
        if(err){
            return res.status(400).json({error:"Sorry!, No records where found"});
        }
        return res.status(200).json({data: results});
    });
}