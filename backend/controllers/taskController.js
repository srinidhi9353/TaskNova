const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    let filter = { user: req.user.id };
    
    // Search by title
    if (req.query.search) {
        filter.title = {
            $regex: req.query.search,
            $options: 'i'
        };
    }
    
    // Filter by priority
    if (req.query.priority) {
        filter.priority = req.query.priority;
    }
    
    // Filter by date range
    if (req.query.startDate || req.query.endDate) {
        filter.createdAt = {};
        if (req.query.startDate) {
            filter.createdAt.$gte = new Date(req.query.startDate);
        }
        if (req.query.endDate) {
            filter.createdAt.$lte = new Date(req.query.endDate);
        }
    }
    
    // Filter by completion status
    if (req.query.completed !== undefined) {
        filter.completed = req.query.completed === 'true';
    }

    // Ensure we only find tasks for the logged in user
    const tasks = await Task.find(filter).sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Please add a title');
    }

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority || 'medium',
        dueDate: req.body.dueDate,
        user: req.user.id
    });

    res.status(200).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title || task.title,
        description: req.body.description || task.description,
        priority: req.body.priority || task.priority,
        dueDate: req.body.dueDate || task.dueDate,
        completed: req.body.completed !== undefined ? req.body.completed : task.completed
    }, {
        new: true,
    });

    res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
};
