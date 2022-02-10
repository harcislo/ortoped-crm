import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { useHistory, withRouter, Prompt } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
// import {getAge} from '../../../../utils/dates'

import ru_RU from 'antd/es/date-picker/locale/ru_RU';
// import {getAgentExpanded, updateAgent, createAgent, deleteAgent} from '../api/agents';
// import { RouteNames } from '../../routes';
// import {emptyAgent} from '../models/agents';
import {
  Alert,
  Row,
  Col,
  Divider,
  Form,
  Input,
  Space,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Upload,
  message,
  Progress,
  Skeleton,
  Popconfirm,
} from 'antd';
import { Typography } from 'antd';
import {
  UserOutlined,
  MinusCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
  ManOutlined,
  WomanOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  TagsOutlined,
} from '@ant-design/icons';
// import {phoneTypes} from '../../../../utils/phones';
// import {emailTypes} from '../../../../utils/emails';
// import SelectCountry from '../../../directories/components/SelectCountry';
// import SelectCity from '../../../directories/components/SelectCity';
// import SelectPatients from '../../patients/components/SelectPatients';
// import SelectAgentRelationDegrees from '../../../directories/components/SelectAgentRelationDegrees';
// import FormFooter from '../../../../components/common/form/FormFooter';

const { Title } = Typography;
const { Option } = Select;

const CreateSuccessMessage = () => {
  message.success('Представитель добавлен...');
};

const UpdateSuccessMessage = () => {
  message.success('Представитель сохранен...');
};

const DeleteSuccessMessage = () => {
  message.success('Представитель удален...');
};

const UpdateWarningMessage = () => {
  message.warning('Изменения не сохранены!');
};

const CreateErrorMessage = () => {
  message.error('Не удалось добавить представителя!');
};

const UpdateErrorMessage = () => {
  message.error('Не удалось сохранить изменения!');
};

const DeleteErrorMessage = () => {
  message.error('Не удалось удалить представителя!');
};

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: any) => {
  /*const isImageFormat = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
    if (!isImageFormat) {
        message.error('Вы можете загрузить только JPG/PNG файл!');
    }*/
  const isImageSize = file.size / 1024 / 1024 < 50;
  console.log('file.size', file.size, file.size / 1024 / 1024);

  if (!isImageSize) {
    message.error('Изображение должно быть не более 50MB!');
  }
  return isImageSize; // isImageFormat &&
};

type SizeType = Parameters<typeof Form>[0]['size'];

/**
 * Карточка контрагента (доктора-партнера)
 * @returns JSX
 */
