import { Router } from 'express';
import { treeRouter } from '../modules/tree';

const router: Router = Router();

router.use('/tree', treeRouter);

export default router;
