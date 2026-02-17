import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 mt-2">Sign in to continue to your dashboard</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                        <Button type="submit" className="w-full mt-4">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-secondary font-medium transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
