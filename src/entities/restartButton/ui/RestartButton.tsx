import { memo } from 'react';
import './styles.scss';

type ResetButtonProps = {
	handleClick: () => void;
};

export const RestartButton: React.FC<ResetButtonProps> = memo(({ handleClick }) => {
	return (
		<button onClick={handleClick} className='reset-button'>
			New Game
		</button>
	);
});
