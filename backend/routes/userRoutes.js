import express from 'express';
import {
    getAllUsers,
    deleteUser,
    toggleBlockUser,
    getUserById
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.patch('/:id', toggleBlockUser);

export default router;
