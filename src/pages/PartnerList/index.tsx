import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import {getPartnersExpanded, deletePartner} from '../api/partners';
import DataTable from '../../components/DataTable';
// import {getColumnSearchProps} from '../../../../components/common/table/TableColumnSearch';
import { Space, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PersonAvatar from '../../components/PersonAvatar';
import { getPartners } from '../../actions';
import { getPartnersSelector } from '../../selectors';

/**
 * Список контрагентов (докторов-партнеров)
 * @returns JSX
 */
const PartnerList: FC = () => {
  const history = useHistory();

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
                <Menu.Item key="1">Удалить</Menu.Item>
              </Menu>
            }
          >
            <Button type="default" shape="circle" icon={<DownOutlined />} size="middle" />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: 'ФИО',
      dataIndex: 'lastName',
      filterSearch: true,
      width: 200,
      // sorter: (a: any, b: any) => a.lastName.length - b.lastName.length,
      // ...getColumnSearchProps('lastName'),
      render: (text: string, record: any) => (
        <Link to={`/partners/${record.id}`}>
          {record.lastName} {record.firstName} {record.patronymic}
        </Link>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phones[]',
      width: 120,
      //sorter: (a: any, b: any) => a.address.length - b.address.length,
      //...getColumnSearchProps('phones[]'),
      render: (text: string, record: any) =>
        record.phones && record.phones.length > 0 && record.phones[0].phone,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 120,
      // sorter: (a: any, b: any) => a.address.length - b.address.length,
      // ...getColumnSearchProps('address'),
    },
    {
      title: 'Пациенты',
      dataIndex: 'patients[]',
      width: 120,
      /*sorter: (a: any, b: any) => {
				if(a.patients && b.patients && a.patients.length && b.patients.length) {
					return a.patients.length - b.patients.length
				}
			},*/
      //...getColumnSearchProps('patients'),
      render: (text: string, record: any) =>
        record.patients.map(
          (p: any) =>
            p &&
            p.id && (
              <p style={{ margin: '0' }}>
                <Link to={`/patients/${p.id}`}>
                  {p.lastName} {p.firstName} {p.patronymic}
                </Link>
              </p>
            )
        ),
    },
  ];

  return (
    <DataTable
      title="Контрагенты"
      getDataAction={getPartners}
      dataSelector={getPartnersSelector}
      columns={columns}
      params={['firstName', 'lastName', 'patronymic', 'phone']}
      addButtonText="Добавить контрагента"
      onCreate={() => {
        history.push(`/partners/new`);
      }}
      onUpdate={(id: number) => {
        history.push(`/partners/${id}`);
      }}
      //onDelete={(id: number) => deletePartner(id)}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default PartnerList;
