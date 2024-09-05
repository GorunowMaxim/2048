import { PlateData } from "../../../app/types/types";

export const sortPlatesById = (plates: PlateData[]) => {
	return plates.sort((a, b) => a.id - b.id);
};

export const sortPlatesByStatus = (plates: PlateData[]) => {
	return plates.filter((plate) => plate.status !== 'merged');
};


export const sortPlatesByAxis = (direction: string, plates: PlateData[]) => {
	const axis = direction === 'Left' || direction === 'Right' ? 'y' : 'x';
	return plates.sort((a, b) => (direction === 'Left' || direction === 'Up' ? b[axis] - a[axis] : a[axis] - b[axis]));
};