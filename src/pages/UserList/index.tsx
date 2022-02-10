import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

//import {getUsers, deleteUser} from '../api';
//import DataTable from '../../../components/common/table';
//import {getColumnSearchProps} from '../../../components/common/table/TableColumnSearch';

//import {getUserTitleByType} from '../roles';

const UserList: FC = () => {
  const router = useHistory();

  // const columns: any[] = [
  //     {
  //         title: 'Имя (логин)',
  //         dataIndex: 'username',
  //         filterSearch: true,
  //         sorter: (a: any, b: any) => a.username.length - b.username.length,
  //         ...getColumnSearchProps('username'),
  //         render: (text: string, record: any) => (
  //             <Link to={`/users/${record.id}`}>
  //                 {
  //                     record.deleted === 1 ?
  //                     <i><del style={{color: "#bbb"}}>{record.username}</del></i> :
  //                     <>{record.username}</>
  //                 }
  //             </Link>
  //         )
  //     },
  //     {
  //         title: 'ФИО',
  //         dataIndex: 'name',
  //         filterSearch: true,
  //         sorter: (a: any, b: any) => a.name.length - b.name.length,
  //         ...getColumnSearchProps('name'),
  //         render: (text: string, record: any) => (
  //             <>{record.surname} {record.name} {record.patronymic}</>
  //         )
  //     },
  //     {
  //         title: 'Роль',
  //         dataIndex: 'type',
  //         filterSearch: true,
  //         sorter: (a: any, b: any) => a.type - b.type,
  //         ...getColumnSearchProps('type'),
  //         render: (text: string, record: any) => (
  //             <>{getUserTitleByType(record.type)}</>
  //         )
  //     },
  //     {
  //         title: 'Email',
  //         dataIndex: 'email',
  //         filterSearch: true,
  //         sorter: (a: any, b: any) => a.email.length - b.email.length,
  //         ...getColumnSearchProps('email'),
  //     },
  //     {
  //         title: 'Телефон',
  //         dataIndex: 'phone',
  //         filterSearch: true,
  //         sorter: (a: any, b: any) => a.phone.length - b.phone.length,
  //         ...getColumnSearchProps('phone'),
  //     },
  // ];

  return (
    <div>Таблица пользователей</div>
    // <DataTable
    //     title="Пользователи"
    //     getData={getUsers}
    //     columns={columns}
    //     params={['username', 'name', 'surname', 'email', 'phone']}
    //     addButtonText="Добавить пользователя"
    //     onCreate={() => {router.push(`/users/new`)}}
    //     onUpdate={(id: number) => {router.push(`/users/${id}`)}}
    //     onDelete={(id: number) => deleteUser(id)}
    //     editable={true}
    //     deletable={true}
    //     addable={true}
    // />
  );
};

export default UserList;
