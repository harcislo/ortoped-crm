import { FC, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import ru_RU from 'antd/es/date-picker/locale/ru_RU';
import { Row, Col, Form, Input, Space, Button, DatePicker, Select, Popconfirm } from 'antd';
import { Typography } from 'antd';
import { FormOutlined, SaveOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
  getSingleTaskSelector,
} from '../../redux-slices/TaskSlice';
import {
  getTaskStatuses,
  getCommonPriorities,
  getTaskStatusesSelector,
  getCommonPrioritiesSelector,
} from '../../redux-slices/DirectoriesSlice';
import { Task } from '../../types';
import { getUsers } from '../../actions';
import { getUsersSelector } from '../../selectors';
import { getPatients, getPatientsSelector } from '../../redux-slices/PatientSlice';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface IFormFields {
  title: string;
  comment: string;
  dateRange: Moment[];
  personId: number;
  priorityId: number;
  statusId: number;
  assigneeId: number;
}

const TaskView: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [form] = Form.useForm();
  const taskSaved = useSelector(getSingleTaskSelector);
  const statusesTask = useSelector(getTaskStatusesSelector);
  const commonPriorities = useSelector(getCommonPrioritiesSelector);
  const patients = useSelector(getPatientsSelector);
  const users = useSelector(getUsersSelector);

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getSingleTask(id));
    }
    //  TODO это временное решение - потом перейти на интуты с автокомплитом
    // trackerStatuses отсюда удалено, потому что запрос на их получение уже делается в таблице (TaskList)
    // dispatch(getCommonPriorities());
    dispatch(getPatients());
    dispatch(getUsers());
  }, [id, dispatch]);

  useEffect(() => {
    if (id !== 'new' && taskSaved?.id === Number(id)) {
      form.setFieldsValue({
        title: taskSaved?.title,
        dateRange: [
          moment(taskSaved?.startTime || undefined),
          moment(taskSaved?.endTime || undefined),
        ],
        comment: taskSaved?.comment,
        statusId: taskSaved?.statusId,
        assigneeId: taskSaved?.assigneeId,
        personId: taskSaved.personId,
        priorityId: taskSaved?.priorityId,
      });
    }
  }, [id, taskSaved, form]);

  const prepareDataToSend = useCallback((values: IFormFields) => {
    return {
      title: values.title,
      comment: values.comment,
      startTime: values.dateRange ? values.dateRange[0].format('DD.MM.YYYY HH:mm:ss') : null,
      endTime: values.dateRange ? values.dateRange[1].format('DD.MM.YYYY HH:mm:ss') : null,
      personId: values.personId,
      priorityId: values.priorityId,
      statusId: values.statusId,
      assigneeId: values.assigneeId,
    };
  }, []);

  const onFormFinish = useCallback(
    async (values: any) => {
      // TODO для режима редактирования сделать вычисление было ли изменено хоть одно поле и тогда активировать кнопку
      const data = prepareDataToSend(values);

      try {
        if (id === 'new') {
          await dispatch(createTask(data));
        } else {
          await dispatch(editTask(data, id));
        }
      } catch (error) {}
    },
    [dispatch, id, prepareDataToSend]
  );

  const onDelete = useCallback(() => {
    dispatch(deleteTask(id));
    history.goBack();
  }, [dispatch, id, history]);

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onFinish={onFormFinish}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Title level={3} type="secondary" className="form-title">
            <span>{id !== 'new' ? `${taskSaved?.title}` : 'Новая задача'}</span>
            <Space style={{ marginBottom: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                title="Сохранить"
                className="btn-blue"
                onClick={history.goBack}
              >
                <SaveOutlined />
              </Button>
              <Button type="default" htmlType="button" onClick={history.goBack} title="Назад">
                <ArrowLeftOutlined />
              </Button>
              {id !== 'new' && (
                <Popconfirm title="Удалить?" onConfirm={onDelete} okText="Да" cancelText="Нет">
                  <Button type="primary" htmlType="button" danger title="Удалить">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              )}
            </Space>
          </Title>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={8}>
          <Form.Item
            label="Название"
            name="title"
            rules={[{ required: true, message: 'Пожалуйста, введите название задачи' }]}
          >
            <Input size="large" prefix={<FormOutlined />} className="form-input" />
          </Form.Item>
        </Col>

        <Col className="gutter-row" xs={24} sm={24} md={8}>
          <Form.Item
            label="Дата/время"
            name="dateRange"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите дату и время',
              },
            ]}
            hasFeedback
          >
            <RangePicker
              locale={ru_RU}
              format="DD.MM.YYYY HH:mm"
              showTime={{ format: 'HH:mm' }}
              size="large"
              className="form-input"
              bordered
              ranges={{
                Сегодня: [moment(new Date()).startOf('day'), moment(new Date()).endOf('day')],
                Завтра: [
                  moment(new Date()).startOf('day').add(1, 'days'),
                  moment(new Date()).endOf('day').add(1, 'days'),
                ],
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" xs={24} sm={24} md={8}>
          <Form.Item label="Комментарий к задаче" name="comment">
            <Input.TextArea
              rows={4}
              size="large"
              className="form-input"
              placeholder="Комментарий"
            />
          </Form.Item>
        </Col>
      </Row>
      <Col className="gutter-row" xs={24} sm={24} md={8}>
        <Form.Item
          label="Статус задачи"
          name="statusId"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите статус задачи',
            },
          ]}
        >
          <Select placeholder="Выберите статус задачи">
            {statusesTask.map(({ title, id }: { title: string; id: number }) => (
              <Select.Option value={id} key={id}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={8}>
        <Form.Item
          label="Важность задачи"
          name="priorityId"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите важность задачи',
            },
          ]}
        >
          <Select placeholder="Выберите важность задачи">
            {commonPriorities.map(({ name, id }: { name: string; id: number }) => (
              <Select.Option value={id} key={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={8}>
        <Form.Item
          label="Пациент"
          name="personId"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите пациента',
            },
          ]}
        >
          <Select placeholder="Выберите пациента">
            {patients.map(
              ({
                firstName,
                lastName,
                patronymic,
                id,
              }: {
                firstName: string;
                lastName: string;
                patronymic: string;
                id: number;
              }) => (
                <Select.Option
                  value={id}
                  key={id}
                >{` ${lastName} ${firstName} ${patronymic}`}</Select.Option>
              )
            )}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} sm={24} md={8}>
        <Form.Item
          label="Исполнитель"
          name="assigneeId"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите исполнителя',
            },
          ]}
        >
          <Select placeholder="Выберите исполнителя">
            {users.map(
              ({
                name,
                surname,
                patronymic,
                id,
              }: {
                name: string;
                surname: string;
                patronymic: string;
                id: number;
              }) => (
                <Select.Option
                  value={id}
                  key={id}
                >{` ${surname} ${name} ${patronymic}`}</Select.Option>
              )
            )}
          </Select>
        </Form.Item>
      </Col>

      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <Space className="form-footer">
            <Button type="primary" htmlType="submit" size="large" className="btn-blue">
              <SaveOutlined /> Сохранить
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="btn-blue"
              onClick={history.goBack}
            >
              <SaveOutlined /> Сохранить и выйти
            </Button>
            <Button type="default" htmlType="button" size="large" onClick={history.goBack}>
              <ArrowLeftOutlined /> Назад
            </Button>
            {id !== 'new' && (
              <Popconfirm title="Удалить?" onConfirm={onDelete} okText="Да" cancelText="Нет">
                <Button type="primary" htmlType="button" size="large" danger>
                  <DeleteOutlined /> Удалить
                </Button>
              </Popconfirm>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskView;
