import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export const createCategory =  async (req: Request, res: Response) => {
  try {
    const { icon, name} = req.body;

    if(!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await Category.create({icon, name});
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
