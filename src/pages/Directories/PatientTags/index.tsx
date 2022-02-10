import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { getPatientTags, getPatientTagsSelector } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Тэги пациентов"
 * @returns JSX
 */
const PatientTagsDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Тег (статус)',
      dataIndex: 'name',
      filterSearch: true,
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Теги пациентов (статусы)"
      getDataAction={getPatientTags}
      dataSelector={getPatientTagsSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить тег"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default PatientTagsDirectory;
