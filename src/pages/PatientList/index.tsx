import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Space, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

//import {getPatientsExpanded, deletePatient} from '../api/patients';
import DataTable from '../../components/DataTable';
//import {getColumnSearchProps} from '../../../../components/common/table/TableColumnSearch';

import PersonAvatar from '../../components/PersonAvatar';
import { getPatients, getPatientsSelector } from '../../redux-slices/PatientSlice';
//import {getAge} from '../../../../utils/dates';

const PatientList: FC = () => {
  const router = useHistory();

  // TODO уточнить тип
  const columns: any[] = [
    {
      title: '',
      dataIndex: 'menu',
      key: 'menu',
      width: 15,
      align: 'center',
      render: () => (
        <Space size="middle">
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key="0">Редактировать</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">Назначить прием</Menu.Item>
                <Menu.Item key="2">Создать задачу</Menu.Item>
                <Menu.Item key="3">Назначить представителем</Menu.Item>
                <Menu.Item key="4">Назначить контрагентом</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5">Удалить</Menu.Item>
              </Menu>
            }
          >
            <Button type="default" shape="circle" icon={<DownOutlined />} size="middle" />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: 'Фото',
      dataIndex: 'fotoId',
      width: 30,
      align: 'center',
      render: (text: string, record: any) => record.foto && <PersonAvatar photo={record.foto} />,
    },
    {
      title: 'ФИО',
      dataIndex: 'lastName',
      filterSearch: true,
      width: 200,
      // ...getColumnSearchProps('lastName'),
      render: (text: string, record: any) => (
        <Link to={`/patients/${record.id}`}>
          {record.lastName} {record.firstName} {record.patronymic}
        </Link>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phones[]',
      width: 120,
      sorter: (a: any, b: any) => a.phones[0].length - b.phones[0].length,
      // ...getColumnSearchProps('phones[]'),
      render: (text: string, record: any) =>
        record.phones && record.phones.length > 0 && record.phones[0].phone,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 120,
      sorter: (a: any, b: any) => a.address.length - b.address.length,
      // ...getColumnSearchProps('address'),
    },
    /*{ // доработать, расчет возраста работает некорректно
        title: 'Возраст',
        dataIndex: 'birthday',
        width: 50,
        sorter: (a: any, b: any) => a.birthday.length - b.birthday.length,
        ...getColumnSearchProps('birthday'),
        render: (text: string, record: any) => (
            record.birthday &&
            record.birthday !== "" &&
            `${getAge(record.birthday)} (${getAge(record.birthday)})`
        )
    },*/
    {
      title: 'Контрагент',
      dataIndex: 'partner',
      width: 120,
      sorter: (a: any, b: any) => a.partner.lastName.length - b.partner.lastName.length,
      //...getColumnSearchProps('partner'),
      render: (text: string, record: any) =>
        record.partner &&
        record.partner.id && (
          <Link to={`/partners/${record.partner.id}`}>
            {record.partner.lastName} {record.partner.firstName} {record.partner.patronymic}
          </Link>
        ),
    },
  ];

  return (
    <DataTable
      title="Пациенты"
      getDataAction={getPatients}
      dataSelector={getPatientsSelector}
      columns={columns}
      params={['firstName', 'lastName', 'patronymic', 'phone', 'address']}
      addButtonText="Добавить пациента"
      onCreate={() => {
        router.push(`/patients/new`);
      }}
      onUpdate={(id: number) => {
        router.push(`/patients/${id}`);
      }}
      //onDelete={(id: number) => deletePatient(id)}
      onDelete={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default PatientList;
