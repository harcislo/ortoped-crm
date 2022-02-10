import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import {
  getRelationDegreeSelector,
  getRelationDegree,
} from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Степень родства"
 * @returns JSX
 */
const RelationDegreesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Степень родства',
      dataIndex: 'name',
      filterSearch: true,
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Степень родства"
      getDataAction={getRelationDegree}
      dataSelector={getRelationDegreeSelector}
      columns={columns}
      params={['name']}
      addButtonText="Добавить степень родства"
      onCreate={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default RelationDegreesDirectory;
