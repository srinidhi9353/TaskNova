const Input = ({ label, type = 'text', as = 'input', name, value, onChange, placeholder, required = false, ...props }) => {
    const commonClasses = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all";
    
    return (
        <div className="mb-4">
            {label && <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</label>}
            {as === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`${commonClasses} resize-none`}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={commonClasses}
                    {...props}
                />
            )}
        </div>
    );
};

export default Input;
