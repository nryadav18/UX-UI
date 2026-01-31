import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../redux/slices/authSlice';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const { full_name, email, password, confirm_password } = formData;

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
            navigate('/login'); // Redirect to login after register, or home
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
        if (password !== confirm_password) {
            alert("Passwords do not match");
            return;
        }
        dispatch(register({ full_name, email, password }));
    };

    return (
        <div className="min-h-screen flex text-light-text dark:text-gold-100 relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            {/* Background Texture - optional subtle grain/pattern could go here */}

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center p-12">
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold mb-6 text-gold-500 drop-shadow-md">
                        Join Us
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gold-200 max-w-md mx-auto leading-relaxed">
                        Create an account to unlock exclusive features and premium shopping.
                    </p>
                </div>
                {/* Decorative circle - Gold */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-500/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <div className="glass w-full max-w-md p-10 rounded-3xl transition-colors duration-300">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-center mb-2 text-gold-600 dark:text-gold-400">Create Account</h2>
                        <p className="text-center text-gray-500 dark:text-gold-200 text-sm">Start your journey with E-Shop</p>
                    </div>

                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gold-300 mb-1 ml-1">Full Name</label>
                                <input
                                    name="full_name"
                                    type="text"
                                    required
                                    className="w-full bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-xl px-4 py-3 text-light-text dark:text-gold-100 placeholder-gray-400 dark:placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-200"
                                    placeholder="John Doe"
                                    value={full_name}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gold-300 mb-1 ml-1">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-xl px-4 py-3 text-light-text dark:text-gold-100 placeholder-gray-400 dark:placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-200"
                                    placeholder="name@example.com"
                                    value={email}
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
                                    placeholder="Min. 8 characters"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 dark:text-gold-300 mb-1 ml-1">Confirm Password</label>
                                <input
                                    name="confirm_password"
                                    type="password"
                                    required
                                    className="w-full bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-xl px-4 py-3 text-light-text dark:text-gold-100 placeholder-gray-400 dark:placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-200"
                                    placeholder="Confirm password"
                                    value={confirm_password}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center text-sm">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 bg-light-card dark:bg-dark-card border-gold-500/20 rounded text-gold-500 focus:ring-gold-500/50 focus:ring-offset-0"
                            />
                            <label htmlFor="terms" className="ml-2 block text-gray-600 dark:text-gold-300">
                                I agree to the <a href="#" className="text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-400">Terms</a> and <a href="#" className="text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-400">Privacy Policy</a>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white dark:text-dark-bg bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gold-400">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="font-medium text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-300 transition-colors">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
