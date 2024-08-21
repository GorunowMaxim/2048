import { createNewPlate } from './createNewPlate';

type Obj = {
	value: number;
	x: number;
	y: number;
};

type UpdatePlatesData = (
	direction: string,
	updatedPlates: Obj[],
	plates: Obj[],
	lastPlate: Obj,
	beforeLastPlate?: Obj
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
		lastPlate.value *= 2;
		plates.pop();
	}

	updatedPlates.unshift(lastPlate);
};

const updatePlates = (plates: Obj[], direction: string) => {
	let updatedPlates: Obj[] = [];

	while (plates.length !== 0) {
		const indexLastPlate = plates.length - 1;
		const lastPlate = plates[indexLastPlate];
		const beforeLastPlate = plates.length > 1 ? plates[indexLastPlate - 1] : undefined;
		updatePlatesData(direction, updatedPlates, plates, lastPlate, beforeLastPlate);
	}
	return updatedPlates;
};

const sortByAxis = (direction: string, plates: Obj[]) => {
	const axis = direction === 'left' || direction === 'right' ? 'y' : 'x';
	return plates.sort((a, b) => (direction === 'left' || direction === 'top' ? b[axis] - a[axis] : a[axis] - b[axis]));
};

export const movePlates = (plates: Obj[], direction: string) => {
	const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
	const result = [];

	for (let i = 1; i < 5; i++) {
		const separatePlates = plates.filter((plate) => plate[axis] === i);
		const sortedPlates = sortByAxis(direction, separatePlates);
		const changedPlates = updatePlates(sortedPlates, direction);
		result.push(...changedPlates);
	}
	const newPlate = createNewPlate(result);
	result.push(newPlate);
	return result;
};
