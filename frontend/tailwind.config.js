/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gold: {
                    100: '#F9F1D8', // Light Gold (Creamy)
                    200: '#F0DEAA',
                    300: '#E6CB7D',
                    400: '#DDB856',
                    500: '#D4AF37', // Primary Gold
                    600: '#AA8C2C',
                    700: '#806921',
                    800: '#554616',
                    900: '#2B230B',
                },
                dark: {
                    bg: '#050505',
                    card: '#121212',
                },
                light: {
                    bg: '#FAFAFA', // Light page background
                    card: '#FFFFFF', // Light card background
                    text: '#333333', // Dark text for light mode
                }
            }
        },
    },
    plugins: [],
}
