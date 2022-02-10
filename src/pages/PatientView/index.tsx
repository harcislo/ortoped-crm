import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { useHistory, withRouter, Prompt } from 'react-router';
import moment from 'moment';
// import {getAge} from '../../../../utils/dates'
import 'moment/locale/ru';
import ru_RU from 'antd/es/date-picker/locale/ru_RU';
// import {getPatientExpanded, updatePatient, createPatient, deletePatient} from '../api/patients';
import { ROUTE_NAME } from '../../navigation/routeNames';
// import {emptyPatient} from '../models/patient'
import {
  Alert,
  Row,
  Col,
  Form,
  Input,
  Space,
  Button,
  Radio,
  Select,
  DatePicker,
  Switch,
  Upload,
  message,
  Progress,
  Skeleton,
  Popconfirm,
  Typography,
} from 'antd';
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
  LinkOutlined,
} from '@ant-design/icons';
//import JoditEditor from "jodit-react";
// import {phoneTypes} from '../../../../utils/phones';
// import {emailTypes} from '../../../../utils/emails';
// import SelectDoctors from '../components/SelectDoctors';
// import SelectCountry from '../../../directories/components/SelectCountry';
// import SelectCity from '../../../directories/components/SelectCity';
// import SelectPatientTag from '../../../directories/components/SelectPatientTag';
// import SelectPatientSource from '../../../directories/components/SelectPatientSource';
// import SelectPartners from '../../partners/components/SelectPartners';
// import SelectAgents from '../../agents/components/SelectAgents';
// import FormFooter from '../../../../components/common/form/FormFooter';

const { Title } = Typography;
const { Option } = Select;

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
  return isImageSize;
};

type SizeType = Parameters<typeof Form>[0]['size'];

