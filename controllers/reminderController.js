import Reminder from '../models/reminderModel.js';
import validator from 'validator';
import { isValidObjectId } from '../utils/handleValidation.js';
import responseHandler from '../utils/handlerResponse.js';
import { AppError } from '../utils/appError.js';

export const getAllReminder = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    //  if (!reminders) {
    //    return res.status(404).json({
    //      status: 'failed',
    //      message: 'Reminders record not found'
    //    });
    //  }
    //  res.status(200).json({
    //    status: 'success',
    //    data: { reminders }
    //  });

    responseHandler.success(res, { reminders }, 'Data fetched successfully', 200);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving the reminder'
    });
  }
};

export const createReminder = async (req, res) => {
  try {
    const newReminder = await Reminder.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { newReminder }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving the reminder'
    });
  }
};

export const getReminder = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Attempt to find the reminder by ID
    // Check if the ID is valid
    //  if (!isValidObjectId(id)) {
    //    return next(new AppError('Invalid reminder ID format', 400));
    //  }
    const reminder = await Reminder.findById(id);

    // Check if the reminder was found
    if (!reminder) {
      return next(new AppError('No reminder found with that ID', 404));
    }

    // Send the success response if reminder was found
    res.status(200).json({
      status: 'success',
      data: reminder
    });
  } catch (error) {
    next(error);
  }
};

export const updateReminder = async (req, res, next) => {
  console.log('test');
  try {
    const { id } = req.params;

    //console.log('Received reminder ID:', id);
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid reminder ID format'
      });
    }

    const reminder = await Reminder.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!reminder) {
      return next(new AppError('No reminder found with that ID', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: reminder
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while updating the reminder'
    });
  }
};

export const deleteReminder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid reminder ID format in try'
      });
    }
    const reminder = await Reminder.findByIdAndDelete(id);
    if (!reminder) {
      return next(new AppError('No reminder found with that ID', 404));
    }
    return res.status(204).json({
      status: 'success',
      message: 'Reminder deleted successfully '
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while updating the reminder'
    });
  }
};
