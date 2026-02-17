const cron = require('node-cron');
const Task = require('../models/Task');
const { sendEmailReminder } = require('./emailService');

const startReminderService = () => {
  // Run every hour at minute 0 (e.g., 9:00, 10:00, 11:00, etc.)
  cron.schedule('0 * * * *', async () => {
    console.log('Running reminder check...');
    
    try {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999); // End of tomorrow
      
      // Find tasks due tomorrow that haven't had reminders sent yet
      const tasks = await Task.find({
        dueDate: {
          $gte: now,
          $lte: tomorrow
        },
        reminderSent: false,
        completed: false
      }).populate('user');
      
      console.log(`Found ${tasks.length} tasks due tomorrow`);
      
      for (let task of tasks) {
        // Check if user has email notifications enabled
        if (task.user && task.user.emailNotifications) {
          try {
            await sendEmailReminder(task.user.email, task.title, task.dueDate);
            
            // Mark reminder as sent
            task.reminderSent = true;
            await task.save();
            
            console.log(`Reminder sent for task: ${task.title}`);
          } catch (emailError) {
            console.error(`Failed to send email for task ${task.title}:`, emailError);
          }
        } else {
          console.log(`User has email notifications disabled for task: ${task.title}`);
        }
      }
      
      console.log('Reminder check completed');
    } catch (error) {
      console.error('Error in reminder service:', error);
    }
  });
  
  console.log('Reminder service started - checking every hour');
};

// Reset reminder status when dueDate changes
const resetTaskReminder = async (taskId) => {
  try {
    await Task.findByIdAndUpdate(taskId, { reminderSent: false });
    console.log(`Reminder reset for task: ${taskId}`);
  } catch (error) {
    console.error('Error resetting task reminder:', error);
  }
};

module.exports = { startReminderService, resetTaskReminder };