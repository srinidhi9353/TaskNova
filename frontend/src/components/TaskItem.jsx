import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaClock, FaFlag } from 'react-icons/fa';
import Button from './ui/Button';
import Input from './ui/Input';

const TaskItem = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        completed: task.completed || false
    });

    const handleUpdate = () => {
        if (editedTask.title.trim()) {
            onUpdate(task._id, editedTask);
            setIsEditing(false);
        }
    };

    const handleInputChange = (e) => {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        });
    };

    // Handle task completion toggle
    const toggleCompletion = () => {
        onUpdate(task._id, {
            ...task,
            completed: !task.completed
        });
    };

    // Priority color mapping
    const priorityColors = {
        low: 'text-green-600 dark:text-green-400',
        medium: 'text-yellow-600 dark:text-yellow-400',
        high: 'text-red-600 dark:text-red-400'
    };

    // Completion status styling
    const taskClasses = task.completed 
        ? "glass rounded-xl p-4 mb-3 group bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" 
        : "glass rounded-xl p-4 mb-3 group";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.01 }}
            className={taskClasses}
        >
            {isEditing ? (
                <div className="space-y-3">
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={editedTask.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 font-medium"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <textarea
                            name="description"
                            value={editedTask.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 resize-none"
                            rows="2"
                            placeholder="Description..."
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Priority</label>
                            <select
                                name="priority"
                                value={editedTask.priority}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={editedTask.dueDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            className="p-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                        >
                            <FaCheck />
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className={`text-sm ${task.completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-600 dark:text-gray-300'} mt-1`}>
                                    {task.description}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Completion Toggle Button */}
                            <button
                                onClick={toggleCompletion}
                                className={`p-2 rounded-full transition-colors ${
                                    task.completed 
                                        ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 bg-green-100 dark:bg-green-900/30' 
                                        : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                                }`}
                            >
                                <FaCheck />
                            </button>
                            
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => onDelete(task._id)}
                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <FaFlag className={priorityColors[task.priority]} />
                            <span className={priorityColors[task.priority]}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </span>
                        </div>
                        
                        {task.dueDate && (
                            <div className="flex items-center gap-1">
                                <FaClock className="text-blue-600 dark:text-blue-400" />
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-1">
                            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TaskItem;
