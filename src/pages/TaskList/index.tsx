import { FC, useCallback, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Space, Button, Dropdown, Menu, Popconfirm } from 'antd';
import { DownOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import DataTable from '../../components/DataTable';
import TaskStatus from '../../components/TaskStatus';
import SortButton from '../../components/SortButton';
import {
  getTasks,
  deleteTask,
  getTasksSelector,
  getTaskPagination,
  sortTasks,
  getTaskSearchParams,
  getTaskSortParams,
  searchTasks,
} from '../../redux-slices/TaskSlice';
import {
  getCommonPriorities,
  getCommonPrioritiesSelector,
  getTaskStatusesSelector,
  getTaskStatuses,
} from '../../redux-slices/DirectoriesSlice';
import './styles.scss';
import { useSort } from '../../hooks';
import { Task } from '../../types';

const TaskList: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [sort] = useSort(sortTasks);

  const pagination = useSelector(getTaskPagination);
  const sortParams = useSelector(getTaskSortParams);
  const trackerStatuses = useSelector(getTaskStatusesSelector);
  const taskPriorities = useSelector(getCommonPrioritiesSelector);

  useEffect(() => {
    dispatch(getTaskStatuses());
    dispatch(getCommonPriorities());
  }, [dispatch]);

  const onUpdate = useCallback(
    (id: number) => {
      history.push(`/tasks/${id}`);
    },
    [history]
  );

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await dispatch(deleteTask(`${id}`));
        dispatch(getTasks());
      } catch (error) {}
    },
    [dispatch]
  );

  const columns = [
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Задача</p>
            <div className="block-caret">
              <SortButton order="asc" sortBy="title" sort={sort} currentSortParams={sortParams} />
              <SortButton order="desc" sortBy="title" sort={sort} currentSortParams={sortParams} />
            </div>
          </div>
        );
      },
      dataIndex: 'title',
      filterSearch: true,
      render: (_: any, record: Task) => <Link to={`/tasks/${record.id}`}>{record.title}</Link>,
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Статус</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" onClick={() => sort('statusId', 'asc')} />
              <CaretDownOutlined className="caret-down" onClick={() => sort('statusId', 'desc')} />
            </div>
          </div>
        );
      },
      dataIndex: 'status',
      filterSearch: true,
      align: 'center',
      // Фильтрация по статусу задачи - ждем бэкенд
      render: (_: any, record: Task) => <TaskStatus status={record.status} />,
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Дата/ Время начала</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" onClick={() => sort('startTime', 'asc')} />
              <CaretDownOutlined className="caret-down" onClick={() => sort('startTime', 'desc')} />
            </div>
          </div>
        );
      },
      dataIndex: 'startTime',
      align: 'center',
      // TODO sort - ждем бэкенд
      render: (text: string, record: Task) => {
        return record.startTime && moment(record.startTime).format('DD.MM.YYYY HH:MM:SS');
      },
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Дата/ Время окончания</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" />
              <CaretDownOutlined
                className="caret-down"
                onClick={() => {
                  dispatch(getTasks({ sort: 'endTime' }));
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: 'endTime',
      align: 'center',
      // TODO sort - ждем бэкенд
      render: (_: any, record: Task) =>
        record.endTime && moment(record.endTime).format('DD.MM.YYYY HH:MM:SS'),
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Комментарии</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" onClick={() => sort('comment', 'asc')} />
              <CaretDownOutlined className="caret-down" onClick={() => sort('comment', 'desc')} />
            </div>
          </div>
        );
      },
      dataIndex: 'comment',
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Исполнитель</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" onClick={() => sort('fullname', 'asc')} />
              <CaretDownOutlined className="caret-down" onClick={() => sort('fullname', 'desc')} />
            </div>
          </div>
        );
      },
      dataIndex: 'assignee',
      // TODO search - не работает поиск по исполнителю - ждем бэкенд
      render: (_: any, record: Task) =>
        record.assignee?.id &&
        `${record.assignee.surname} ${record.assignee.name} ${record.assignee.patronymic}`,
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Важность</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" onClick={() => sort('priorityId', 'asc')} />
              <CaretDownOutlined
                className="caret-down"
                onClick={() => sort('priorityId', 'desc')}
              />
            </div>
          </div>
        );
      },
      // TODO фильтрация по приоритету - ждем бэкенд
      //...addTextSearchProps('priorityId'),
      dataIndex: 'priority',
      filterSearch: true,
      render: (_: any, record: Task) => record.priority?.name,
    },
    {
      title: () => {
        return (
          <div className="block-head">
            <p>Пациент</p>
            <div className="block-caret">
              <CaretUpOutlined className="caret" onClick={() => sort('fullname', 'asc')} />
              <CaretDownOutlined className="caret-down" onClick={() => sort('fullname', 'desc')} />
            </div>
          </div>
        );
      },
      dataIndex: 'person',
      width: 100,
      render: (_: any, record: Task) =>
        record.person?.id &&
        `${record.person.lastName} ${record.person.firstName} ${record.person.patronymic}`,
    },
  ];

  const filters = useMemo(
    () => [
      {
        fieldName: 'title',
        label: 'Название задачи',
        type: 'text',
      },
      {
        fieldName: 'statusId',
        label: 'Статус задачи',
        type: 'dropdown',
        options: trackerStatuses,
        emptyPlaceholder: 'Любой',
      },
      {
        fieldName: 'startTime',
        label: 'Дата начала',
        type: 'date',
      },
      {
        fieldName: 'endTime',
        label: 'Дата окончания',
        type: 'date',
      },
      {
        fieldName: 'comment',
        label: 'Комментарий',
        type: 'text',
      },
      {
        fieldName: 'priorityId',
        label: 'Важность',
        type: 'dropdown',
        options: taskPriorities.map((t) => ({ ...t, title: t.name })),
        emptyPlaceholder: 'Любая',
      },
      {
        fieldName: 'fullname',
        label: 'Имя пациента',
        type: 'text',
      },
    ],
    [trackerStatuses, taskPriorities]
  );

  return (
    <DataTable
      getDataAction={getTasks}
      dataSelector={getTasksSelector}
      searchAction={searchTasks}
      getSearchParamsSelector={getTaskSearchParams}
      columns={columns}
      filters={filters}
      addButtonText="Добавить задачу"
      onCreate={() => {
        history.push(`/tasks/new`);
      }}
      onUpdate={onUpdate}
      onDelete={onDelete}
      pagination={pagination}
      editable={true}
      deletable={true}
      addable={true}
    />
  );
};

export default TaskList;
