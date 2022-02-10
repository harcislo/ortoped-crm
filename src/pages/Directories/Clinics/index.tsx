import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { getClinics, getClinicsSelector } from '../../../redux-slices/DirectoriesSlice';

/**
 * Справочник "Клиники"
 * @returns JSX
 */
const ClinicsDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Клиника',
      dataIndex: 'name',
      filterSearch: true,
      // TODO sort + search
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      filterSearch: true,
      // TODO sort + search
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      filterSearch: true,
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Клиники"
      getDataAction={getClinics}
      dataSelector={getClinicsSelector}
      columns={columns}
      params={['name', 'address', 'phone']}
      addButtonText="Добавить клинику"
      onCreate={() => {}}
      //onFilter={(data) => {data.filter((item: any) => item.parentId === 1)}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default ClinicsDirectory;
