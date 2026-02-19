import { createContext, useState, useEffect, useContext } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    // Optionally verify token validity here or rely on interceptors
                } catch (error) {
                    console.error("Failed to parse user", error);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const register = async (userData) => {
        try {
            console.log('Registering user:', userData);
            const response = await API.post('/api/auth/register', userData);
            console.log('Register response:', response);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                toast.success('Registration successful!');
                return true;
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const login = async (userData) => {
        try {
            console.log('Logging in user:', userData);
            const response = await API.post('/api/auth/login', userData);
            console.log('Login response:', response);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                toast.success('Login successful!');
                return true;
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        toast.info('Logged out');
    };

    const updateProfile = async (userData) => {
        try {
            const response = await API.put('/api/auth/profile', userData);
            if (response.data) {
                const updatedUser = { ...response.data, token: user.token };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                toast.success('Profile updated successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading, updateProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
