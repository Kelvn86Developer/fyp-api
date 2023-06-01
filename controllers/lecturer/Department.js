import Conn from '../../config/connection.js';

export const Department = (req, res)=> {
    const q = `SELECT name, office, hod FROM departments INNER JOIN lectures ON departments.id = lecturers.department_id WHERE lecturers.id = ? ORDER BY lecturer.id DESC`;
    const id = req.user.id;
    Conn.query(q, [id], (err, res)=>{
        if (err) {
            console.error(err.message);
            res.status(400).json({ message: "No records where found!" });
          }
          const {created_at, updated_at, ...others} = results[0];
          res.status(200).json({ data: others});
    });
}