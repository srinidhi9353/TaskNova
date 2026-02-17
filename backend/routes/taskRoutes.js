const express = require('express');
const router = express.Router();
const {
    getTasks,
    setTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Add imports for the test endpoint
const Task = require('../models/Task');
const User = require('../models/User');
const { sendEmailReminder } = require('../services/emailService');

router.route('/').get(protect, getTasks).post(protect, setTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

// Test endpoint to trigger a notification manually
router.get('/test-notification', async (req, res) => {
    try {
        // Find a user to test with (you can adjust this to match your user)
        const testUser = await User.findOne({ email: 'ssrinidhi622@gmail.com' });
        
        if (!testUser) {
            return res.status(404).json({ message: 'Test user not found. Please create a task for ssrinidhi622@gmail.com first.' });
        }
        
        // Create a test task due tomorrow for the user
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const testTask = new Task({
            title: 'Test Task - Please ignore',
            description: 'This is a test notification to verify the email system is working',
            dueDate: tomorrow,
            user: testUser._id,
            reminderSent: false
        });
        
        await testTask.save();
        
        // Send email reminder directly
        await sendEmailReminder(testUser.email, testTask.title, testTask.dueDate);
        
        // Update the task to mark reminder as sent
        testTask.reminderSent = true;
        await testTask.save();
        
        res.json({ 
            message: 'Test notification sent successfully!', 
            task: testTask,
            user: testUser
        });
    } catch (error) {
        console.error('Error in test notification:', error);
        res.status(500).json({ message: 'Error sending test notification', error: error.message });
    }
});

module.exports = router;
