import express from 'express';
import { roleController } from '../controllers/role.controller';
import { protect } from '../common/middlewares/protect.middleware';
import { checkPermission } from '../common/middlewares/check-permission.middleware';

const roleRouter = express.Router();

// Tạo route CRUD
roleRouter.post('/', roleController.create);
roleRouter.get('/', roleController.findAll);

roleRouter.post('/toggle-is-active/:roleId', protect, checkPermission, roleController.toggleIsActive);

roleRouter.get('/:id', roleController.findOne);
roleRouter.patch('/:id', roleController.update);
roleRouter.delete('/:id', roleController.remove);

export default roleRouter;