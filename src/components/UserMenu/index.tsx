import React, { FC, useState, useEffect } from 'react';
// import { useTypedSelector } from '../../../hooks/useTypedSelector';
// import {useActions} from '../../../hooks/useActions';
import { Menu, Button, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, logout } from '../../redux-slices/AuthSlice';
import { ROUTE_NAME } from '../../navigation/routeNames';

const UserMenu: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUserData);

  const onLogout = () => {
    localStorage.removeItem('selectedItem')
    dispatch(logout());
  };

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu>
              <Menu.Item key="0">
                <Link to={`/users/${user?.id}`}>
                  <UserOutlined /> Личный кабинет
                </Link>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="1" onClick={onLogout}>
                <LogoutOutlined />
                <Link to={ROUTE_NAME.HOME}>Выйти</Link>

              </Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
        >
          <Button type="default" shape="circle" icon={<UserOutlined />} size="large" />
        </Dropdown>
      </Space>
    </Space>
  );
};

export default UserMenu;
