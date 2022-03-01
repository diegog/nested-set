import { Request, Response } from 'express';
import { treeService } from './tree.service';

class treeController {
  static async insertNode(req: Request, res: Response): Promise<Response> {
    try {
      const { name, parentId } = req.body;
      const response = await treeService.insertNode(name, parentId);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  
  static async getDescendants(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await treeService.getDescendants(+id);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  
  static async changeParent(req: Request, res: Response): Promise<Response> {
    try {
      const { id, parentId } = req.body;
      const response = await treeService.changeParent(id, parentId);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export { treeController }