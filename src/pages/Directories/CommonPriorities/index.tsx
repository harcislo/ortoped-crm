import React, { FC } from 'react';
import DataTable from '../../../components/DataTable';
import {
  getCommonPrioritiesSelector,
  getCommonPriorities,
} from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Важность задач"
 * @returns JSX
 */
const CommonPrioritiesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Важность задачи',
      dataIndex: 'name',
      filterSearch: true,
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Важность задач"
      getDataAction={getCommonPriorities}
      dataSelector={getCommonPrioritiesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить важность задачи"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default CommonPrioritiesDirectory;
