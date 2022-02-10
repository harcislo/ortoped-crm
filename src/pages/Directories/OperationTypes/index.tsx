import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import {
  getOperationsTypesSelector,
  getOperationsTypes,
} from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Виды операций"
 * @returns JSX
 */
const OperationTypesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Вид операции',
      dataIndex: 'name',
      filterSearch: true,
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Виды операций"
      getDataAction={getOperationsTypes}
      dataSelector={getOperationsTypesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить вид операции"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default OperationTypesDirectory;
