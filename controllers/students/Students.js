import Conn  from "../../config/connection.js"
// update profile
// get group timetable
export const groupTimetable = (req, re)=> {
    const q = "SELECT * FROM groupTimetable WHERE groupTimetable.courseId = ?";
   Conn.query()
}
// get exam timetable
// get notifications
// logout