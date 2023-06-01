import Conn from "../config/connection.js";
// notifications(total,last plus sender,)

// overview of all notifications
export const LecturerNotsInfo = (req, res) => {
  const id = 1;
  const q = ` SELECT COUNT(n.id) AS total,l.username AS receiver FROM notifications AS n JOIN lecturers AS l ON (l.id = n.receiver) WHERE n.receiver = ? GROUP BY l.username `;

  const lastNots = `SELECT n2.receivedAt AS time, l2.username AS sender
FROM notifications AS n2
JOIN lecturers AS l2 ON (l2.id = n2.source)
WHERE n2.receiver = ?
GROUP BY l2.username ORDER BY n2.id DESC
LIMIT 1`;

  Conn.query(q, [id], (err, results) => {
    let total = null;
    if (err) {
      console.error(err.message);
      return res.status(400).json({ error: "Sorry!, No records where found" });
    }

    total = results;
    Conn.query(lastNots, [1], (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(400)
          .json({ error: "Sorry!, No records where found" });
      }

      return res.status(200).json({ data: result[0], total: total[0] });
    });
  });
};

// NOTIFICATIONS FOR STUDENT
export const Student = (req, res) => {
  // ID FOR THE AUTHENTICATED STUDENT
  const id = 1;
  const q = `SELECT co.title AS course, m.title AS module, m.code AS code, cl.title AS venue, fc.startedAt AS starts, fc.endedAt AS ends, l.username AS lecturer, st.fullName, st.id FROM occupyClassroom AS oc JOIN modules AS m ON (m.id = oc.moduleId) JOIN freeClassrooms AS fc ON (fc.id = oc.freeClassroomId) JOIN classrooms AS cl ON (cl.id = fc.classroomId) JOIN lecturers AS l ON (l.id = m.lecturerId) JOIN courses AS co ON (co.id = m.courseId) JOIN students AS st ON (st.courseId = co.id) WHERE st.courseId = co.id AND  st.id = ? GROUP BY oc.id `;

  Conn.query(q, [id], async (err, results) => {
    if (err) {
      console.error(err.message);
      return res.status(400).json({ error: "Sorry!, No records where found" });
    }

    return res.status(200).json({ data: results });
  });
};
