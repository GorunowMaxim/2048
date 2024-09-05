import './styles.scss';

type ResetButtonProps = {
	handleClick: () => void;
};

export const RestartButton: React.FC<ResetButtonProps> = ({ handleClick }) => {
	return (
		<button onClick={handleClick} className='reset-button'>
			New Game
		</button>
	);
};
