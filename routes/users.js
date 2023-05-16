import { Router } from 'express';
import { check, validationResult } from 'express-validator';
const router = Router();

// @route   POST /api/users
// @desc    register a user
// @access   public
// router.post('/re',[
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please enter a valid Email').isEmail(),
//     check('password', 'Please enter a password with a 6 or more characters').isLength({
//         min: 6
//     })
// ],  ( async (req, res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors: errors.array()});
//     }
//     else{
//         try {
//             const { name, email, password} = req.body;
//             let user = await User.findOne({ email}, null, {timeout: 40000});

//             if(user){
//                 return res.status(400).json({msg: "!Sorry, User already exists"})
//             }
//             user = new User({ name: name, email: email, password: password});
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//             await user.save();
//             // res.send('User saved!');
//             const payload = {
//                 user: {
//                     id: user.id,
//                 }
//             }
//             jwt.sign(payload, config.get('jwtSecret'), {
//                 expiresIn: 360000
//             }, (err, token)=> {
//                 if(err) throw err;
//                 res.json({ token });
//             });
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send('server error')
//         }  
//     }
    
// })
// );

// router.get('/',auth, (async (req, res)=>{
//     try {
//         const users = _rows[0];
//         console.log(users);
//         res.json(users);
//     } catch (error) {
//         console.error(err.message);
//         res.status(500).send("server error")
//     }
// }));

export default router;