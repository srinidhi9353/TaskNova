import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TaskItem from '../components/TaskItem';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaPlus, FaSearch, FaSignOutAlt, FaUser, FaFilter, FaSun, FaMoon } from 'react-icons/fa';
import { Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
    });
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        priority: '',
        startDate: '',
        endDate: '',
        completed: ''
    });
    const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save theme preference
    };

    // Apply theme
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Load saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            // Set default theme to dark
            setTheme('dark');
        }
    }, []);

    // Fetch notifications (tasks due tomorrow)
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                
                const response = await axios.get('/api/tasks', config);
                
                const now = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(now.getDate() + 1);
                tomorrow.setHours(23, 59, 59, 999);
                
                const dueTomorrowTasks = response.data.filter(task => {
                    const dueDate = new Date(task.dueDate);
                    return dueDate >= now && dueDate <= tomorrow && !task.completed;
                });
                
                setNotifications(dueTomorrowTasks);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        
        if (user && user.token) {
            fetchNotifications();
        }
    }, [user, tasks]); // Refresh notifications when tasks change

    // Fetch tasks with filters
    const fetchTasks = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
            // Build query parameters
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (filters.priority) params.append('priority', filters.priority);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.completed !== '') params.append('completed', filters.completed);
            
            const response = await axios.get(`/api/tasks?${params.toString()}`, config);
            setTasks(response.data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search, filters]); // Fetch tasks when search or filters change

    // Create Task
    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.post('/api/tasks', newTask, config);
            setTasks([response.data, ...tasks]);
            setNewTask({
                title: '',
                description: '',
                priority: 'medium',
                dueDate: ''
            });
            toast.success('Task added!');
        } catch (error) {
            toast.error('Failed to add task');
        }
    };

    // Delete Task
    const handleDeleteTask = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.delete(`/api/tasks/${id}`, config);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Task deleted');
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    // Update Task
    const handleUpdateTask = async (id, updatedData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const response = await axios.put(`/api/tasks/${id}`, updatedData, config);
            setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
            toast.success('Task updated');
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    // Handle input changes for new task form
    const handleNewTaskChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        });
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Clean SaaS Header - 50/50 Split */}
            <header className="
                w-full px-8 py-6 flex items-center justify-between
                bg-transparent
                text-gray-900 dark:text-white
                transition-colors duration-500
            ">
                {/* LEFT 50% - Logo */}
                <div className="w-1/2 flex items-center">
                    <img 
                        src={theme === 'light' ? '/tasknovalight.png' : '/tasknova.png'}
                        alt="TaskNova"
                        className="h-16 object-contain"
                    />
                </div>

                {/* RIGHT 50% - Actions */}
                <div className="w-1/2 flex items-center justify-end gap-8">
                    {/* Notification */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative hover:scale-110 transition"
                        >
                            <Bell size={22} className="text-gray-900 dark:text-white" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                                    {notifications.length}
                                </span>
                            )}
                        </button>
                        
                        {/* Notification Dropdown */}
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 z-50"
                            >
                                <div className="p-4">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        🔔 Upcoming Tasks
                                    </h4>
                                    
                                    {notifications.length > 0 ? (
                                        <div className="space-y-2 max-h-60 overflow-y-auto">
                                            {notifications.map(task => (
                                                <div 
                                                    key={task._id} 
                                                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                                >
                                                    <h5 className="font-medium text-gray-900 dark:text-white">
                                                        {task.title}
                                                    </h5>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                            No upcoming tasks
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="hover:scale-110 transition"
                    >
                        {theme === 'dark' ? (
                            <FaSun size={22} className="text-yellow-500" />
                        ) : (
                            <FaMoon size={22} className="text-gray-900 dark:text-white" />
                        )}
                    </button>

                    {/* Profile */}
                    <Link to="/profile">
                        <button className="hover:scale-110 transition">
                            <FaUser size={22} className="text-gray-900 dark:text-white" />
                        </button>
                    </Link>

                    {/* Logout */}
                    <button 
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-600 hover:scale-110 transition"
                    >
                        <FaSignOutAlt size={22} />
                    </button>
                </div>
            </header>
            
            {/* Main content container */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                
                {/* Dashboard Title Section */}
                <section className="px-8 mt-6">
                    <h1 className="
                        text-4xl font-bold
                        text-gray-900 dark:text-white
                    ">
                        Dashboard
                    </h1>
                    <p className="
                        mt-2 text-gray-500 dark:text-gray-400
                    ">
                        Welcome back, {user && user.name}
                    </p>
                </section>

                {/* Task Creation & Search */}
            <div className="grid md:grid-cols-1 gap-6 mb-8">
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div>
                            <Input
                                label="Task Title"
                                placeholder="What needs to be done?"
                                name="title"
                                value={newTask.title}
                                onChange={handleNewTaskChange}
                                required
                            />
                        </div>
                        
                        <div>
                            <Input
                                label="Description"
                                placeholder="Add a detailed description..."
                                name="description"
                                value={newTask.description}
                                onChange={handleNewTaskChange}
                                as="textarea"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Priority</label>
                                <select
                                    name="priority"
                                    value={newTask.priority}
                                    onChange={handleNewTaskChange}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            
                            <div>
                                <Input
                                    label="Due Date"
                                    type="date"
                                    name="dueDate"
                                    value={newTask.dueDate}
                                    onChange={handleNewTaskChange}
                                />
                            </div>
                        </div>
                        
                        <Button type="submit" className="w-full py-4">
                            <FaPlus className="mr-2" /> Create Task
                        </Button>
                    </form>
                </Card>
            </div>

            {/* Search & Filters */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Search Tasks</h2>
                    <div className="relative">
                        <Input
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute right-4 top-[14px] text-gray-400 dark:text-gray-500" />
                    </div>
                </Card>

                <Card>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Filters</h2>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            <FaFilter /> {showFilters ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-3"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Priority</label>
                                    <select
                                        name="priority"
                                        value={filters.priority}
                                        onChange={handleFilterChange}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    >
                                        <option value="">All Priorities</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Status</label>
                                    <select
                                        name="completed"
                                        value={filters.completed}
                                        onChange={handleFilterChange}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="false">Pending</option>
                                        <option value="true">Completed</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <Input
                                        label="Start Date"
                                        type="date"
                                        name="startDate"
                                        value={filters.startDate}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                                
                                <div>
                                    <Input
                                        label="End Date"
                                        type="date"
                                        name="endDate"
                                        value={filters.endDate}
                                        onChange={handleFilterChange}
                                    />
                                </div>
                            </div>
                            
                            <Button 
                                variant="secondary" 
                                className="w-full mt-2 py-3"
                                onClick={() => {
                                    setFilters({
                                        priority: '',
                                        startDate: '',
                                        endDate: '',
                                        completed: ''
                                    });
                                }}
                            >
                                Clear Filters
                            </Button>
                        </motion.div>
                    )}
                </Card>
            </div>

            {/* Task List */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Your Tasks</h2>
                    <span className="text-slate-400">{tasks.length} task{tasks.length !== 1 ? 's' : ''} found</span>
                </div>
                {tasks.length > 0 ? (
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onDelete={handleDeleteTask}
                                onUpdate={handleUpdateTask}
                            />
                        ))}
                    </AnimatePresence>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10 text-slate-500"
                    >
                        {loading ? 'Loading tasks...' : 'No tasks found. Create one above!'}
                    </motion.div>
                )}
            </div>
        </div>
    </div>
    );
};

export default Dashboard;
