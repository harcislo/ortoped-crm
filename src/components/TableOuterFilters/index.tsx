import { FC } from 'react';
import { Input, DatePicker, Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import InputWithLabel from '../InputWithLabel';
import { useAppSelector, useSearch } from '../../hooks';
import './styles.scss';
import { RootState } from '../../store';
import { SearchParams } from '../../types';

type FilterConfig = {
  fieldName: string;
  label: string;
  type: 'text' | 'date' | 'dropdown';
  options?: { id: number; title: string }[];
  emptyPlaceholder: string;
};

interface Props {
  filters: FilterConfig[];
  searchAction: (params: any) => void;
  getSearchParamsSelector: (state: RootState) => SearchParams;
}

const TableOuterFilters: FC<Props> = ({ filters, searchAction, getSearchParamsSelector }) => {
  const { onTextInputSearch, onDateSearch, onDropdownSearch } = useSearch(searchAction);

  const searchParams = useAppSelector(getSearchParamsSelector);

  return (
    <div className="table-filters">
      {filters.map((filter) => {
        let selectedOptionId: string | null = null;

        if (filter.type === 'dropdown') {
          selectedOptionId = searchParams[filter.fieldName];
        }

        return (
          <div className="filter" key={filter.fieldName}>
            <InputWithLabel label={filter.label}>
              {filter.type === 'text' && (
                <Input.Search
                  allowClear
                  onSearch={(value) => onTextInputSearch(filter.fieldName, value)}
                />
              )}
              {filter.type === 'date' && (
                <DatePicker
                  onChange={(date) => onDateSearch(filter.fieldName, date)}
                  allowClear
                  placeholder=""
                />
              )}
              {filter.type === 'dropdown' && (
                <Dropdown
                  className="filter-dropdown"
                  trigger={['click']}
                  overlay={
                    <Menu onClick={(event) => onDropdownSearch(filter.fieldName, event)}>
                      {filter.options!.map((option) => (
                        <Menu.Item key={option.id}>{option.title}</Menu.Item>
                      ))}
                    </Menu>
                  }
                >
                  <Button>
                    {filter.options!.find((item) => `${item.id}` === selectedOptionId)?.title ||
                      filter.emptyPlaceholder ||
                      'Не выбрано'}{' '}
                    <DownOutlined />
                  </Button>
                </Dropdown>
              )}
            </InputWithLabel>
          </div>
        );
      })}
    </div>
  );
};

export default TableOuterFilters;
