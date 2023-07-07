import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export const cancelCategory =  async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;

    await Category.findByIdAndDelete(categoryId);

    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
