import Conn from "../../config/connection.js";

export const OccupyClassroom = (req, res) => {
  const q =
    `SELECT lecturers.username,classrooms.title AS classroom ,modules.title AS module, modules.code, modules.year,courses.title AS course,freeClassrooms.id AS freeId,freeClassrooms.startedAt, freeClassrooms.endedAt FROM occupyClassroom JOIN lecturers ON (lecturers.id = occupyClassroom.lecturerId) JOIN modules ON (modules.lecturerId = lecturers.id ) JOIN freeClassrooms ON (freeClassrooms.id = occupyClassroom.freeClassroomId) JOIN classrooms ON (classrooms.id = freeClassrooms.classroomId) JOIN courses ON (courses.id = modules.courseId) where lecturers.id = ? ORDER BY lecturers.id DESC`;
    // const id = req.user.id;
    const id = 1;
    Conn.query(q, [id], (err, results)=> {
        if (err) {
            console.error(err.message);
            res.status(400).json({ error: "No records where found!" });
          }
          res.status(200).json({ data: results});
    })
};
