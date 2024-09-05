import { useCallback, useEffect, useState } from 'react';

import { Desk } from '../../../entities/desk';
import { Plate } from '../../../entities/plate';

import { createNewPlate } from '../lib/createNewPlate';
import { sortPlatesByStatus } from '../lib/sortsPlates';
import { movePlates } from '../lib/movePlates';

import { PlateData } from '../../../app/types/types';

export const GameDesk = () => {
	const [plates, setPlates] = useState<PlateData[] | null>();
	const handleClick = useCallback(
		(e: KeyboardEvent) => {
			const allowedKeys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'];
			if (!allowedKeys.includes(e.key)) return;

			const forward = e.key.slice(5);
			setPlates((plates) => plates && sortPlatesByStatus(plates));
			setPlates((plates) => plates && movePlates(plates, forward));
			setPlates((plates) => plates && [...plates, createNewPlate(plates)]);
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
	);
};
