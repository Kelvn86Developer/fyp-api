import Conn from "../../config/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Lecturer = (req, res) => {
  const q = `SELECT l.id, l.full_name, l.phone_number, l.username, u.email, d.name AS department, m.title AS modules FROM lecturers AS l JOIN users AS u ON (l.id = u.lecturer_id )  JOIN departments as d ON (d.id = l.department_id) JOIN modules as m ON (m.lecturerId = l.id) WHERE u.id = ?`;
  const id = req.user.id;

  Conn.query(q, [id], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ message: "user where not found !" });
    }
    if (results.length > 0) {
      const { created_at, remember_token, updated_at, ...others } =
      results[0];
      const lecturerId = others.id;
      const modulesQuery = `SELECT m.title, m.code FROM modules AS m where m.lecturerId = ?`;
      Conn.query(modulesQuery, [lecturerId ], (err, modules) => {
        if (err) {
          console.error(err.message);
          res.status(400).json({ message: "user where not found !" });
        }

     
        const lecturerWithModules = { ...others, modules };
        console.log(lecturerWithModules);
        res.status(200).json({ lecturer: lecturerWithModules });
      });
    }
  
  });
};

export const Login = (req, res) => {
  const q =
    "SELECT * FROM users WHERE users.name = ? AND users.password = ? LIMIT 1";
  const { username, password } = req.body;
  Conn.query(q, [username, password], (err, results) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ message: "Something went wrong, try again !" });
    }
    if (results.length > 0) {
      const { password, ...others } = results[0];
      const payload = {
        user: {
          id: others.id,
          email: others.username,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      console.log("lecturer login successfully");
      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "username or password is incorrect !" });
    }
  });
};
