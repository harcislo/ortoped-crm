import React, { FC, useState, useEffect } from 'react';
import { useHistory, withRouter, Prompt, useParams } from 'react-router-dom';
//import {getUser, updateUser, deleteUser, createUser} from '../api';

import {
  Alert,
  Row,
  Col,
  Form,
  Input,
  Skeleton,
  Progress,
  message,
  Switch,
  Typography,
} from 'antd';
import {
  UserOutlined,
  SecurityScanOutlined,
  MailOutlined,
  MobileOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';

//import SelectUserRoles from '../components/SelectUserRoles';
//import FormFooter from '../../../components/common/form/FormFooter';
import { ROUTE_NAME } from '../../navigation/routeNames';

type SizeType = Parameters<typeof Form>[0]['size'];

const { Title } = Typography;

const CreateSuccessMessage = () => {
  message.success('Пользователь добавлен...');
};

const UpdateSuccessMessage = () => {
  message.success('Пользователь сохранен...');
};

const DeleteSuccessMessage = () => {
  message.success('Пользователь удален...');
};

const UpdateWarningMessage = () => {
  message.warning('Изменения не сохранены!');
};

const CreateErrorMessage = () => {
  message.error('Не удалось добавить пользователя!');
};

const UpdateErrorMessage = () => {
  message.error('Не удалось сохранить изменения!');
};

const DeleteErrorMessage = () => {
  message.error('Не удалось удалить пользователя!');
};

/**
 * Карточка пользователя
 * @returns JSX
 */
const UserView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [user, setUser] = useState<any | null>(null);
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [userType, setUserType] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  useEffect(() => {
    if (loading) {
      for (let i = 0; i <= 100; i++) {
        setProgressPercent(i);
      }
    }
  }, [loading]);

  // useEffect(() => {
  //   if( id !== 'new' ) {
  //     setLoading(true);
  //     getUser(id)
  //           .then(res => setUser(res.data))
  //           .catch(err => console.log(err))
  //           .finally(() => setLoading(false))
  //   } else {
  //       setLoading(true);
  //       setUser(emptyUser);
  //       setLoading(false);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   setUserType(user.type);
  // }, [user]);

  // useEffect(() => {
  //     setUsername(user.username);
  //     setName(user.name);
  //     setSurname(user.surname);
  //     setPatronymic(user.patronymic);

  //     form.setFieldsValue({
  //         type: userType,
  //         username: user.username,
  //         email: user.email,
  //         enabled: user.enabled,
  //         deleted: user.deleted,
  //         createTime: user.createTime,
  //         updateTime: user.updateTime,
  //         name: user.name,
  //         surname: user.surname,
  //         patronymic: user.patronymic,
  //         phone: user.phone,
  //         sex: user.sex,
  //         birthday: user.birthday
  //     });
  // }, [user, form, userType]);

  // useEffect(() => {
  //     newPassword !== "" &&
  //     form.setFieldsValue({
  //         password: newPassword,
  //     });
  // }, [user, form, newPassword]);

  const onFormFinish = (values: any) => {
    // const result = {};
    // const filteredValues = Object.entries(values).filter(function ([key, value]) {
    //     return value !== undefined;
    // });
    // filteredValues.forEach(val => result[val[0]] = val[1])
    // setSaving(true);
    // console.log('onFormFinish User form:', values, result);
    // if( id === 'new' ) {
    //     createUser(result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             CreateSuccessMessage();
    //             console.log('user created success', res);
    //         })
    //         .catch(err => {
    //             CreateErrorMessage();
    //             console.log('user create error',err);
    //         });
    // } else {
    //     updateUser(id, result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             UpdateSuccessMessage();
    //             console.log('user updated success', res);
    //         })
    //         .catch(err => {
    //             UpdateErrorMessage();
    //             console.log('user update error',err);
    //         })
    // }
  };

  const onUserDelete = () => {
    // setSaving(true);
    // deleteUser(id)
    //     .then(res => {
    //         setIsFormChanged(false);
    //         setSaving(false);
    //         DeleteSuccessMessage();
    //         console.log('user deleted success', res);
    //     })
    //     .catch(err => {
    //         DeleteErrorMessage();
    //         console.log('user delete error',err);
    //     })
  };

  const onFormLayoutChange = (e: any, { size }: { size: SizeType }) => {
    setComponentSize(size);
    console.log('onFormLayoutChange', e);
    setIsFormChanged(true);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onValuesChange={onFormLayoutChange}
      onFinish={onFormFinish}
      size={componentSize as SizeType}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Title level={3} type="secondary" className="form-title">
            {/* {id !== 'new' ? (
                user.deleted === 1 ?
                <del>{`${surname && surname} ${name && name} ${patronymic && patronymic}`}</del> :
                <span>{`${surname && surname} ${name && name} ${patronymic && patronymic}`}</span>
							) : (
								<span>Новый пользователь</span>
							)} */}
            {isFormChanged && (
              <Alert
                style={{ fontWeight: 300, fontSize: '13px' }}
                message="Изменения не сохранены..."
                type="warning"
                showIcon
              />
            )}
          </Title>
        </Col>
        {(loading || saving) && (
          <Progress percent={progressPercent} showInfo={false} status="active" />
        )}
        {loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <Col className="gutter-row" xs={24} sm={24} md={8}>
              <Form.Item label="Фамилия" name="surname" rules={[{ required: true }]}>
                <Input
                  size="large"
                  onChange={(e: any) => setSurname(e.currentTarget.value)}
                  prefix={<UserOutlined />}
                  className="form-input"
                />
              </Form.Item>
              <Form.Item label="Имя" name="name" rules={[{ required: true }]}>
                <Input
                  size="large"
                  onChange={(e: any) => setName(e.currentTarget.value)}
                  prefix={<UserOutlined />}
                  className="form-input"
                />
              </Form.Item>
              <Form.Item label="Отчество" name="patronymic">
                <Input
                  size="large"
                  onChange={(e: any) => setPatronymic(e.currentTarget.value)}
                  prefix={<UserOutlined />}
                  className="form-input"
                />
              </Form.Item>
              {user?.id !== 1 && ( // !!! скрываем смену роли главного админа
                <Form.Item label="Роль" name="type">
                  {/* <SelectUserRoles 
                        type={user.type} 
                        setUserType={setUserType} 
                        setIsFormChanged={setIsFormChanged}
                      /> */}
                </Form.Item>
              )}
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <Input size="large" prefix={<MailOutlined />} className="form-input" />
              </Form.Item>
              <Form.Item label="Телефон" name="phone">
                <Input size="large" prefix={<MobileOutlined />} className="form-input" />
              </Form.Item>
              <Row gutter={16}>
                <Col className="gutter-row" xs={24} lg={12}>
                  <Form.Item name="enabled" label="Активен" valuePropName="checked">
                    <Switch defaultChecked={user?.enabled === 1} />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} lg={12}>
                  <Form.Item name="deleted" label="Архив (удален)" valuePropName="checked">
                    <Switch defaultChecked={user?.deleted === 1} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={8}>
              <Form.Item label="Логин" name="username" rules={[{ required: true }]}>
                <Input
                  size="large"
                  onChange={(e: any) => setUsername(e.currentTarget.value)}
                  prefix={<UserOutlined />}
                  className="form-input"
                />
              </Form.Item>
              <Form.Item label="Новый пароль" name="password">
                <Input.Password
                  size="large"
                  onChange={(e: any) => setNewPassword(e.currentTarget.value)}
                  prefix={<SecurityScanOutlined />}
                  className="form-input"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone title="Скрыть пароль" />
                    ) : (
                      <EyeInvisibleOutlined title="Показать пароль" />
                    )
                  }
                />
              </Form.Item>
            </Col>
          </>
        )}
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          {/* <FormFooter 
                    id={id}
                    isFormChanged={isFormChanged}
                    onDelete={onUserDelete}
                    path={USERS}
                /> */}
        </Col>
      </Row>

      <Prompt when={isFormChanged} message="Выйти без сохранения?" />
    </Form>
  );
};

export default withRouter(UserView);
