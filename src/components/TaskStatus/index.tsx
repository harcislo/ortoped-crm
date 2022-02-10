import { FC } from 'react';
import { getTaskStatusColor } from '../../helpers';
import { TaskStatus } from '../../types';
import './styles.scss';

interface IProps {
  status?: TaskStatus;
}

/**
 * Статус задачи (вывод в списке задач)
 */
const taskStatus: FC<IProps> = ({ status }) => {
  return status ? (
    <p
      className="tracker-status"
      style={{
        backgroundColor: `${getTaskStatusColor(status.id)}`,
      }}
    >
      {status.title}
    </p>
  ) : null;
};

export default taskStatus;
