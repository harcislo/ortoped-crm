import { FC } from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fastWebLogo from '../../images/fastweb-logo.png';
import { getIsAuthenticated } from '../../redux-slices/AuthSlice';
import GlobalSearch from '../GlobalSearch';
import UserMenu from '../UserMenu';

const { Header } = Layout;

const CustomHeader: FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Header className="head pl-4 pr-4">
      <Row justify="space-between" align="middle" gutter={16}>
        <Col span={8} className="gutter-row head-logo">
          <Link to="/">
            <img src={fastWebLogo} alt="fastweb" />
          </Link>
        </Col>
        {isAuthenticated && (
          <>
            <Col span={7} className="gutter-row head-search-box">
              <GlobalSearch />
            </Col>
            <Col span={7} className="gutter-row user-menu">
              <UserMenu />
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
};

export default CustomHeader;
