import { PlateData } from '../../app/types/types';
import { createNewPlate } from './createNewPlate';

type UpdatePlatesData = (
	direction: string,
	updatedPlates: PlateData[],
	plates: PlateData[],
	lastPlate: PlateData,
	beforeLastPlate?: PlateData
) => void;

const updatePlatesData: UpdatePlatesData = (direction, updatedPlates, plates, lastPlate, beforeLastPlate) => {
	const axis = direction === 'left' || direction === 'right' ? 'y' : 'x';
	let axisData = 0;
	switch (direction) {
		case 'left':
		case 'top':
			axisData = updatedPlates.length > 0 ? updatedPlates[0][axis] + 1 : 1;
			break;
		case 'right':
		case 'bottom':
			axisData = updatedPlates.length > 0 ? updatedPlates[0][axis] - 1 : 4;
			break;
	}

	lastPlate[axis] = axisData;
	plates.pop();

	if (beforeLastPlate && lastPlate.value === beforeLastPlate.value) {
		beforeLastPlate[axis] = axisData;
		beforeLastPlate.status = 'merged';
		updatedPlates.unshift(beforeLastPlate);
		lastPlate.value *= 2;
		lastPlate.status = 'new';
		plates.pop();
	}

	updatedPlates.unshift(lastPlate);
};

const updatePlates = (plates: PlateData[], direction: string) => {
	let updatedPlates: PlateData[] = [];

	while (plates.length !== 0) {
		const indexLastPlate = plates.length - 1;
		const lastPlate = plates[indexLastPlate];
		const beforeLastPlate = plates.length > 1 ? plates[indexLastPlate - 1] : undefined;
		updatePlatesData(direction, updatedPlates, plates, lastPlate, beforeLastPlate);
	}
	return updatedPlates;
};

const sortPlates = (plates: PlateData[]) => {
	return plates.sort((a, b) => a.id - b.id);
};

const sortByAxis = (direction: string, plates: PlateData[]) => {
	const axis = direction === 'left' || direction === 'right' ? 'y' : 'x';
	return plates.sort((a, b) => (direction === 'left' || direction === 'top' ? b[axis] - a[axis] : a[axis] - b[axis]));
};

export const movePlates = (plates: PlateData[], direction: string) => {
	const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
	const result = [];
	plates = plates.map((plate) => {
		if (plate.status === 'new') {
			return { ...plate, status: null };
		}
		return plate;
	});

	for (let i = 1; i < 5; i++) {
		const separatePlates = plates.filter((plate) => plate[axis] === i);
		const sortedPlates = sortByAxis(direction, separatePlates);
		const changedPlates = updatePlates(sortedPlates, direction);
		result.push(...changedPlates);
	}
	return sortPlates(result);
};
