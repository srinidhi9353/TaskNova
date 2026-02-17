import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary', disabled = false }) => {
    const baseStyle = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg",
        secondary: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm",
        danger: "bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/60"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={twMerge(baseStyle, variants[variant], className)}
        >
            {children}
        </motion.button>
    );
};

export default Button;
