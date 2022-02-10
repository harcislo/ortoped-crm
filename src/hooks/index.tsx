import { ChangeEvent, useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { DatePicker, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

import { SortParams, TFilterDropdownProps } from '../types';
import { Moment } from 'moment';

export const useSort = (sortAction: (params: SortParams) => void) => {
  const dispatch = useDispatch();

  const sort = useCallback(
    (sortBy: string, order: 'asc' | 'desc') => {
      dispatch(sortAction({ sortBy, order }));
    },
    [dispatch, sortAction]
  );

  return [sort];
};

export const useTextSearch = (getDataAction: (params?: object) => void) => {
  const dispatch = useDispatch();

  const onFilter = throttle((value: string, property: string) => {
    dispatch(getDataAction({ [property]: value }));
  }, 1000);

  const getTextSearchProps = useCallback(
    (fieldName: string) => {
      return {
        filterDropdown: ({ selectedKeys, setSelectedKeys }: TFilterDropdownProps) => {
          return (
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(event) => {
                setSelectedKeys(event.target.value ? [event.target.value] : []);
                onFilter(event.target.value, fieldName);
              }}
              onPressEnter={(event) => {
                //@ts-ignore
                onFilter(event.target.value, fieldName);
              }}
              onBlur={(event) => {
                onFilter(event.target.value, fieldName);
              }}
            />
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
      };
    },
    [onFilter]
  );

  return getTextSearchProps;
};

export const useDateSearch = (getDataAction: (params?: object) => void) => {
  // TODO сделать запоминание состояния фильтрации, чтобы она работала с пагинацией + добавить возможность сброса фильтра
  const dispatch = useDispatch();

  const onFilter = throttle((value: Moment, property: string) => {
    dispatch(getDataAction({ [property]: value.format('DD.MM.YYYY') }));
  }, 1000);

  const getTextSearchProps = useCallback(
    (fieldName: string) => {
      return {
        filterDropdown: () => {
          return (
            <DatePicker
              onChange={(time: Moment | null) => {
                if (time) {
                  onFilter(time, fieldName);
                }
              }}
            />
          );
        },
        filterIcon: () => {
          return <SearchOutlined />;
        },
      };
    },
    [onFilter]
  );

  return getTextSearchProps;
};

export const useSearch = (searchAction: (params: any) => void) => {
  const dispatch = useDispatch();

  const onTextInputSearch = (fieldName: string, value: string) => {
    dispatch(searchAction({ searchBy: fieldName, searchTerm: value || null }));
  };

  const onDateSearch = (fieldName: string, date: Moment | null) => {
    dispatch(
      searchAction({
        searchBy: fieldName,
        searchTerm: date ? date.format('DD-MM-YYYY') : null,
      })
    );
  };

  const onDropdownSearch = (fieldName: string, event: { key: string }) => {
    dispatch(searchAction({ searchBy: fieldName, searchTerm: event.key }));
  };

  return {
    onTextInputSearch,
    onDateSearch,
    onDropdownSearch,
  };
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
