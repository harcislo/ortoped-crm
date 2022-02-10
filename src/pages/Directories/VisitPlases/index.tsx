import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { getVisitPlacesSelector, getVisitPlaces } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Места приемов"
 * @returns JSX
 */
const VisitPlasesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Место приема',
      dataIndex: 'name',
      filterSearch: true,
      // TODO search +
    },
  ];

  return (
    <DataTable
      title="Места приемов"
      getDataAction={getVisitPlaces}
      dataSelector={getVisitPlacesSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить место приема"
      onCreate={() => {}}
      //onFilter={(data) => {data.filter((item: any) => item.parentId === null)}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default VisitPlasesDirectory;
