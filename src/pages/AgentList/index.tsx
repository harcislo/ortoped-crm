import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Space, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// import {getAgentsExpanded, deleteAgent} from '../api/agents';
import DataTable from '../../components/DataTable';
// import {getColumnSearchProps} from '../../../../components/common/table/TableColumnSearch';

import PersonAvatar from '../../components/PersonAvatar';
// import PatientFullName from '../../patients/components/PatientFullName';
import { getAgents } from '../../actions';
import { getAgentsSelector } from '../../selectors';

/**
 * Список представителей пациентов
 * @returns JSX
 */
const AgentList: FC = () => {
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
      title: 'Фото',
      dataIndex: 'fotoId',
      width: 30,
      align: 'center',
      render: (text: string, record: any) => record.foto && <PersonAvatar photo={record.photo} />,
    },
    {
      title: 'ФИО',
      dataIndex: 'lastName',
      filterSearch: true,
      width: 200,
      // sorter: (a: any, b: any) => a.lastName.length - b.lastName.length,
      // ...getColumnSearchProps('lastName'),
      render: (text: string, record: any) => (
        <Link to={`/agents/${record.id}`}>
          {record.lastName} {record.firstName} {record.patronymic}
        </Link>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phones[]',
      width: 120,
      //sorter: (a: any, b: any) => a.address.length - b.address.length,
      // ...getColumnSearchProps('phones[]'),
      render: (text: string, record: any) => (
        <>{record.phones && record.phones[0] && record.phones[0].phone}</>
      ),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 120,
      // sorter: (a: any, b: any) => a.address.length - b.address.length,
      // ...getColumnSearchProps('address'),
    },
    {
      title: 'Пациент',
      dataIndex: 'patientId',
      width: 120,
      // sorter: (a: any, b: any) => a.patientId - b.patientId,
      // ...getColumnSearchProps('patientId'),
      // render: (text: string, record: any) => (
      // 	<Link to={`/patients/${record.patientId}`}>
      // 		{
      // 			record.patientId &&
      // 			<PatientFullName patientId={record.patientId}/>
      // 		}
      // 	</Link>
      // )
    },
  ];

  return (
    <DataTable
      title="Представители пациентов"
      getDataAction={getAgents}
      dataSelector={getAgentsSelector}
      columns={columns}
      params={['firstName', 'lastName', 'patronymic', 'phone']}
      addButtonText="Добавить представителя"
      onCreate={() => {
        history.push(`/agents/new`);
      }}
      onUpdate={(id: number) => {
        history.push(`/agents/${id}`);
      }}
      // onDelete={(id: number) => deleteAgent(id)}
      onDelete={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default AgentList;
