import { FC } from 'react';
import DataTable from '../../../components/DataTable';
import { getMkb, getMkbSelector } from '../../../redux-slices/DirectoriesSlice';

const MKB10Directory: FC = () => {
  const columns: any[] = [
    {
      title: 'Группа',
      dataIndex: 'parentCode',
      // render: (parentCode: number) => (
      //     <>{mkb10 && mkb10.length > 0 && mkb10.filter(c => c.parentCode === parentCode)[0].parentCode}</>
      // ),
    },
    {
      title: 'Код МКБ-10',
      dataIndex: 'code',
    },
    {
      title: 'Название',
      dataIndex: 'name',
    },
  ];

  return (
    <DataTable
      title="МКБ-10"
      getDataAction={getMkb}
      dataSelector={getMkbSelector}
      columns={columns}
      params={['name', 'code']}
      addButtonText="Добавить"
      onCreate={() => {}}
      editable={false}
      deletable={false}
      addable={false}
    />
  );
};

export default MKB10Directory;
