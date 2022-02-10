import { FC } from 'react';
//import {getVisitStatusColor} from '../../../directories/api/visitStatuses';

interface IProps {
  status: any;
}

/**
 * Статус приема (название по id)
 * @returns JSX
 */
const VisitStatusName: FC<IProps> = ({ status }) => {
  return (
    status && (
      <p
        className="visit-status"
        style={
          {
            //backgroundColor: `${getVisitStatusColor(status.id)}`
          }
        }
      >
        {status.name}
      </p>
    )
  );
};

export default VisitStatusName;
