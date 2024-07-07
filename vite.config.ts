import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	base: '/2048',
	resolve: {
		alias: {
			src: "/src",
		},
	},	
});
