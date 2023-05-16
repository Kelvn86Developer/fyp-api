import conn  from "../config/connection.js";

// const users = conn.query("SELECT * FROM users", (err, results, fields) => {
//   if (err) {
//     console.error("Error executing query:", err);
//     return;
//   }
//   return results;
// });

// export default users;

export default conn.query("SELECT * FROM users", (err, results, fields) => {
  if (err) {
    console.error("Error executing query:", err);
    return;
  }
  return results;
});