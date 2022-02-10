import { FC } from 'react';

import DataTable from '../../../components/DataTable';

import { getCitiesSelector, getCities } from '../../../redux-slices/DirectoriesSlice';
import { City } from '../../../types';

/*
 * Справочник "Города"
 * @returns JSX
 */
const CitiesDirectory: FC = () => {
  const columns: any[] = [
    {
      title: 'Страна',
      dataIndex: 'country',
      // TODO sort + filter
      defaultSortOrder: 'descend',
      render: (_: any, record: City) => {
        return record.country?.name;
      },
    },
    {
      title: 'Город',
      dataIndex: 'name',
      // TODO sort + search
    },
    {
      title: 'Регион',
      dataIndex: 'region',
      // TODO sort + search
    },
    {
      title: 'Район',
      dataIndex: 'area',
      // TODO sort + search
    },
  ];

  return (
    <DataTable
      title="Города"
      getDataAction={getCities}
      dataSelector={getCitiesSelector}
      columns={columns}
      addButtonText="Добавить город"
      onCreate={() => {}}
      editable={false}
      deletable={false}
      addable={false}
    />
  );
};

export default CitiesDirectory;
