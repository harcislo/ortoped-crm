import { FC } from 'react';

interface IProps {
  place: any;
}

/**
 * Место приема (названиие места по id)
 * @returns JSX
 */
const VisitPlaceName: FC<IProps> = ({ place }) => {
  return place?.name;
};

export default VisitPlaceName;
