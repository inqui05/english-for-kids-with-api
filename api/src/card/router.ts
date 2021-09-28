import { Router } from 'express';
import { CLIENT, Status } from '../common/vars';
import {
  changeCard, createCard, deleteCard, cards,
} from './repository';

const router = Router();

router.get('/', (req, res) => {
  if (!cards.length) return res.sendStatus(Status.NotFound);

  return res.json(cards);
});

router.post('/', (req, res) => {
  if (!req.body.categoryId || !req.body.word || !req.body.translation || !req.body.audioSrc) {
    return res.sendStatus(Status.BadRequest);
  }

  try {
    const newCard = createCard(req.body);
    /* I understand that next two string are repeating in many function and it's against DRY. I should do the function
    that takes res and adds headers but I spent some hours and I couldn't. I couldn't understand the type of incoming
    parameter (res). If you can help me It will be great! */
    res.setHeader('Access-Control-Allow-Origin', CLIENT);
    res.setHeader('Access-Control-Allow-Headers', CLIENT);
    return res.json(newCard);
  } catch (e) {
    return res.status(Status.BadRequest).send(e);
  }
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const card = { ...req.body, id };

  if (!req.body.categoryId || !req.body.word || !req.body.translation || !req.body.audioSrc) {
    return res.sendStatus(Status.BadRequest);
  }

  try {
    const changedCard = changeCard(card);
    res.setHeader('Access-Control-Allow-Origin', CLIENT);
    res.setHeader('Access-Control-Allow-Headers', CLIENT);
    return res.json(changedCard);
  } catch (e) {
    return res.status(Status.BadRequest).send(e);
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(Status.BadRequest);

  try {
    deleteCard(id);
    res.setHeader('Access-Control-Allow-Origin', CLIENT);
    res.setHeader('Access-Control-Allow-Headers', CLIENT);
    return res.sendStatus(Status.Ok);
  } catch (e) {
    return res.status(Status.BadRequest).send(e);
  }
});

export default router;
