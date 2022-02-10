import React, { FC, useState, useEffect } from 'react';
//import {useTypedSelector} from '../../hooks/useTypedSelector';
//import {useActions} from '../../hooks/useActions';
import { Input } from 'antd';

const { Search } = Input;

const GlobalSearch: FC = () => {
  // store (глобальный state)
  //const {value, loading, error} = useTypedSelector( state => state.globalSearch);
  // action-creators
  //const {fetchSearch} = useActions();

  const [searchValue, setSearchValue] = useState<string>('');

  // useEffect(() => {
  //     fetchSearch(searchValue);
  // }, [searchValue]);

  const handleSearch = (val: string): void => {
    setSearchValue(val);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value: inputText },
    } = event;
    setSearchValue(inputText);
  };

  return (
    <Search
      placeholder="Поиск..."
      allowClear
      size="large"
      onSearch={handleSearch}
      onChange={handleChange}
    />
  );
};

export default GlobalSearch;
