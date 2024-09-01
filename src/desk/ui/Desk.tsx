import { useCallback, useEffect, useState } from 'react';

import { movePlates } from '../lib/updatePlates';
import { createNewPlate } from '../lib/createNewPlate';

import { PlateData } from '../../app/types/types';

import './styles.scss';
import { Plate } from '../../entities/plate';

const sortPlates = (plates: PlateData[]) => {
	return plates.sort((a, b) => a.id - b.id);
};

const sortByStatus = (plates: PlateData[]) => {
	return plates.filter((plate) => plate.status !== 'merged');
};

export const Desk = () => {
	const [plates, setPlates] = useState<PlateData[] | null>();
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
				setPlates((plates) => plates && sortByStatus(plates));
				setPlates((plates) => plates && movePlates(plates, forward));
				setPlates((plates) => plates && [...plates, createNewPlate(sortPlates(plates))]);
			}
		},
		[plates]
	);

	useEffect(() => {
		!plates && setPlates([createNewPlate([])]);
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
					plates.map((plate) => (
						<Plate
							key={plate.id}
							id={plate.id}
							value={plate.value}
							status={plate.status}
							x={plate.x}
							y={plate.y}
						/>
					))}
			</div>
		</div>
	);
};
