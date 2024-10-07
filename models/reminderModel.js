import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'A reminder must have a title']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A reminder must have a name']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const reminder = mongoose.model('reminders', ReminderSchema);
export default reminder;

// const reminderSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     trim: true,
//   },
//   reminderDate: {
//     type: Date,
//     required: true,
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   createdDate: {
//     type: Date,
//     default: Date.now,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed', 'canceled'],
//     default: 'pending',
//   },
//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'high'],
//     default: 'medium',
//   },
//   category: {
//     type: String,
//     trim: true,
//     default: 'general',
//   },
//   repeatInterval: {
//     type: String,
//     enum: ['none', 'daily', 'weekly', 'monthly'],
//     default: 'none',
//   },
//   isArchived: {
//     type: Boolean,
//     default: false,
//   },
//   notificationMethod: {
//     type: String,
//     enum: ['none', 'email', 'SMS', 'push'],
//     default: 'none',
//   },
//   isNotified: {
//     type: Boolean,
//     default: false,
//   },
// });
