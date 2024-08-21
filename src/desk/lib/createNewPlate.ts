type Obj = {
	value: number;
	x: number;
	y: number;
};

const plateAXisData = [
	{ x: 1, y: 1 },
	{ x: 1, y: 2 },
	{ x: 1, y: 3 },
	{ x: 1, y: 4 },
	{ x: 2, y: 1 },
	{ x: 2, y: 2 },
	{ x: 2, y: 3 },
	{ x: 2, y: 4 },
	{ x: 3, y: 1 },
	{ x: 3, y: 2 },
	{ x: 3, y: 3 },
	{ x: 3, y: 4 },
	{ x: 4, y: 1 },
	{ x: 4, y: 2 },
	{ x: 4, y: 3 },
	{ x: 4, y: 4 },
];

export const createNewPlate = (plates: Obj[]) => {
	const freePlates =
		plates &&
		plateAXisData.filter((plate) => {
			return !plates.some((plateData) => plate.x === plateData.x && plate.y === plateData.y);
		});
	const value = Math.random() > 0.1 ? 2 : 4;
	const randomIndexFreePlate = Math.floor(Math.random() * freePlates.length);
	const pickedFreePlate = freePlates[randomIndexFreePlate];
	return { value: value, x: pickedFreePlate.x, y: pickedFreePlate.y };
};
