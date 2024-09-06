import { useCallback, useEffect, useState } from 'react';

import './styles.scss';

import { Desk } from 'entities/desk';
import { Plate } from 'entities/plate';
import { ScoreCounter } from 'entities/scoreCounter';
import { RestartButton } from 'entities/restartButton';

import { sortPlatesByStatus } from '../lib/sortsPlates';
import { movePlates } from '../lib/movePlates';
import { createNewPlate } from '../lib/createNewPlate';

import { PlateData } from 'app/types/types';

export const GameDesk = () => {
	const [plates, setPlates] = useState<PlateData[]>([]);
	const [restart, setRestart] = useState<boolean>(false);

	const handleClick = useCallback(
		(e: KeyboardEvent) => {
			const allowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
			if (!allowedKeys.includes(e.key)) return;

			const forward = e.key.slice(5);
			setPlates((plates) => sortPlatesByStatus(plates));
			setPlates((plates) => movePlates(plates, forward));
			setPlates((plates) => [...plates, createNewPlate(plates)]);
		},
		[plates]
	);

	useEffect(() => {
		if (restart) {
			setPlates((plates) => plates && [...plates, createNewPlate(plates)]);
			setRestart(false);
		}
	}, [plates]);

	useEffect(() => {
		plates.length === 0 && setPlates([createNewPlate([])]);
		window.addEventListener('keydown', handleClick);

		return () => {
			window.removeEventListener('keydown', handleClick);
		};
	}, [handleClick]);

	const restartGame = () => {
		setPlates([]);
		setRestart(true);
	};

	return (
		<>
			<div className='game-panel'>
				<span className='game-panel__name'>2048</span>
				<ScoreCounter plates={plates} isRestart={restart} />
				<RestartButton handleClick={restartGame} />
			</div>
			<Desk>
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
			</Desk>
		</>
	);
};
