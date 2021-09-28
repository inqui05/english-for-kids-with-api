import { Router } from 'express';
import { CLIENT, Status } from '../common/vars';
import {
  changeCategory, createCategory, deleteCategory, categories,
} from './repository';

const router = Router();

router.get('/', (req, res) => {
  const allCategories = categories;
  return res.json(allCategories);
});

router.post('/', (req, res) => {
  if (!req.body.name) return res.sendStatus(Status.BadRequest);

  try {
    const newCategory = createCategory(req.body);
    res.setHeader('Access-Control-Allow-Origin', CLIENT);
    res.setHeader('Access-Control-Allow-Headers', CLIENT);
    return res.json(newCategory);
  } catch (e) {
    return res.status(Status.BadRequest).send(e);
  }
});

router.put('/:id', (req, res) => {
  const categoryId = Number(req.params.id);
  const category = { ...req.body, id: categoryId };

  if (!req.body.name || !categoryId) return res.sendStatus(Status.BadRequest);

  try {
    const changedCategory = changeCategory(category);
    res.setHeader('Access-Control-Allow-Origin', CLIENT);
    res.setHeader('Access-Control-Allow-Headers', CLIENT);
    return res.json(changedCategory);
  } catch (e) {
    return res.status(Status.BadRequest).send(e);
  }
});

router.delete('/:id', (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId) return res.status(Status.BadRequest);

  try {
    deleteCategory(categoryId);
    res.setHeader('Access-Control-Allow-Origin', CLIENT);
    res.setHeader('Access-Control-Allow-Headers', CLIENT);
    return res.sendStatus(Status.Ok);
  } catch (e) {
    return res.status(Status.BadRequest).send(e);
  }
});

export default router;
