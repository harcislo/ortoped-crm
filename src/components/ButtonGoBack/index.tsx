import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ButtonGoBack: FC = () => {
  const history = useHistory();

  return (
    <button className="btn-go-back" onClick={() => history.goBack()}>
      <ArrowLeftOutlined /> Назад
    </button>
  );
};

export default ButtonGoBack;
