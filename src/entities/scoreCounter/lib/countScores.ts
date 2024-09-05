import { PlateData } from '../../../app/types/types';

export const countScores = (plates: PlateData[] | null | undefined) => {
	let res = 0;

	plates &&
		plates.forEach((plate) => {
			if (plate.status === 'mergedWith') {
				res += plate.value;
			}
		});
	return res;
};
