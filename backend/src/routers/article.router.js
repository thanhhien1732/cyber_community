// express-router-crud
import express from 'express';
import { articleController } from '../controllers/article.controller';
import { protect } from '../common/middlewares/protect.middleware';

const articleRouter = express.Router();

// Tạo route CRUD
articleRouter.post('/', articleController.create);
articleRouter.get('/', protect, articleController.findAll);
articleRouter.get('/:id', articleController.findOne);
articleRouter.patch('/:id', articleController.update);
articleRouter.delete('/:id', articleController.remove);

export default articleRouter;