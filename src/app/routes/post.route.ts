import express from 'express'
import validateDTO from '../middlewares/validator.dto';
import { UserDto } from '../dto/user.dto';
import { create } from '../controller/user.controller';

const router = express.Router();

router.post('/user', validateDTO(UserDto), create)

export default router