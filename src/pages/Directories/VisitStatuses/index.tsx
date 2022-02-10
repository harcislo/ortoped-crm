import React, { FC } from 'react';

import DataTable from '../../../components/DataTable';
import { getVisitStatuses, getVisitStatusesSelector } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Статусы приемов"
 * @returns JSX
 */
const VisitStatusesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Статус приема',
      dataIndex: 'name',
      filterSearch: true,
    },
  ];

  return (
    <DataTable
      title="Статусы приемов"
      //getData={getVisitStatuses}
      getDataAction={getVisitStatuses}
      dataSelector={getVisitStatusesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить статус приема"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default VisitStatusesDirectory;
