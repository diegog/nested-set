import { Router } from 'express';
import { treeController } from './tree.controller';

const treeRouter: Router = Router();

treeRouter.post('/', treeController.insertNode);
treeRouter.put('/changeParent', treeController.changeParent);
treeRouter.get('/descendants/:id', treeController.getDescendants);

export { treeRouter };