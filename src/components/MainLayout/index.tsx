import React, {FC, useCallback, useEffect, useState} from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  CreditCardOutlined,
  DashboardOutlined,
  FolderAddOutlined,
  FormOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  TableOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE_NAME } from '../../navigation/routeNames';
import { getSelectedPageKey } from '../../redux-slices/AppSlice';

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;

// TODO тут еще есть компоннты - брать из privateRoutes
const menuItems = [
  {
    id: 0,
    path: ROUTE_NAME.HOME,
    title: 'Главная',
    menuIcon: DashboardOutlined,
  },
  {
    id: 1,
    path: ROUTE_NAME.TASKS,
    title: 'Задачи',
    menuIcon: TableOutlined,
  },
  {
    id: 2,
    path: ROUTE_NAME.PATIENTS,
    title: 'Пациенты',
    menuIcon: TeamOutlined,
  },
  {
    id: 3,
    path: ROUTE_NAME.VISITS,
    title: 'Приемы',
    menuIcon: FormOutlined,
  },
  {
    id: 4,
    path: ROUTE_NAME.PARTNERS,
    title: 'Контрагенты',
    menuIcon: UsergroupAddOutlined,
  },
  {
    id: 5,
    path: ROUTE_NAME.AGENTS,
    title: 'Представители',
    menuIcon: UsergroupAddOutlined,
  },
  {
    id: 6,
    path: ROUTE_NAME.PAYMENTS,
    title: 'Оплаты',
    menuIcon: CreditCardOutlined,
  },
  {
    id: 7,
    path: ROUTE_NAME.DIRECTORIES,
    title: 'Справочники',
    menuIcon: FolderAddOutlined,
  },
  {
    id: 8,
    path: ROUTE_NAME.SETTINGS,
    title: 'Настройки',
    menuIcon: SettingOutlined,
  },
];

interface IProps {
}

const MainLayout: FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);


  const dispatch = useDispatch();

  const selectedPageKey = localStorage.getItem('selectedItem')


  useEffect(() => {
    document.title = `${menuItems[Number(localStorage.getItem('selectedItem')) || 0].title} : CRM`;
  }, [selectedPageKey])


  //const router = useHistory();
  const onMenuSelect = useCallback((info: { key: string }) => {
    localStorage.setItem('selectedItem', info.key);
    console.log(localStorage.getItem('selectedItem'));
  }, []);
  // const selectedPageKey = useSelector(getSelectedPageKey);

//@ts-ignore
//   const onMenuSelect = useCallback(
//     (info: { key: string }) => {
//       const pageIndex = Number(info.key);
//       dispatch(setSelectedPageKey(pageIndex));
//       document.title = `${menuItems[pageIndex].title} : CRM`;
//     },
//     [dispatch]
//   );

  return (
    <Layout className='wrapper'>
      <Layout  style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          collapsedWidth='70px'
          trigger={
            collapsed ? (
              <RightOutlined style={{ color: '#484D55' }} title='Развернуть меню' />
            ) : (
              <LeftOutlined style={{ color: '#484D55' }} title='Свернуть меню' />
            )
          }
          breakpoint={"lg"}
          onBreakpoint={() => {
            setCollapsed(false)
          }}
        >
          <div className='logo' />
          <Menu
            theme='light'
            mode='vertical'
            // defaultSelectedKeys={[`${localStorage.getItem('selectedItem')}`]}
            //@ts-ignore
            defaultSelectedKeys={[`${localStorage.getItem('selectedItem')}`]}
            onSelect={onMenuSelect}
          >
            {menuItems.map((item: any, i: number) => (
              <Menu.Item
                key={item.id}
                icon={item.menuIcon ? <item.menuIcon /> : <DashboardOutlined />}
              >
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout className='site-layout'>
          <Content className='site-layout-background'>
            <Header
              className='site-layout-background'
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              <Title level={3} type='secondary'>
                {/*@ts-ignore*/}
                {menuItems[localStorage.getItem('selectedItem')].title}
              </Title>

              {/*<Title level={3} type="secondary">*/}
              {/*  /!*{localStorage.getItem('selectedItem')}*!/*/}
              {/*  {menuItems[localStorage.getItem('selectedItem')].title}*/}
              {/*</Title>*/}

              <hr style={{ border: '1px #f9f9f9 solid' }} />
            </Header>
            {children}
          </Content>
        </Layout>
      </Layout>

      <Footer className='pt-2 pb-2 pl-4 pr-4 text-left'>
        {/*<Row justify="start" gutter={16}>
    	      <Col className="gutter-row">
    	          <h4 className="text-white m-0 p-0">Сообщения:</h4>
    	      </Col>
    	      <Col className="gutter-row">
    	          <Alert message={<a href="/" className="text-dark">Задача просрочена 18.09.2021 15:00</a>} type="error" showIcon closable />
    	      </Col>
    	      <Col className="gutter-row">
    	          <Alert message={<a href="/" className="text-dark">Прием сегодня 15:00</a>} type="warning" showIcon closable />
    	      </Col>
    	      <Col className="gutter-row">
    	          <Alert message={<a href="/" className="text-dark">Прием сегодня 16:30</a>} type="warning" showIcon closable />
    	      </Col>
    	  </Row>*/}
      </Footer>
    </Layout>
  );
};

export default MainLayout;
