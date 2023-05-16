import { Router } from "express";
import { check, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import { getUser, registerUser, authenticate } from "../controllers/UsersController.js";

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
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
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
      registerUser(req, res);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
    
  }
);

// @route   GET /api/auth
// @desc    get a logged in user
// @access   private
router.get('/', auth, async (req, res) => {
  try {
    getUser(req, res);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("server error");
  }
})

export default router;
