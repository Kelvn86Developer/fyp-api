import Conn from '../../config/connection.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Lecturer = (req, res)=> {
    const q = "SELECT * FROM lecturers WHERE id = ?";
    const id = req.user.id;
    Conn.query(q, [id], (err, results)=> {
        if (err) {
            console.error(err.message);
            res.status(400).json({ message: "user where not found !" });
          }
          const {created_at, updated_at, ...others} = results[0];
          res.status(200).json({ data: others});
        });
}