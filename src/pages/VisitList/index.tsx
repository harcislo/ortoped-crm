import { FC } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Space, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment';

// import {getVisitsExpanded, deleteVisit} from '../api/visits';
import DataTable from '../../components/DataTable';
// import {getColumnSearchProps} from '../../../../components/common/table/TableColumnSearch';

import VisitStatusName from '../../components/VisitStatusName';
import VisitPlaceName from '../../components/VisitPlaceName';
import VisitTypeName from '../../components/VisitTypeName';
import PriorityName from '../../components/PriorityName';
import { getVisits } from '../../actions';
import { getVisitsSelector } from '../../selectors';

/**
 * Список приемов
 * @returns JSX
 */
const VisitList: FC = () => {
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
                <Menu.Item key="1">Изменить статус</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="2">Удалить</Menu.Item>
              </Menu>
            }
          >
            <Button type="default" shape="circle" icon={<DownOutlined />} size="middle" />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      filterSearch: true,
      width: 80,
      align: 'center',
      // sorter: (a: any, b: any) => {
      //     if(a.status && b.status && a.status.id && b.status.id) {
      //         return a.status.id - b.status.id
      //     }
      // },
      //...getColumnSearchProps('status'),
      render: (text: string, record: any) =>
        record.status && record.status.id && <VisitStatusName status={record.status} />,
    },
    {
      title: 'Дата/время начала',
      dataIndex: 'dateStart',
      width: 130,
      align: 'center',
      // sorter: (a: any, b: any) => {
      // 		if(a.dateStart && b.dateStart && a.dateStart.length && b.dateStart.length) {
      // 				return a.dateStart.length - b.dateStart.length
      // 		}
      // },
      // ...getColumnSearchProps('dateStart'),
      render: (text: string, record: any) =>
        record.dateStart
          ? moment(record.dateStart).format('DD.MM.YYYY HH:MM:SS')
          : '00:00 00:00:00',
    },
    {
      title: 'Дата/время окончания',
      dataIndex: 'dateEnd',
      width: 80,
      align: 'center',
      // sorter: (a: any, b: any) => {
      // 		if(a.dateEnd && b.dateEnd && a.dateEnd.length && b.dateEnd.length) {
      // 				return a.dateEnd.length - b.dateEnd.length
      // 		}
      // },
      // ...getColumnSearchProps('dateEnd'),
      render: (text: string, record: any) =>
        record.dateEnd ? moment(record.dateEnd).format('DD.MM.YYYY HH:MM:SS') : '00:00 00:00:00',
    },
    {
      title: 'Тип приема',
      dataIndex: 'type',
      width: 100,
      // sorter: (a: any, b: any) => {
      // 		if(a.type && b.type && a.type.name.length && b.type.name.length) {
      // 				return a.type.name.length - b.type.name.length
      // 		}
      // },
      // ...getColumnSearchProps('type'),
      render: (text: string, record: any) =>
        record.type && record.type.id && <VisitTypeName type={record.type} />,
    },
    {
      title: 'Место приема',
      dataIndex: 'place',
      width: 120,
      // sorter: (a: any, b: any) => {
      // 		if(a.place && b.place && a.place.name.length && b.place.name.length) {
      // 				return a.place.name.length - b.place.name.length
      // 		}
      // },
      // ...getColumnSearchProps('place'),
      render: (text: string, record: any) =>
        record.place && record.place.id && <VisitPlaceName place={record.place} />,
    },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      width: 120,
      // sorter: (a: any, b: any) => {
      // 		if(a.priority && b.priority && a.priority.name.length && b.priority.name.length) {
      // 				return a.priority.name.length - b.priority.name.length
      // 		}
      // },
      // ...getColumnSearchProps('priority'),
      render: (text: string, record: any) =>
        record.priority && record.priority.id && <PriorityName priority={record.priority} />,
    },
    {
      title: 'Больничный',
      dataIndex: 'sickList',
      filterSearch: true,
      width: 100,
      // sorter: (a: any, b: any) => {
      // 		if(a.sickList && b.sickList && a.sickList.docNo && b.sickList.docNo) {
      // 				return a.sickList.docNo - b.sickList.docNo
      // 		}
      // },
      // ...getColumnSearchProps('sickList'),
      render: (text: string, record: any) =>
        record.sickList &&
        record.sickList.id && (
          <Link to={`/sick-list/${record.sickList.id}`}>
            № {record.sickList.docNo} от {moment(record.sickList.date).format('DD.MM.YYYY')}
          </Link>
        ),
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      width: 120,
      // sorter: (a: any, b: any) => a.comment.length - b.comment.length,
      // ...getColumnSearchProps('comment'),
    },
  ];

  return (
    <DataTable
      title="Список приемов"
      getDataAction={getVisits}
      dataSelector={getVisitsSelector}
      columns={columns}
      params={['comment', 'dateStart', 'dateEnd']}
      addButtonText="Добавить прием"
      onCreate={() => {
        history.push(`/visits/new`);
      }}
      onUpdate={(id: number) => {
        history.push(`/visits/${id}`);
      }}
      //onDelete={(id: number) => deleteVisit(id)}
      onDelete={() => {}}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default VisitList;
