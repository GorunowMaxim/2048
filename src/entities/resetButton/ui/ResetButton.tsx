type ResetButtonProps = {
	handleClick: () => void;
};

export const ResetButton: React.FC<ResetButtonProps> = ({ handleClick }) => {
	return (
		<div onClick={handleClick} className='reset-button'>
			New Game
		</div>
	);
};
