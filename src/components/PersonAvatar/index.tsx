import { FC } from 'react';
import { Avatar } from 'antd';

interface IProps {
  photo?: any;
}

const PersonAvatar: FC<IProps> = ({ photo }) => {
  return <Avatar src={`http://ortoped-crm.fastweb-tech.ru${photo?.url}`} />;
};

export default PersonAvatar;
