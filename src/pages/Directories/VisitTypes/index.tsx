import React, { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { getVisitTypesSelector, getVisitTypes } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Типы приемов"
 * @returns JSX
 */
const VisitTypesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Тип приема',
      dataIndex: 'name',
      filterSearch: true,
    },
  ];

  return (
    <DataTable
      title="Типы приемов"
      getDataAction={getVisitTypes}
      dataSelector={getVisitTypesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить тип приема"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default VisitTypesDirectory;
