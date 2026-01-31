import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            await authService.forgotPassword(email);
            setMessage('Password reset link has been sent to your email (Check backend console for simulation).');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to send reset email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-light-text dark:text-gold-100 relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center p-12">
                <div className="relative z-10 text-center">
                    <h1 className="text-6xl font-bold mb-6 text-gold-600 dark:text-gold-500 drop-shadow-md">
                        Recover Access
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gold-200 max-w-md mx-auto leading-relaxed">
                        Don't worry, we'll help you get back to your premium shopping experience.
                    </p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <div className="glass w-full max-w-md p-10 rounded-3xl transition-colors duration-300">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-center mb-2 text-gold-600 dark:text-gold-400">Forgot Password?</h2>
                        <p className="text-center text-gray-500 dark:text-gold-200 text-sm">Enter your email to receive a reset link</p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 dark:text-gold-300 mb-1 ml-1">Email Address</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-light-card dark:bg-dark-card border border-gold-500/20 rounded-xl px-4 py-3 text-light-text dark:text-gold-100 placeholder-gray-400 dark:placeholder-gold-700/50 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all duration-200"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {message && (
                            <div className="bg-green-500/20 border border-green-500/50 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl text-sm text-center">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white dark:text-dark-bg bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 dark:text-gold-400">
                        Remember your password?{' '}
                        <Link to="/login" className="font-medium text-gold-600 dark:text-gold-500 hover:text-gold-500 dark:hover:text-gold-300 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
