import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	base: '/2048',
	resolve: {
		alias: {
			app: '/src/app',
			entities: '/src/entities',
			widgets: '/src/widgets',
		},
	},
});
