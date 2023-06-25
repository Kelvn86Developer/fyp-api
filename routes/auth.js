import { Router } from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import {  authenticate } from "../controllers/UsersController.js";
import { Login, Lecturer } from "../controllers/lecturer/Lecturer.js";

const router = Router();
// @route   POST /api/auth
// @desc    authenticate a logged in user and get a token
// @access   public
router.post(
  "/",
  [
    check("email", "Please enter a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with a 6 or more characters"
    ).exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      authenticate(req, res);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);
// @route POST /api/register
// @desc to register a new user
// @access  private
router.post(
  "/lecturer",
  [
    check("username", "Please enter a valid credential").notEmpty(),
    check(
      "password",
      "Please enter a valid credential"
    ).notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      Login(req, res);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

// @route   GET /api/auth
// @desc    get a logged in user
// @access   private
router.get('/lecturer', auth, async (req, res) => {
  try {
    Lecturer(req, res);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("server error");
  }
})

export default router;
