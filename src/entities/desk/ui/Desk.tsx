import './styles.scss';

type DeskProps = {
	children: React.ReactNode;
};

export const Desk: React.FC<DeskProps> = ({ children }) => {
	return (
		<div className='desk'>
			<div className='desk-grid'>
				{[...new Array(16)].map((_squar, index) => {
					return <div key={index} className='squar'></div>;
				})}
			</div>
			<div className='game-desk'>{children}</div>
		</div>
	);
};