// /**
//  * Карточка пациента
//  * @returns JSX
//  */
const PatientView: FC = (props: any) => {
  const { id } = props.match.params;
  const history = useHistory();
  const [form] = Form.useForm();

  // const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  //
  //const [patient, setPatient] = useState<any | null>(emptyPatient);
  const [patientAge, setPatientAge] = useState<number | null>(null);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [country, setCountry] = useState<any | null>({
    // hardcore
    id: 1,
    name: 'Россия',
  });
  const [cityId, setCityId] = useState<string>('');
  const [doctorId, setDoctorId] = useState<string>('');
  const [partnerId, setPartnerId] = useState<string>('');
  const [agentId, setAgentId] = useState<string>('');
  const [genderId, setGenderId] = useState<string>('');

  // useEffect(() => {
  //     if( loading ) {
  //         for( let i = 0; i <= 100; i++) {
  //             setProgressPercent(i);
  //         }
  //     }
  // }, [loading]);

  useEffect(() => {
    if (id !== 'new') {
      // getPatientExpanded(id)
      // 		.then(res => setPatient(res.data))
      // 		.catch(err => console.log(err))
      // 		.finally(() => setLoading(false))
    } else {
      // setPatient(emptyPatient);
    }
  }, [id]);

  // useMemo(() => {
  //     form.setFieldsValue({
  //         lastName: patient.lastName,
  //         firstName: patient.firstName,
  //         patronymic: patient.patronymic,
  //         phones: patient.phones,
  //         emails: patient.emails,
  //         cityId: patient.cityId,
  //         address: patient.address,
  //         position: patient.position,
  //         comment: patient.comment,
  //         genderId: patient.genderId,
  //         birthday: moment(patient.birthday),
  //         fotoId: patient.fotoId,
  //         doctorId: patient.doctorId,
  //         partnerId: patient.partnerId,
  //         outPartnerId: patient.outPartnerId,
  //         canEmail: patient.canEmail,
  //         canCall: patient.canCall,
  //         passportSerial: patient.passportSerial,
  //         passportNumber: patient.passportNumber,
  //         passportAddress: patient.passportAddress,
  //         passportIssuedDate: patient.passportIssuedDate,
  //         passportIssuedByTitle: patient.passportIssuedByTitle,
  //         passportIssuedByCode: patient.passportIssuedByCode,
  //         workPlace: patient.workPlace,
  //         socsites: patient.socsites,
  //         sourceId: patient.sourceId,
  //         dateCreated: moment(patient.dateCreated),
  //         clinicId: patient.clinicId,
  //         outpatientCardNo: patient.outpatientCardNo,
  //         lifeAnamnesis: patient.lifeAnamnesis,
  //         commonStatus: patient.commonStatus,
  //         role: patient.role,
  //         created: moment(patient.created),
  //         //deleted: patient.deleted,
  //         //phone: patient.phone,
  //         patientId: patient.patientId,
  //         relationDegreeId: patient.relationDegreeId
  //      });
  // }, [patient, form]);

  // useEffect(() => {
  //     setFirstName(patient.firstName);
  //     setLastName(patient.lastName);
  //     setPatronymic(patient.patronymic);
  //     setGenderId(patient.genderId);
  // }, [patient]);

  // const [avatarLoading, setAvatarLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState('');

  // const handleChange = (info: any) => {
  //     if (info.file.status === 'uploading') {
  //         setAvatarLoading(true);
  //         return;
  //     }
  //     if (info.file.status === 'done') {
  //         // Get this url from response in real world.
  //         getBase64(info.file.originFileObj, (url: any) => {
  //             setImageUrl(url);
  //             setAvatarLoading(false);
  //         }
  //       );
  //     }
  // };

  // const uploadButton = (
  //     <div>
  //         {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
  //         <div style={{ marginTop: 8 }}>Загрузить</div>
  //     </div>
  // );

  const onFormFinish = (values: any) => {
    console.log(values);
    // const result = {};
    // const filteredValues = Object.entries(values).filter(function ([key, value]) {
    //     return value !== undefined;
    // });

    //filteredValues.forEach(val => result[val[0]] = val[1])

    //setSaving(true);
    //console.log('onFormFinish Received values of form:', values, result);

    // if( id === 'new' ) {
    //     createPatient(result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             CreateSuccessMessage();
    //             console.log('patient created success', res);
    //         })
    //         .catch(err => {
    //             CreateErrorMessage();
    //             console.log('patient create error',err);
    //         });
    // } else {
    //     updatePatient(id, result)
    //         .then(res => {
    //             setIsFormChanged(false);
    //             setSaving(false);
    //             UpdateSuccessMessage();
    //             console.log('patient updated success', res);
    //         })
    //         .catch(err => {
    //             UpdateErrorMessage();
    //             console.log('patient update error',err);
    //         })
    // }
  };

  // const onPatientDelete = () => {
  //     setSaving(true);
  //     deletePatient(id)
  //         .then(res => {
  //             setIsFormChanged(false);
  //             setSaving(false);
  //             DeleteSuccessMessage();
  //             console.log('patient deleted success', res);
  //         })
  //         .catch(err => {
  //             DeleteErrorMessage();
  //             console.log('patient delete error',err);
  //         })
  // };

  // const TAGS = [];
  // const [selectedTags, setSelectedTags] = useState<any | never>(patient.tags);
  // const filteredTags = TAGS.filter((e: any | never) => !selectedTags.includes(e));
  // const handleSelectTags = (selectedItems: any) => {
  //     setSelectedTags(selectedItems);
  // };

  // загрузка аватара - доработать...
  // сначала сохранять картинку, потом сохранять запись
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

  const editorLifeAnamnesis = useRef(null);
  const [contentLifeAnamnesis, setContentLifeAnamnesis] = useState('');

  const configLifeAnamnesis = {
    readonly: false,
    allowResizeX: true,
    allowResizeY: true,
  };

  const editorCommonStatus = useRef(null);
  const [contentCommonStatus, setContentCommonStatus] = useState('');

  const configCommonStatus = {
    readonly: false,
    allowResizeX: true,
    allowResizeY: true,
  };

  return (
    <div>FORM</div>
    // <Form
    // 	form={form}
    // 	labelCol={{ span: 24 }}
    // 	wrapperCol={{ span: 24 }}
    // 	layout="vertical"
    // 	//onValuesChange={onFormLayoutChange}
    // 	onFinish={onFormFinish}
    // >
    //   <Row gutter={16}>
    //     <Col className="gutter-row" span={24}>
    //       <Title level={3} type="secondary" className="form-title">
    //                     {
    //                         id !== 'new' ?
    //                         (
    //                             patient.deleted === 1 ?
    //                             <del>{`${lastName && lastName} ${firstName && firstName} ${patronymic && patronymic}`}</del> :
    //                             <span>{`${lastName && lastName} ${firstName && firstName} ${patronymic && patronymic}`}</span>
    //                         ) :
    //                         <span>Новый пациент</span>
    //                     }
    //                     {
    //                         isFormChanged &&
    //                         <Alert
    //                             style={{fontWeight:300,fontSize:"13px"}}
    //                             message="Изменения не сохранены..."
    //                             type="warning"
    //                             showIcon
    //                         />
    //                     }
    //                     <Space style={{ marginBottom: 8 }}>
    //                         <Button
    //                             type="primary"
    //                             htmlType="submit"
    //                             title="Сохранить"
    //                             className="btn-blue"
    //                             disabled={!isFormChanged}
    //                         >
    //                             <SaveOutlined /> Сохранить
    //                         </Button>
    //                         <Button
    //                             type="default"
    //                             htmlType="button"
    //                             onClick={() => router.push(PATIENTS)}
    //                             title="Назад"
    //                         >
    //                             <ArrowLeftOutlined />
    //                         </Button>
    //                         {
    //                             id !== 'new' &&
    //                             <Popconfirm
    //                                 title="Удалить?"
    //                                 onConfirm={onPatientDelete}
    //                                 okText="Да"
    //                                 cancelText="Нет"
    //                             >
    //                                 <Button
    //                                     type="primary"
    //                                     htmlType="button"
    //                                     danger
    //                                 >
    //                                     <DeleteOutlined />
    //                                 </Button>
    //                             </Popconfirm>
    //                         }
    //                     </Space>
    //                 </Title>
    //                 {
    //                 (loading || saving) &&
    //                     <Progress percent={progressPercent} showInfo={false} status="active" />
    //                 }
    //                 {
    //                     loading ?
    //                     <>
    //                         <Skeleton active />
    //                         <Skeleton active />
    //                     </> :
    //                     <Row gutter={16}>
    //                         <Col className="gutter-row" xs={24} sm={24} md={24} lg={9} xl={9}>
    //                             <Row gutter={16}>
    //                                 <Col className="gutter-row" xs={24} sm={8} md={8} lg={8} xl={6}>
    //                                     <Form.Item label="Фото">
    //                                         <Upload
    //                                             name="fotoId"
    //                                             listType="picture-card"
    //                                             className="avatar-uploader"
    //                                             showUploadList={false}
    //                                             //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    //                                             beforeUpload={beforeUpload}
    //                                             onChange={handleChange}
    //                                         >
    //                                             {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    //                                         </Upload>
    //                                     </Form.Item>
    //                                 </Col>
    //                                 <Col className="gutter-row" xs={24} sm={14} md={16} lg={16} xl={18}>
    //                                     <Form.Item label="Фамилия" name="lastName" rules={[{ required: true }]}>
    //                                         <Input
    //                                             size="large"
    //                                             prefix={<UserOutlined />}
    //                                             className="form-input"
    //                                         />
    //                                     </Form.Item>

    //                                     <Form.Item label="Имя" name="firstName" rules={[{ required: true }]}>
    //                                         <Input
    //                                             size="large"
    //                                             prefix={<UserOutlined />}
    //                                             className="form-input"
    //                                         />
    //                                     </Form.Item>

    //                                     <Form.Item label="Отчество" name="patronymic">
    //                                         <Input
    //                                             size="large"
    //                                             prefix={<UserOutlined />}
    //                                             className="form-input"
    //                                         />
    //                                     </Form.Item>

    //                                     <Row gutter={16}>
    //                                         <Col className="gutter-row" xs={24} xl={12}>
    //                                             <Form.Item label="Дата регистрации" name="created">
    //                                                 <DatePicker
    //                                                     defaultPickerValue={
    //                                                         // доработать,
    //                                                         moment(new Date(patient.created))
    //                                                     }
    //                                                     locale={ru_RU}
    //                                                     format="DD.MM.YYYY"
    //                                                     showToday
    //                                                     size="large"
    //                                                     className="form-input"
    //                                                     bordered
    //                                                     onChange={(e: any) => console.log('onChange created',moment(new Date(e._d)).format('DD.MM.YYYY HH:MM:SS').toString())}
    //                                                     onSelect={(e: any) => console.log('onSelect created',moment(patient.created).format('DD.MM.YYYY').toString())}
    //                                                 />
    //                                             </Form.Item>
    //                                         </Col>
    //                                         <Col className="gutter-row" xs={24} xl={12}>
    //                                             <Form.Item
    //                                                 label="Дата рождения"
    //                                                 name="birthday"
    //                                                 //rules={[{ required: true, message: 'Не указана дата рождения' }]}
    //                                             >
    //                                                 <DatePicker
    //                                                     defaultPickerValue={
    //                                                         patient.birthday !== "" ? moment(new Date(patient.birthday))  : undefined
    //                                                     }
    //                                                     locale={ru_RU}
    //                                                     format="DD.MM.YYYY"
    //                                                     showToday
    //                                                     size="large"
    //                                                     className="form-input"
    //                                                     bordered
    //                                                     onChange={(e: any) => {
    //                                                         if(e) {
    //                                                             const birthdate = moment(new Date(e._d)).format('DD.MM.YYYY HH:MM:SS').toString();
    //                                                             const age = getAge(birthdate);
    //                                                             setPatientAge(age);
    //                                                             console.log('onChange', birthdate, age);
    //                                                         }

    //                                                     }}
    //                                                     onSelect={(e: any) => {
    //                                                         if(e) {
    //                                                             const birthdate = moment(new Date(e._d)).format('DD.MM.YYYY HH:MM:SS').toString();
    //                                                             const age = getAge(birthdate);
    //                                                             setPatientAge(age);
    //                                                             console.log('onSelect', birthdate, age);
    //                                                         }

    //                                                     }}
    //                                                 />
    //                                                 {
    //                                                     patientAge &&
    //                                                     <span className="ml-3 text-dark">Возраст: <b>{patientAge}</b></span>
    //                                                 }
    //                                             </Form.Item>
    //                                         </Col>
    //                                     </Row>

    //                                     <Form.Item
    //                                         label={`Пол ${genderId === "" ? "(не выбран)" : ""}`}
    //                                         name="genderId"
    //                                         style={{marginTop: "-2px"}}
    //                                     >
    //                                         <Radio.Group
    //                                             buttonStyle="solid"
    //                                             size="large"
    //                                             onChange={(e: any) => setGenderId(e.target.value)}
    //                                         >
    //                                             <Radio.Button value="1"><ManOutlined /> Муж</Radio.Button>
    //                                             <Radio.Button value="2"><WomanOutlined /> Жен</Radio.Button>
    //                                         </Radio.Group>
    //                                     </Form.Item>

    //                                     <Form.Item label="Лечащий врач" name="doctorId">
    //                                         <SelectDoctors setDoctorId={setDoctorId} />
    //                                     </Form.Item>

    //                                     <Form.Item label="Представитель" name="patientId">
    //                                         <SelectAgents setAgentId={setAgentId} />
    //                                     </Form.Item>

    //                                     <Form.Item label="Контрагент" name="partnerId">
    //                                         <SelectPartners setPartnerId={setPartnerId} />
    //                                     </Form.Item>
    //                                 </Col>
    //                             </Row>
    //                         </Col>

    //                         <Col className="gutter-row" xs={24} sm={24} md={24} lg={7} xl={7}>
    //                             <Row gutter={16}>
    //                                 <Col className="gutter-row" xs={24} sm={24} md={10} lg={8} xl={10}>
    //                                     <Form.Item label="Страна">
    //                                         <SelectCountry setCountry={setCountry} />
    //                                     </Form.Item>
    //                                 </Col>
    //                                 <Col className="gutter-row" style={{marginBottom:"2px"}} xs={24} sm={24} md={10} lg={8} xl={14}>
    //                                     <Form.Item label="Город" name="citiId">
    //                                         <SelectCity country={country} setCityId={setCityId} />
    //                                     </Form.Item>
    //                                 </Col>
    //                                 <Col className="gutter-row" xs={24} sm={24} md={12} lg={16} xl={24}>
    //                                     <Form.Item label="Адрес" name="address">
    //                                         <Input
    //                                             size="large"
    //                                             prefix={<EnvironmentOutlined />}
    //                                             className="form-input"
    //                                         />
    //                                     </Form.Item>
    //                                 </Col>
    //                             </Row>

    //                             <Form.Item label="Место работы/учёбы" name="workPlace">
    //                                 <Input
    //                                     size="large"
    //                                     prefix={<EnvironmentOutlined />}
    //                                     className="form-input"
    //                                 />
    //                             </Form.Item>

    //                             <Form.Item label="Профессия" name="position">
    //                                 <Input
    //                                     size="large"
    //                                     prefix={<EnvironmentOutlined />}
    //                                     className="form-input"
    //                                 />
    //                             </Form.Item>

    //                             <Form.Item label="Статус" name="statusId">
    //                                 <SelectPatientTag />
    //                             </Form.Item>

    //                             <Form.Item label="Откуда узнали о нас" name="sourceId">
    //                                 <SelectPatientSource />
    //                             </Form.Item>

    //                             <Form.Item label="Теги" name="tags">
    //                                 <Input
    //                                     size="large"
    //                                     prefix={<TagsOutlined />}
    //                                     className="form-input"
    //                                 />
    //                                 <Select
    //                                     mode="multiple"
    //                                     size="large"
    //                                     placeholder="Теги"
    //                                     value={selectedTags}
    //                                     onChange={handleSelectTags}
    //                                     style={{ width: '100%' }}
    //                                 >
    //                                     {filteredTags.map((item: any) => (
    //                                         <Select.Option key={item} value={item}>
    //                                             {item}
    //                                         </Select.Option>
    //                                     ))}
    //                                 </Select>
    //                             </Form.Item>

    //                             <Form.Item label="Заметка" name="comment">
    //                                 <Input.TextArea
    //                                     rows={4}
    //                                     size="large"
    //                                     className="form-input"
    //                                     placeholder="Заметка"
    //                                 />
    //                             </Form.Item>

    //                         </Col>

    //                         <Col className="gutter-row" xs={24} sm={24} md={24} lg={8} xl={8}>

    //                             <h4>Телефоны</h4>

    //                             <Form.List name="phones">
    //                                 {(phones, { add, remove }) => (
    //                                 <div style={{margin: '0 auto', maxWidth: 760}}>
    //                                     {phones.map(({ key, name, fieldKey, ...restField }) => (
    //                                         <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
    //                                             <Form.Item
    //                                                 {...restField}
    //                                                 name={[name, 'type']}
    //                                                 fieldKey={[fieldKey, 'type']}
    //                                                 rules={[{ required: true, message: 'Не указан тип телефона' }]}
    //                                                 style={{width:"152px"}}
    //                                             >
    //                                                 <Select
    //                                                     size="large"
    //                                                     //defaultValue={phoneTypes[0].label}
    //                                                 >
    //                                                     {(phoneTypes.map(item => (
    //                                                         <Option
    //                                                             key={item.value}
    //                                                             value={item.value}
    //                                                         >
    //                                                             {item.label}
    //                                                         </Option>
    //                                                     )))
    //                                                     }
    //                                                 </Select>
    //                                             </Form.Item>
    //                                             <Form.Item
    //                                                 {...restField}
    //                                                 name={[name, 'phone']}
    //                                                 fieldKey={[fieldKey, 'phone']}
    //                                                 rules={[{ required: true, message: 'Не указан номер' }]}
    //                                             >
    //                                                 <Input placeholder="Номер" size="large" className="form-input" />
    //                                             </Form.Item>
    //                                             <MinusCircleOutlined onClick={() => remove(name)} />
    //                                         </Space>
    //                                     ))}
    //                                     <Form.Item>
    //                                         <Button
    //                                             type="primary"
    //                                             style={{maxWidth:"230px"}}
    //                                             onClick={() => add()}
    //                                             block
    //                                             icon={<PlusOutlined />}
    //                                             className="btn-blue"
    //                                         >
    //                                             Добавить телефон
    //                                         </Button>
    //                                     </Form.Item>
    //                                 </div>
    //                                 )}
    //                             </Form.List>

    //                             <Form.Item name="canCall" label="Разрешить звонки" valuePropName="checked">
    //                                 <Switch defaultChecked />
    //                             </Form.Item>

    //                             <h4>Адреса Email</h4>

    //                             <Form.List name="emails">

    //                                 {(emails, { add, remove }) => (
    //                                 <div style={{margin: '0 auto', maxWidth: 760}}>
    //                                     {emails.map(({ key, name, fieldKey, ...restField }) => (
    //                                         <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
    //                                             <Form.Item
    //                                                 {...restField}
    //                                                 name={[name, 'type']}
    //                                                 fieldKey={[fieldKey, 'type']}
    //                                                 rules={[{ required: true, message: 'Не указан тип Email' }]}
    //                                                 style={{width:"152px"}}
    //                                             >
    //                                                 <Select
    //                                                     size="large"
    //                                                     //defaultValue={emailTypes[0].label}
    //                                                 >
    //                                                     {(emailTypes.map(item => (
    //                                                         <Option
    //                                                             key={item.value}
    //                                                             value={item.value}
    //                                                         >
    //                                                             {item.label}
    //                                                         </Option>
    //                                                     )))
    //                                                     }
    //                                                 </Select>
    //                                             </Form.Item>
    //                                             <Form.Item
    //                                                 {...restField}
    //                                                 name={[name, 'email']}
    //                                                 fieldKey={[fieldKey, 'email']}
    //                                                 rules={[{ required: true, message: 'Не указан Email' }]}
    //                                             >
    //                                                 <Input placeholder="Email" size="large" className="form-input" />
    //                                             </Form.Item>
    //                                             <MinusCircleOutlined onClick={() => remove(name)} />
    //                                         </Space>
    //                                     ))}
    //                                     <Form.Item>
    //                                         <Button
    //                                             type="primary"
    //                                             style={{maxWidth:"230px"}}
    //                                             onClick={() => add()}
    //                                             block
    //                                             icon={<PlusOutlined />}
    //                                             className="btn-blue"
    //                                         >
    //                                             Добавить Email
    //                                         </Button>
    //                                     </Form.Item>
    //                                 </div>
    //                                 )}
    //                             </Form.List>

    //                             <Form.Item name="canEmail" label="Разрешить рассылку" valuePropName="checked">
    //                                 <Switch defaultChecked />
    //                             </Form.Item>

    //                             <h4>Аккаунты в соцсетях</h4>

    //                             <Form.List name="socsites">

    //                                 {(socials, { add, remove }) => (
    //                                 <div style={{margin: '0 auto', maxWidth: 760}}>
    //                                     {socials.map(({ key, name, fieldKey, ...restField }) => (
    //                                         <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
    //                                             <Form.Item
    //                                                 {...restField}
    //                                                 name={[name, 'socsites']}
    //                                                 fieldKey={[fieldKey, 'socsites']}
    //                                                 rules={[{ required: true, message: 'Не указана ссылка на профиль' }]}
    //                                             >
    //                                                 <Input placeholder="Ссылка на профиль" size="large" className="form-input" />
    //                                             </Form.Item>
    //                                             <MinusCircleOutlined onClick={() => remove(name)} />
    //                                         </Space>
    //                                     ))}
    //                                     <Form.Item>
    //                                         <Button
    //                                             type="primary"
    //                                             style={{maxWidth:"230px"}}
    //                                             onClick={() => add()} block icon={<PlusOutlined />}
    //                                             className="btn-blue"
    //                                         >
    //                                             Добавить аккаунт
    //                                         </Button>
    //                                     </Form.Item>
    //                                 </div>
    //                                 )}
    //                             </Form.List>

    //                             <Form.Item label="Роль" name="role" hidden>
    //                                 <Input
    //                                     size="large"
    //                                     className="form-input"
    //                                 />
    //                             </Form.Item>
    //                         </Col>

    //                         <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
    //                             <Form.Item label="Анамнез жизни" name="lifeAnamnesis">
    //                                 <JoditEditor
    //                                     ref={editorLifeAnamnesis}
    //                                     value={
    //                                         (contentLifeAnamnesis &&
    //                                         contentLifeAnamnesis !== undefined) ?
    //                                         contentLifeAnamnesis :
    //                                         ""
    //                                     }
    //                                     config={configLifeAnamnesis}
    //                                     onBlur={newContent => setContentLifeAnamnesis(newContent)} // preferred to use only this option to update the content for performance reasons
    //                                     //onChange={newContent => {console.log(newContent)}}
    //                                 />
    //                             </Form.Item>
    //                         </Col>

    //                         <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>

    //                             <Form.Item label="Общий статус" name="commonStatus">
    //                                 <JoditEditor
    //                                     ref={editorCommonStatus}
    //                                     value={
    //                                         (contentCommonStatus &&
    //                                         contentCommonStatus !== undefined) ?
    //                                         contentCommonStatus :
    //                                         ""
    //                                     }
    //                                     config={configCommonStatus}
    //                                     onBlur={newContent => setContentCommonStatus(newContent)} // preferred to use only this option to update the content for performance reasons
    //                                     //onChange={newContent => {console.log(newContent)}}
    //                                 />
    //                             </Form.Item>
    //                         </Col>
    //                     </Row>
    //                 }
    //             </Col>
    //         </Row>

    //         <Row gutter={16}>
    //             <Col className="gutter-row" span={24}>
    //                 <FormFooter
    //                     id={id}
    //                     isFormChanged={isFormChanged}
    //                     onDelete={onPatientDelete}
    //                     path={PATIENTS}
    //                 />
    //             </Col>
    //         </Row>

    //         <Prompt
    //             when={isFormChanged}
    //             message="Выйти без сохранения?"
    //         />

    //     </Form>
  );
};

export default PatientView;
