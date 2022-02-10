import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import {
  getPatientSources,
  getPatientSourcesSelector,
} from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Источники пациентов"
 * @returns JSX
 */
const PatientsSourcesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Источник пациентов',
      dataIndex: 'name',
      filterSearch: true,
      // TODO search + sort
    },
  ];

  return (
    <DataTable
      title="Источники пациентов"
      getDataAction={getPatientSources}
      dataSelector={getPatientSourcesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить источник пациентов"
      onCreate={() => {}}
      //onFilter={(data) => {data.filter((item: any) => item.parentId === 3)}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default PatientsSourcesDirectory;
