import React, { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { Switch } from 'antd';
import { getTaskStatusesSelector, getTaskStatuses } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Статусы задач"
 * @returns JSX
 */
const TaskStatusesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Статус задачи',
      dataIndex: 'title',
      // TODO sort
      // TODO search
    },
    {
      title: 'Новая',
      dataIndex: 'newStatus',
      // TODO sort
      render: (newStatus: number) => (
        <Switch size="small" defaultChecked={newStatus === 1 ? true : false} />
      ),
    },
    {
      title: 'Закрыта',
      dataIndex: 'closeStatus',
      // TODO sort
      render: (closeStatus: number) => (
        <Switch size="small" defaultChecked={closeStatus === 1 ? true : false} />
      ),
    },
  ];

  return (
    <DataTable
      title="Статусы задач"
      getDataAction={getTaskStatuses}
      dataSelector={getTaskStatusesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить статус задачи"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default TaskStatusesDirectory;
