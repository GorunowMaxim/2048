import { useCallback, useEffect, useState } from 'react';

import { movePlates } from '../lib/updatePlates';

import './styles.scss';

type Obj = {
	value: number;
	x: number;
	y: number;
};

const res2 = [
	{ value: 4, x: 1, y: 1 },
	{ value: 8, x: 1, y: 2 },
	{ value: 16, x: 1, y: 3 },
	{ value: 32, x: 1, y: 4 },
	{ value: 4, x: 2, y: 1 },
	{ value: 4, x: 2, y: 2 },
	{ value: 2, x: 2, y: 3 },
	{ value: 2, x: 2, y: 4 },
];

const sortPlates = (plates: Obj[]) => {
	return plates.sort((a, b) => {
		if (a.x === b.x) {
			return a.y - b.y;
		}
		return a.x - b.x;
	});
};

export const Desk = () => {
	const [plates, setPlates] = useState<Obj[]>(res2);
	console.log(plates);
	const handleClick = useCallback(
		(e: KeyboardEvent) => {
			let forward = '';
			if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				switch (e.key) {
					case 'ArrowRight':
						forward = 'right';
						break;
					case 'ArrowLeft':
						forward = 'left';
						break;
					case 'ArrowDown':
						forward = 'bottom';
						break;
					case 'ArrowUp':
						forward = 'top';
						break;
				}
				plates && setPlates(movePlates(plates, forward));
			}
		},
		[plates]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleClick);
		};
	}, [handleClick]);

	return (
		<div className='desk'>
			<div className='desk-grid'>
				{[...new Array(16)].map((_squar, index) => {
					return <div key={index} className='squar'></div>;
				})}
			</div>
			<div className='game-desk'>
				{plates &&
					plates.map((plate, index) => {
						const cls = `point row-${plate.x} col-${plate.y}`;
						return (
							<div key={index} className={cls}>
								{plate.value}
							</div>
						);
					})}
			</div>
		</div>
	);
};
