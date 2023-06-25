import { Router } from 'express';
import { getStudent, authenticate } from '../controllers/students/Students.js';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
const router = Router();

// @route   POST /api/users
// @desc    authenticate a user
// @access   private
router.post('/',[
    check('reg_num', 'Name is required').not().isEmpty(),
    check('password', 'Please enter a password ').exists()
],  ( async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    else{
        try {
           authenticate(req, res);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('server error')
        }  
    }
    
})
);

router.get('/', auth, (async (req, res)=>{
    try {
        getStudent(req, res);
      
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error")
    }
}));

export default router;