import { useEffect, useState } from 'react';

import { PlateData } from '../../../app/types/types';

import { countScores } from '../lib/countScores';

import './styles.scss';

export const ScoreCounter = ({ plates, isRestart }: { plates: PlateData[] | null | undefined; isRestart: boolean }) => {
	const [scores, setScores] = useState<number>(0);
	useEffect(() => {
		const newScores = countScores(plates);
		setScores((scores) => (isRestart ? 0 : scores + newScores));
	}, [plates]);

	return (
		<div className='score-counter'>
			<span>scores</span>
			{scores}
		</div>
	);
};
