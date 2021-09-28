import express from 'express';
import cors from 'cors';
import categories from './category/router';
import cards from './card/router';
import { CARDS_PATH, CATEGORIES_PATH, PORT } from './common/vars';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(CATEGORIES_PATH, categories);
app.use(CARDS_PATH, cards);

app.listen(PORT);
