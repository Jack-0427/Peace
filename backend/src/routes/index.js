import { Router } from 'express';
import User from './User.js';
import Data from './Data.js';
import Admin from './admin.js';

const router = Router();

router.use('/', User);
router.use('/data', Data);
router.use('/', Admin);

export default router;