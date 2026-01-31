import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../redux/slices/authSlice';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '', // API expects username (email)
        password: '',
    });

    const { username, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = new FormData();
        userData.append('username', username);
        userData.append('password', password);
        dispatch(login(userData));
    };

    return (
        <div className="min-h-screen flex text-light-text dark:text-gold-100 relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            {/* Background Texture - optional */}

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center p-12">
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold mb-6 text-gold-500 drop-shadow-md">
                        E-Shop
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gold-200 max-w-md mx-auto leading-relaxed">
                        Experience the future of shopping with our premium gold interface.
                    </p>
                </div>
                {/* Decorative circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <div className="glass w-full max-w-md p-10 rounded-3xl transition-colors duration-300">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-center mb-2 text-gold-600 dark:text-gold-400">Welcome Back</h2>
                        <p className="text-center text-gray-500 dark:text-gold-200 text-sm">Sign in to your account to continue</p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gold-300 mb-1 ml-1">Email Address</label>
                                <input
                                    name="username"
                                    type="email"
                                    required
                                    className="w-full bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-xl px-4 py-3 text-light-text dark:text-gold-100 placeholder-gray-400 dark:placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-200"
                                    placeholder="name@example.com"
                                    value={username}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gold-300 mb-1 ml-1">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-xl px-4 py-3 text-light-text dark:text-gold-100 placeholder-gray-400 dark:placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-200"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 bg-light-card dark:bg-dark-card border-gold-500/20 rounded text-gold-500 focus:ring-gold-500/50 focus:ring-offset-0"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-600 dark:text-gold-300">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="font-medium text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-400"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white dark:text-dark-bg bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white dark:text-dark-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : 'Sign in'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 dark:text-gold-400">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/register')} className="font-medium text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-300 transition-colors">
                            Sign up now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
