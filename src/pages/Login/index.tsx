import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Progress, Typography } from 'antd';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login, getLoginLoading } from '../../redux-slices/AuthSlice';
import { onFinishLoginFailed } from '../../helpers';
import { useHistory } from 'react-router-dom';

//TODO
//import {rules} from '../../../utils/rules';

const { Title } = Typography;

const Login: FC = () => {
  const dispatch = useDispatch();

  const history = useHistory()
  console.log(history)

  const loading = useSelector(getLoginLoading);

  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [title] = useState<string | null>('Вход в CRM');

  useEffect(() => {
    if (loading) {
      for (let i = 0; i <= 100; i++) {
        setProgressPercent(i);
      }
    }
  }, [loading]);

  const auth = async (values: { username: string; password: string }) => {
    setProgressPercent(0);
    localStorage.setItem('selectedItem', '0')
    dispatch(login(values.username, values.password));
  };

  function onLoginHandler() {
    //Логика проверки
    localStorage.setItem('selectedItem', 'Главная')
  }

  return (
    <div className="module-auth">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={{ remember: true }}
        onFinish={auth}
        onFinishFailed={onFinishLoginFailed}
        //onValuesChange={(e: any) => console.log(e)}
        autoComplete="off"
        className="login-form"
        size="large"
        layout="horizontal"
        labelAlign="left"
      >
        <Title level={3} type="secondary" className="text-center pb-3">
          {title}
        </Title>

        <Form.Item
          label="Логин"
          name="username"
          // rules={[
          //     rules.required('Логин не может быть пустым'),
          //     { type: 'string', min: 3 }
          // ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          //rules={[rules.required('Пароль не может быть пустым')]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} className="text-center">
          <Button onClick={onLoginHandler} type="default" htmlType="submit" className="pl-5 pr-5">
            Войти
          </Button>
        </Form.Item>
        {loading && (
          <Progress percent={progressPercent} size="default" status="normal" showInfo={false} />
        )}
      </Form>
    </div>
  );
};

export default Login;
