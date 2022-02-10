import { FC } from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router';

import { ROUTE_NAME } from '../../navigation/routeNames';

const Error404: FC = () => {
  const history = useHistory();

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Запрашиваемая страница не доступна или не существует!"
        extra={
          <Button type="primary" onClick={() => history.push(ROUTE_NAME.HOME)}>
            На главную
          </Button>
        }
      />
    </div>
  );
};

export default Error404;
