import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { getDiagnosesSelector, getDiagnoses } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Диагнозы"
 * @returns JSX
 */
const DiagnosesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Диагноз',
      dataIndex: 'name',
      filterSearch: true,
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Диагнозы"
      getDataAction={getDiagnoses}
      dataSelector={getDiagnosesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить диагноз"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default DiagnosesDirectory;
