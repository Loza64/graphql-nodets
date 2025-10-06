import express from 'express'
import validateDTO from '../middlewares/validator.dto';
import { UserDto } from '../dto/user.dto';
import { create } from '../controller/user.controller';
import { uploadFile } from '../middlewares/files.multer';
import { uploadFilesCloud } from '../controller/files.controller';

const router = express.Router();

router.post('/user', validateDTO(UserDto), create)
router.post('/upload/files', uploadFile, uploadFilesCloud)

export default router