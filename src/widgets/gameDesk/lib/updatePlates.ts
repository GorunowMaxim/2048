import { PlateData } from "../../../app/types/types";

type UpdatePlatesData = (
	direction: string,
	updatedPlates: PlateData[],
	plates: PlateData[],
	lastPlate: PlateData,
	beforeLastPlate?: PlateData
) => void;

const updatePlatesData: UpdatePlatesData = (direction, updatedPlates, plates, lastPlate, beforeLastPlate) => {
	const axis = direction === 'Left' || direction === 'Right' ? 'y' : 'x';
	let axisData = 0;
	switch (direction) {
		case 'Left':
		case 'Up':
			axisData = updatedPlates.length > 0 ? updatedPlates[0][axis] + 1 : 1;
			break;
		case 'Right':
		case 'Down':
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

export const updatePlates = (plates: PlateData[], direction: string) => {
	let updatedPlates: PlateData[] = [];

	while (plates.length !== 0) {
		const indexLastPlate = plates.length - 1;
		const lastPlate = plates[indexLastPlate];
		const beforeLastPlate = plates.length > 1 ? plates[indexLastPlate - 1] : undefined;
		updatePlatesData(direction, updatedPlates, plates, lastPlate, beforeLastPlate);
	}
	return updatedPlates;
};