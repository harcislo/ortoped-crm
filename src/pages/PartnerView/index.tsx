import React, { FC, useState, useEffect, useMemo } from 'react';
import { useHistory, withRouter, Prompt } from 'react-router';
// import {getPartnerExpanded, updatePartner, createPartner, deletePartner} from '../api/partners';
// import { RouteNames } from '../../routes';
// import {emptyPartner} from '../models/partners';
import {
  Alert,
  Row,
  Col,
  Form,
  Input,
  Space,
  Button,
  Select,
  message,
  Progress,
  Skeleton,
  Popconfirm,
} from 'antd';
import { Typography } from 'antd';
import {
  UserOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
// import {phoneTypes} from '../../../../utils/phones';
// import {emailTypes} from '../../../../utils/emails';
// import SelectPatients from '../../patients/components/SelectPatients';
// import SelectDoctors from '../../patients/components/SelectDoctors';
// import FormFooter from '../../../../components/common/form/FormFooter';

const { Title } = Typography;
const { Option } = Select;

const CreateSuccessMessage = () => {
  message.success('Контрагент добавлен...');
};

const UpdateSuccessMessage = () => {
  message.success('Контрагент сохранен...');
};

const DeleteSuccessMessage = () => {
  message.success('Контрагент удален...');
};

const UpdateWarningMessage = () => {
  message.warning('Изменения не сохранены!');
};

const CreateErrorMessage = () => {
  message.error('Не удалось добавить контрагента!');
};

const UpdateErrorMessage = () => {
  message.error('Не удалось сохранить изменения!');
};

const DeleteErrorMessage = () => {
  message.error('Не удалось удалить контрагента!');
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
const PartnerView: FC = (props: any) => {
  const { id } = props.match.params;
  const router = useHistory();
  //const { PARTNERS } = RouteNames;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  //const [partner, setPartner] = useState<any | null>(emptyPartner);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');

  const [doctorId, setDoctorId] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');

  useEffect(() => {
    if (loading) {
      for (let i = 0; i <= 100; i++) {
        setProgressPercent(i);
      }
    }
  }, [loading]);

  // useEffect(() => {
  //     if( id !== 'new' ) {
  //         getPartnerExpanded(id)
  //             .then(res => setPartner(res.data))
  //             .catch(err => console.log(err))
  //     } else {
  //         setPartner(emptyPartner)
  //     }
  // }, [id]);

  // useEffect(() => {
  //     if( id !== 'new' ) {
  //         setLoading(true);
  //         getPartnerExpanded(id)
  //             .then(res => setPartner(res.data))
  //             .catch(err => console.log(err))
  //             .finally(() => setLoading(false))
  //     } else {
  //         setLoading(true);
  //         setPartner(emptyPartner);
  //         setLoading(false);
  //     }
  // }, [id]);

  // useMemo(() => {
  //     form.setFieldsValue({
  //         lastName: partner.lastName,
  //         firstName: partner.firstName,
  //         patronymic: partner.patronymic,
  //         phones: partner.phones,
  //         emails: partner.emails,
  //         address: partner.address,
  //         position: partner.position,
  //         comment: partner.comment,
  //         doctorId: partner.doctorId,
  //         partnerId: partner.partnerId,
  //         outPartnerId: partner.outPartnerId,
  //         workPlace: partner.workPlace,
  //         clinicId: partner.clinicId,
  //         role: partner.role,
  //         patientId: partner.patientId,
  //         relationDegreeId: partner.relationDegreeId
  //      });
  // }, [partner, form]);

  // useEffect(() => {
  //     setFirstName(partner.firstName);
  //     setLastName(partner.lastName);
  //     setPatronymic(partner.patronymic);
  // }, [partner]);

  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const onFormLayoutChange = (e: any, { size }: { size: SizeType }) => {
    setComponentSize(size);
    console.log('onFormLayoutChange', e);
    setIsFormChanged(true);
  };

  const onFormFinish = (values: any) => {
    // const result = {};
    // const filteredValues = Object.entries(values).filter(function ([key, value]) {
    //     return value !== undefined;
    // });
    // filteredValues.forEach(val => result[val[0]] = val[1])
    // setSaving(true);
    // console.log('onFormFinish Received values of form:', values, result);
    // if( id === 'new' ) {
    //     createPartner(result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             CreateSuccessMessage();
    //             console.log('partner created success', res);
    //         })
    //         .catch(err => {
    //             CreateErrorMessage();
    //             console.log('partner create error',err);
    //         });
    // } else {
    //     updatePartner(id, result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             UpdateSuccessMessage();
    //             console.log('partner updated success', res);
    //         })
    //         .catch(err => {
    //             UpdateErrorMessage();
    //             console.log('partner update error',err);
    //         })
    // }
  };

  /*const [sourceOptions, setSourceOptions] = useState<{ value: string }[]>([]);
	}*/

  // const onPartnerDelete = () => {
  //     setSaving(true);
  //     deletePartner(id)
  //         .then(res => {
  //             setIsFormChanged(false);
  //             setSaving(false);
  //             DeleteSuccessMessage();
  //             console.log('partner deleted success', res);
  //         })
  //         .catch(err => {
  //             DeleteErrorMessage();
  //             console.log('partner delete error',err);
  //         })
  // };

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
              partner.deleted === 1 ?
              <del>{`${lastName && lastName} ${firstName && firstName} ${patronymic && patronymic}`}</del> :
              <span>{`${lastName && lastName} ${firstName && firstName} ${patronymic && patronymic}`}</span>
            ) :
            <span>Новый контрагент</span>
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
                //onClick={() => router.push(PARTNERS)}
                title="Назад"
              >
                <ArrowLeftOutlined />
              </Button>
              {id !== 'new' && (
                <Popconfirm
                  title="Удалить?"
                  //onConfirm={onPartnerDelete}
                  okText="Да"
                  cancelText="Нет"
                >
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
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
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
              </Col>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item label="Адрес" name="address">
                  <Input size="large" prefix={<EnvironmentOutlined />} className="form-input" />
                </Form.Item>
                <Form.Item label="Место работы" name="workPlace">
                  <Input size="large" prefix={<EnvironmentOutlined />} className="form-input" />
                </Form.Item>
                <Form.Item label="Должность" name="position">
                  <Input size="large" prefix={<MedicineBoxOutlined />} className="form-input" />
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item label="Врач" name="doctorId">
                  {/* <SelectDoctors setDoctorId={setDoctorId} /> */}
                </Form.Item>
                <Form.Item label="Вид партнерства" name="outPartnerId">
                  <Select
                    onChange={() => console.log('Входящий/Исходящий')}
                    size="large"
                    className="form-select"
                    placeholder=""
                  >
                    <Select.Option value="1">Входящий (платит нам)</Select.Option>
                    <Select.Option value="2">Исходящий (мы платим)</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Пациент" name="patientId">
                  {/* <SelectPatients setPatientId={setPatientId} /> */}
                </Form.Item>
              </Col>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
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
                            style={{ width: '160px' }}
                          >
                            <Select size="large">
                              {/* {(phoneTypes.map(item => (
                              <Option 
                                key={item.value} 
                                value={item.value}
                              >
                                {item.label}
                              </Option>
                            )))
                            } */}
                            </Select>
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
              </Col>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
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
                            style={{ width: '160px' }}
                          >
                            <Select size="large">
                              {/* {(emailTypes.map(item => (
                                  <Option 
                                      key={item.value} 
                                      value={item.value}
                                  >
                                      {item.label}
                                  </Option>
                              )))
                              } */}
                            </Select>
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
              </Col>
              <Col className="gutter-row" xs={24} sm={24} md={12} lg={8} xl={8}>
                <Form.Item label="Комментарий" name="comment">
                  <Input.TextArea
                    rows={4}
                    size="large"
                    className="form-input"
                    placeholder="Комментарий"
                  />
                </Form.Item>
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
          onDelete={onPartnerDelete}
          path={PARTNERS}
        /> */}
        </Col>
      </Row>
      <Prompt when={isFormChanged} message="Выйти без сохранения?" />
    </Form>
  );
};

export default withRouter(PartnerView);
