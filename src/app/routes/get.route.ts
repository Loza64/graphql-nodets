import express from 'express'
import { list } from '../controller/user.controller';

const router = express.Router();

router.get("/users", list)

export default router