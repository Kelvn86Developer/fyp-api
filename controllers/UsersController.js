import Conn  from "../config/connection.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// get user
// export const getUser = (req,res) => {
//   const email = req.user.email;
//   const q = "SELECT * FROM users WHERE email = ?";
//   Conn.query(q, [email], (err, results) => {
//     if (err) {
//       res.status(400).json({ message: err });
//     }
//     const {password, ...others} = results[0];
//     res.status(200).json({ message: others});
//   });
  
// };

// authenticate user
export const authenticate = (req,res)=> {
  const q = "SELECT * FROM users WHERE email = ?";
  const {email , password} = req.body;

  Conn.query(q, [email], (err, results) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    if(results.length > 0) {
      const checkedPassword = bcrypt.compareSync(password, results[0].password);
      if(!checkedPassword){
        return res.status(400).json({error: "Invalid credentials"});
      } 
      else{
        const payload = {
          user: {
            id: results[0].id,
            email: results[0].email
          }
        }
        const token = jwt.sign(payload, "kelvinkd");
        console.log(results)
        return res.status(200).json({ message: "Login successfully", token: token });
      }
     
    }

   return res.status(400).json({ message: "User not found, Invalid credentials" });
  });
}
// register user
export const registerUser = (req,res)=> {
  const checkUserQuery =  "SELECT * FROM users WHERE email = ?";
  const q = "INSERT INTO users (`name`, `email`, `password`, `type`) VALUE(?)";

  Conn.query(checkUserQuery, [req.body.email], (err, data)=> {
    if(err){
     return res.status(400).json({message: err});
    }
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const values = [
      req.body.name,
      req.body.email,
      hashedPassword,
      req.body.type
  ];
    Conn.query(q, [values],(err,results)=>{
      if(err){
        res.status(400).json({message: err});
      }
      if(results.affectedRows === 1){
        return res.status(200).json({ data: results, message: "Registered successfully" });
      }
      return res.status(500).json({error: "server error"});
    });
  })

}

// log out a user
