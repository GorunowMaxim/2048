import { useEffect, useState } from 'react';
import './styles.scss';

export const Desk = () => {
	const [num, setNum] = useState([20, 20]);
	console.log('num', num);
	useEffect(() => {
		const handleLoad = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowUp':
					setNum((num) => [20, num[1]]);
					break;
				case 'ArrowDown':
					setNum((num) => [373, num[1]]);
					break;
				case 'ArrowRight':
					setNum((num) => [num[0], 373]);
					break;
				case 'ArrowLeft':
					setNum((num) => [num[0], 20]);
					break;
			}
		};
		window.addEventListener('keydown', (e: KeyboardEvent) => handleLoad(e));
		return () => {
			window.removeEventListener('keydown', (e: KeyboardEvent) => handleLoad(e));
		};
	}, []);
	return (
		<div className='desk'>
			<div className='desk-grid'>
				{[...new Array(16)].map((squar, index) => {
					return <div className='squar'></div>;
				})}
			</div>
			<div className='game-desk'>
				<div style={{ top: num[0], left: num[1] }} className='point point-1'>
					2
				</div>
			</div>
		</div>
	);
};