const AgentView: FC = (props: any) => {
  const { id } = props.match.params;
  const router = useHistory();
  //const { AGENTS } = RouteNames;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  //const [agent, setAgent] = useState<any | null>(emptyAgent);
  const [patientAge, setPatientAge] = useState<number | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [genderId, setGenderId] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [cityId, setCityId] = useState<string>('');
  const [country, setCountry] = useState<any | null>({
    id: 1,
    name: 'Россия',
  });

  // useEffect(() => {
  //     if( id !== 'new' ) {
  //         getAgentExpanded(id)
  //             .then(res => setAgent(res.data))
  //             .catch(err => console.log(err))
  //     } else {
  //         setAgent(emptyAgent)
  //     }
  // }, [id]);

  useEffect(() => {
    if (loading) {
      for (let i = 0; i <= 100; i++) {
        setProgressPercent(i);
      }
    }
  }, [loading]);

  // useEffect(() => {
  //     if( id !== 'new' ) {
  //         setLoading(true);
  //         getAgentExpanded(id)
  //             .then(res => setAgent(res.data))
  //             .catch(err => console.log(err))
  //             .finally(() => setLoading(false))
  //     } else {
  //         setLoading(true);
  //         setAgent(emptyAgent);
  //         setLoading(false);
  //     }
  // }, [id]);

  // useMemo(() => {
  //     form.setFieldsValue({
  //         lastName: agent.lastName,
  //         firstName: agent.firstName,
  //         patronymic: agent.patronymic,
  //         phones: agent.phones,
  //         emails: agent.emails,
  //         cityId: agent.cityId,
  //         address: agent.address,
  //         position: agent.position,
  //         comment: agent.comment,
  //         genderId: agent.genderId,
  //         birthday: moment(agent.birthday),
  //         fotoId: agent.fotoId,
  //         doctorId: agent.doctorId,
  //         partnerId: agent.partnerId,
  //         outPartnerId: agent.outPartnerId,
  //         canEmail: agent.canEmail,
  //         canCall: agent.canCall,
  //         passportSerial: agent.passportSerial,
  //         passportNumber: agent.passportNumber,
  //         passportAddress: agent.passportAddress,
  //         passportIssuedDate: agent.passportIssuedDate,
  //         passportIssuedByTitle: agent.passportIssuedByTitle,
  //         passportIssuedByCode: agent.passportIssuedByCode,
  //         workPlace: agent.workPlace,
  //         socsites: agent.socsites,
  //         sourceId: agent.sourceId,
  //         dateCreated: moment(agent.dateCreated),
  //         clinicId: agent.clinicId,
  //         outpatientCardNo: agent.outpatientCardNo,
  //         lifeAnamnesis: agent.lifeAnamnesis,
  //         commonStatus: agent.commonStatus,
  //         role: agent.role,
  //         created: moment(agent.created),
  //         //deleted: agent.deleted,
  //         //phone: agent.phone,
  //         patientId: agent.patientId,
  //         relationDegreeId: agent.relationDegreeId
  //      });
  // }, [agent, form]);

  // useEffect(() => {
  //     setFirstName(agent.firstName);
  //     setLastName(agent.lastName);
  //     setPatronymic(agent.patronymic);
  //     setGenderId(agent.genderId);
  // }, [agent]);

  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const onFormLayoutChange = (e: any, { size }: { size: SizeType }) => {
    setComponentSize(size);
    console.log('onFormLayoutChange', e);
    setIsFormChanged(true);
  };

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setAvatarLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url: any) => {
        setImageUrl(url);
        setAvatarLoading(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );

  const onFormFinish = (values: any) => {
    // const result = {};
    // const filteredValues = Object.entries(values).filter(function ([key, value]) {
    //     return value !== undefined;
    // });
    // filteredValues.forEach(val => result[val[0]] = val[1])
    // setSaving(true);
    // //console.log('onFormFinish Received values of form:', values, result);
    // if( id === 'new' ) {
    //     createAgent(result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             CreateSuccessMessage();
    //             console.log('agent created success', res);
    //         })
    //         .catch(err => {
    //             CreateErrorMessage();
    //             console.log('agent create error',err);
    //         });
    // } else {
    //     updateAgent(id, result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             UpdateSuccessMessage();
    //             console.log('agent updated success', res);
    //         })
    //         .catch(err => {
    //             UpdateErrorMessage();
    //             console.log('agent update error',err);
    //         })
    // }
  };

  const onAgentDelete = () => {
    // setSaving(true);
    // deleteAgent(id)
    //     .then(res => {
    //         setIsFormChanged(false);
    //         setSaving(false);
    //         DeleteSuccessMessage();
    //         console.log('agent deleted success', res);
    //     })
    //     .catch(err => {
    //         DeleteErrorMessage();
    //         console.log('agent delete error',err);
    //     })
  };

  // загрузка аватара, если нужна...
  /*const uploadFilesProps = {
        name: 'file',
        //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info: any) {
          if (info.file.status !== 'uploading') {
            console.log('uploadFilesProps', info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} файл загружен`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} ошибка загрузки файла.`);
          }
        },
    };*/

  //const [sourceOptions, setSourceOptions] = useState<{ value: string }[]>([]);

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
            {/* {
                            id !== 'new' ?
                            (
                                agent.deleted === 1 ?
                                <del>{`${lastName && lastName} ${firstName && firstName} ${patronymic && patronymic}`}</del> :
                                <span>{`${lastName && lastName} ${firstName && firstName} ${patronymic && patronymic}`}</span>
                            ) :
                            <span>Новый представитель</span>
                        } */}
            {isFormChanged && (
              <Alert
                style={{ fontWeight: 300, fontSize: '13px' }}
                message="Изменения не сохранены..."
                type="warning"
                showIcon
              />
            )}
            <Space style={{ marginBottom: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                title="Сохранить"
                className="btn-blue"
                disabled={!isFormChanged}
              >
                <SaveOutlined /> Сохранить
              </Button>
              <Button
                type="default"
                htmlType="button"
                //onClick={() => router.push(AGENTS)}
                title="Назад"
              >
                <ArrowLeftOutlined />
              </Button>
              {id !== 'new' && (
                <Popconfirm title="Удалить?" onConfirm={onAgentDelete} okText="Да" cancelText="Нет">
                  <Button type="primary" htmlType="button" danger>
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </Title>
          {(loading || saving) && (
            <Progress percent={progressPercent} showInfo={false} status="active" />
          )}
          {loading ? (
            <>
              <Skeleton active />
              <Skeleton active />
            </>
          ) : (
            <Row gutter={16}>
              <Col className="gutter-row" xs={24} sm={24} md={24} lg={9} xl={9}>
                <Row gutter={16}>
                  <Col className="gutter-row" xs={24} sm={8} md={8} lg={8} xl={6}>
                    <Form.Item label="Фото">
                      <Upload
                        name="fotoId"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        {imageUrl ? (
                          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={14} md={16} lg={16} xl={18}>
                    <Form.Item label="Фамилия" name="lastName" rules={[{ required: true }]}>
                      <Input
                        size="large"
                        onChange={(e: any) => setLastName(e.currentTarget.value)}
                        prefix={<UserOutlined />}
                        className="form-input"
                      />
                    </Form.Item>

                    <Form.Item label="Имя" name="firstName" rules={[{ required: true }]}>
                      <Input
                        size="large"
                        onChange={(e: any) => setFirstName(e.currentTarget.value)}
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

                    <Form.Item label="Пациент" name="patientId">
                      {/* <SelectPatients setPatientId={setPatientId} /> */}
                    </Form.Item>

                    <Form.Item label="Степень родства" name="relationDegreeId">
                      {/* <SelectAgentRelationDegrees /> */}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col className="gutter-row" xs={24} sm={24} md={24} lg={7} xl={7}>
                <Row gutter={16}>
                  <Col className="gutter-row" xs={24} sm={24} md={10} lg={8} xl={10}>
                    <Form.Item label="Страна">
                      {/* <SelectCountry setCountry={setCountry} /> */}
                    </Form.Item>
                  </Col>
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: '2px' }}
                    xs={24}
                    sm={24}
                    md={10}
                    lg={8}
                    xl={14}
                  >
                    <Form.Item label="Город" name="citiId">
                      {/* <SelectCity country={country} setCityId={setCityId} /> */}
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} sm={24} md={12} lg={16} xl={24}>
                    <Form.Item label="Адрес" name="address">
                      <Input size="large" prefix={<EnvironmentOutlined />} className="form-input" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Профессия" name="position">
                  <Input size="large" prefix={<EnvironmentOutlined />} className="form-input" />
                </Form.Item>

                <Form.Item label="Заметка" name="comment">
                  <Input.TextArea
                    rows={5}
                    size="large"
                    className="form-input"
                    placeholder="Заметка"
                  />
                </Form.Item>
              </Col>

              <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>
                <h4>Телефоны</h4>

                <Form.List name="phones">
                  {(phones, { add, remove }) => (
                    <div style={{ margin: '0 auto', maxWidth: 760 }}>
                      {/**@ts-ignore */}
                      {phones.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="center"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            fieldKey={[fieldKey, 'type']}
                            rules={[{ required: true, message: 'Не указан тип телефона' }]}
                          >
                            {/* <Select size="large" defaultValue={phoneTypes[0].label}>
                                                        {(phoneTypes.map(item => (
                                                            <Option 
                                                                key={item.value} 
                                                                value={item.value}
                                                            >
                                                                {item.label}
                                                            </Option>
                                                        )))
                                                        }
                                                    </Select> */}
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'phone']}
                            fieldKey={[fieldKey, 'phone']}
                            rules={[{ required: true, message: 'Не указан номер' }]}
                          >
                            <Input placeholder="Номер" size="large" className="form-input" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="primary"
                          style={{ maxWidth: '230px' }}
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                          className="btn-blue"
                        >
                          Добавить телефон
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>

                <h4>Адреса Email</h4>

                <Form.List name="emails">
                  {(emails, { add, remove }) => (
                    <div style={{ margin: '0 auto', maxWidth: 760 }}>
                      {/**@ts-ignore */}
                      {emails.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="center"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            fieldKey={[fieldKey, 'type']}
                            rules={[{ required: true, message: 'Не указан тип Email' }]}
                          >
                            {/* <Select size="large" defaultValue={emailTypes[0].label}>
                                                        {(emailTypes.map(item => (
                                                            <Option 
                                                                key={item.value} 
                                                                value={item.value}
                                                            >
                                                                {item.label}
                                                            </Option>
                                                        )))
                                                        }
                                                    </Select> */}
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'email']}
                            fieldKey={[fieldKey, 'email']}
                            rules={[{ required: true, message: 'Не указан Email' }]}
                          >
                            <Input placeholder="Email" size="large" className="form-input" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="primary"
                          style={{ maxWidth: '230px' }}
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                          className="btn-blue"
                        >
                          Добавить Email
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>

                <Form.Item label="Роль" name="role" hidden>
                  <Input size="large" className="form-input" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          {/* <FormFooter 
                        id={id}
                        isFormChanged={isFormChanged}
                        onDelete={onAgentDelete}
                        path={AGENTS}
                    /> */}
        </Col>
      </Row>

      <Prompt when={isFormChanged} message="Выйти без сохранения?" />
    </Form>
  );
};

export default withRouter(AgentView);
