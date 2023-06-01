import { Router } from 'express';
import { OccupyClassroom } from '../controllers/lecturer/OccupyClass.js';
const router = Router();

// @route GET api/departments
// @desc  get all departments details that belongs to a lecturer
// @access private

// @route GET api/occupiedClassrooms
// @desc get all occupied classesrooms details that belongs to a lecturer
// @access private
router.get('/occupiedClassrooms', async (req, res)=> {
  try {
    OccupyClassroom(req, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route GET api/requestedClassrooms
// @desc get all requested classesrooms details that belongs to a lecturer
// @access private

// @route GET api/teachingGoals
// @desc get all teaching goals that belongs to a lecturer
// @access private

export default router;