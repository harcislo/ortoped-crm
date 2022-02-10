import { message } from 'antd';
import { TASK_STATUS_COLORS } from '../constants';
import ACTION_TYPES from '../types/actionNames';

export const onFinishLogin = (values: any) => {
  console.log('Success:', values);
};

export const onFinishLoginFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export const showLoginSuccessMessage = () => {
  message.success('Вы авторизованы!');
};

export const showLoginErrorMessage = () => {
  message.error('Ошибка авторизации! Логин или пароль указаны неверно');
};

export const getTaskStatusColor = (statusId: number): string => {
  return TASK_STATUS_COLORS[statusId];
};

export const showCreatePatientSuccessMessage = () => {
  message.success('Пациент добавлен...');
};

export const showUpdatePatientSuccessMessage = () => {
  message.success('Пациент сохранен...');
};

export const showDeletePatientSuccessMessage = () => {
  message.success('Пациент удален...');
};

export const showUpdateWarningMessage = () => {
  message.warning('Изменения не сохранены!');
};

export const showCreatePatientErrorMessage = () => {
  message.error('Не удалось добавить пациента!');
};

export const showUpdatePatientErrorMessage = () => {
  message.error('Не удалось сохранить изменения!');
};

export const showDeletePatientErrorMessage = () => {
  message.error('Не удалось удалить пациента!');
};
