import { PlateData } from '../../../app/types/types';
import { sortPlatesByAxis, sortPlatesById } from './sortsPlates';
import { updatePlates } from './updatePlates';

export const movePlates = (plates: PlateData[], direction: string) => {
	const axis = direction === 'Left' || direction === 'Right' ? 'x' : 'y';
	const result = [];
	plates = plates.map((plate) => {
		if (plate.status === 'new') {
			return { ...plate, status: null };
		}
		return plate;
	});

	for (let i = 1; i < 5; i++) {
		const separatePlates = plates.filter((plate) => plate[axis] === i);
		const sortedPlates = sortPlatesByAxis(direction, separatePlates);
		const changedPlates = updatePlates(sortedPlates, direction);
		result.push(...changedPlates);
	}
	return sortPlatesById(result);
};
