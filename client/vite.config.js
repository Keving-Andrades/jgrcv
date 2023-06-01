import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
dotenv.config();

const { PORT = 8080 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: `http://localhost:${PORT}`,
				changeOrigin: true
			}
		}
	}
});