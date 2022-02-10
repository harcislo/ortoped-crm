import { FC, useMemo } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import './styles.scss';
import { SortParams } from '../../types';

interface SortButtonProps extends SortParams {
  sort: (sortBy: string, order: 'asc' | 'desc') => void;
  currentSortParams: SortParams;
}

const SortButton: FC<SortButtonProps> = ({ sortBy, order, sort, currentSortParams }) => {
  const Icon = order === 'asc' ? CaretUpOutlined : CaretDownOutlined;

  const isSelected = useMemo(() => {
    return currentSortParams.sortBy === sortBy && currentSortParams.order === order;
  }, [currentSortParams.order, currentSortParams.sortBy, order, sortBy]);

  const classes = useMemo(() => {
    return `${order === 'asc' ? 'caret' : 'caret-down'} ${isSelected ? 'active' : ''}`;
  }, [isSelected, order]);

  return <Icon className={classes} onClick={() => sort(sortBy!, order!)} />;
};

export default SortButton;
