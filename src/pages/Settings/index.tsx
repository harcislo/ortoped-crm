import { FC } from 'react';
import { List, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Пользователи',
    path: '/users',
    icon: (
      <UserOutlined
        style={{
          fontSize: '24px',
          color: '#b0b0b0',
          marginRight: '0.5rem',
        }}
      />
    ),
  },
];

const Settings: FC = () => {
  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card>
              {item.icon}
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
    </>
  );
};

export default Settings;
