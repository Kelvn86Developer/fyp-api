import Conn  from "../../config/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// update profile
// get group timetable
export const groupTimetable = (req, re)=> {
    const q = "SELECT * FROM groupTimetable WHERE groupTimetable.courseId = ?";
   Conn.query()
}
// get exam timetable
// get notifications
// login
export const getStudent = (req,res)=> {
    const q = "SELECT students.*, courses.title AS course, modules.title as modules FROM students JOIN courses ON courses.id = students.courseId JOIN modules ON modules.courseId = courses.id WHERE students.id = ? LIMIT 1";
    const id = req.user.id;
    Conn.query(q, [id], (err, results)=> {
        if (err) {
            console.error(err.message);
            res.status(400).json({ message: "user where not found !" });
          }
          const { userId,courseId, password, ...others} = results[0];
          res.status(200).json({data:others});
        });
}
// authenticate a student
export const authenticate = (req,res)=> {
  const q = "SELECT students.*, courses.title AS course, modules.title as modules FROM students JOIN courses ON courses.id = students.courseId JOIN modules ON modules.courseId = courses.id WHERE students.regNumber = ? AND students.password = ? LIMIT 1";
  const {reg_num , password} = req.body;
  Conn.query(q, [reg_num, password], (err, results) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    if(results.length > 0) {
      // const checkedPassword = bcrypt.compareSync(password, results[0].password);
      // if(!checkedPassword){
      //   return res.status(400).json({error: "Invalid credentials"});
      // } 
      // else{
      //   const payload = {
      //     user: {
      //       id: results[0].id,
      //       email: results[0].email
      //     }
      //   }
      //   const token = jwt.sign(payload, "kelvinkd");
      //   const {password, ...others} = results[0];
      //   return res.status(200).json({ message: "Login successfully", token: token });
      // }
      const payload = {
        user: {
          id: results[0].id,
          email: results[0].email
        }
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      // const {password, ...others} = results[0];
      return res.status(200).json({ message: "Login successfully", token: token, data: results[0] });
     
    }

   return res.status(400).json({ message: "User not found, Invalid credentials" });
  });
}
// logout