import express from 'express';
import cors from 'cors';
import categories from './category/router';
import cards from './card/router';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.use('/api/categories', categories); // TODO: create var
app.use('/api/cards', cards); // TODO: create var

app.listen(port, () => { console.log('Server is working...'); });
