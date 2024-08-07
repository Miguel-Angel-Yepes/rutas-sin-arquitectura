import { Router } from "express";
import {asureAuth} from '../middlewares/authMiddleware'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";


const router = Router();

router.get("/users", [asureAuth], getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;