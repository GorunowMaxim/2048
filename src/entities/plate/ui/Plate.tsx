import { PlateData } from 'app/types/types';

import './styles.scss';

export const Plate: React.FC<PlateData> = ({ id: _id, value, x, y, status }) => {
	const statusClass = status !== null ? `plate_${status}` : '';
	const plateClassName = `plate plate-${value} row-${x} col-${y} ${statusClass}`;
	return <div className={plateClassName}>{value}</div>;
};
