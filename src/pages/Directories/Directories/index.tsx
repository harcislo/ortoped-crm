import { FC } from 'react';
import { List, Card } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ROUTE_NAME } from '../../../navigation/routeNames';

const menuItems = [
  {
    path: ROUTE_NAME.VISIT_TYPES,
    title: 'Типы приемов',
  },
  {
    path: ROUTE_NAME.VISIT_STATUSES,
    title: 'Статусы приемов',
  },
  {
    path: ROUTE_NAME.TASK_STATUSES,
    title: 'Статусы задач',
  },
  {
    path: ROUTE_NAME.COMMON_PRIORITIES,
    title: 'Важность задач',
  },
  {
    path: ROUTE_NAME.RELATION_DEGREES,
    title: 'Степень родства',
  },
  {
    path: ROUTE_NAME.VISIT_PLACES,
    title: 'Места приема',
  },
  {
    path: ROUTE_NAME.CLINICS,
    title: 'Клиники',
  },
  {
    path: ROUTE_NAME.PATIENTS_SOURSES,
    title: 'Источники пациентов',
  },
  {
    path: ROUTE_NAME.PATIENT_TAGS,
    title: 'Теги пациентов',
  },
  {
    path: ROUTE_NAME.OPERATION_TYPES,
    title: 'Виды операций',
  },
  {
    path: ROUTE_NAME.DIAGNOSES,
    title: 'Диагнозы',
  },
  {
    path: ROUTE_NAME.BODY_LOCATIONS,
    title: 'Локализации',
  },
  {
    path: ROUTE_NAME.MKB10,
    title: 'МКБ-10',
  },
  {
    path: ROUTE_NAME.CITIES,
    title: 'Города',
  },
];

const Directories: FC = () => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={menuItems}
      renderItem={(item) => (
        <List.Item>
          {/*<Card title={<Link to={item.path}>{item.title}</Link>}>
							<Link to={item.path}>{item.title}</Link>
					</Card>*/}

          <Card>
            <FolderOutlined
              style={{
                fontSize: '24px',
                color: '#b0b0b0',
                marginRight: '0.5rem',
              }}
            />
            <Link
              to={item.path}
              style={{
                fontSize: '16px',
              }}
            >
              {item.title}
            </Link>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default Directories;
