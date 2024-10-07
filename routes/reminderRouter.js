import express from 'express';
import {
  getAllReminder,
  createReminder,
  getReminder,
  updateReminder,
  deleteReminder
} from '../controllers/reminderController.js';
import { protect } from '../controllers/authController.js';

const reminderRouter = express();

reminderRouter.route('/').get(protect, getAllReminder);
reminderRouter.route('/').post(createReminder);

// route with parameter
reminderRouter
  .route('/:id')
  .get(getReminder)
  .delete(deleteReminder)
  .patch(updateReminder);

export default reminderRouter;
