import React, {FC, useState, useEffect, useCallback, useMemo, ReactNode} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Space, Button, Skeleton, Progress, TablePaginationConfig} from 'antd';

import {PlusOutlined} from '@ant-design/icons';
import {Pagination} from '../../types';
import IconEdit from '../../components/IconEdit';
import IconDelete from '../../components/IconDelete';
import {RootState} from '../../store';
import TableOuterFilters from '../TableOuterFilters';
import './styles.scss';
import {setSelectedRow} from "../../reducers/Additional";
import {deletePayment} from "../../actions";

//import DeleteAllRecords from './DeleteAllRecords';

interface IProps {
    getDataAction: (params?: any) => void;
    dataSelector: (state: RootState) => any;
    searchAction?: (params?: any) => void;
    getSearchParamsSelector?: (state: RootState) => any;
    columns: any[];
    filters?: any[];
    addButtonText: string;
    onCreate: () => void;
    onUpdate?: (id: number) => void;
    onDelete?: (id: number) => void;
    pagination?: Pagination;
    editable: boolean;
    deletable: boolean;
    addable: boolean;

    onFilter?: (data: any) => void;

    summary?: React.ReactNode | null;

    /**@Deprecated */
    title?: string;
    params?: any;
}

/**
 * Таблица данных
 * @param props IDataTable
 * @returns JSX
 */
const DataTable: FC<IProps> = ({
                                   getDataAction,
                                   dataSelector,
                                   searchAction,
                                   getSearchParamsSelector,
                                   pagination,
                                   columns,
                                   filters,
                                   onCreate,
                                   onUpdate,
                                   onDelete,
                                   editable,
                                   deletable,
                                   addable,

                                   onFilter,
                                   addButtonText,

                                   summary,
                               }) => {
    const dispatch = useDispatch();

    const [filteredInfo, setFilteredInfo] = useState(null)
    const [sortedInfo, setSortedInfo] = useState(null)
    const selectedRowKeys = useSelector<RootState>(state => state.additional.selectedRowKeys)

    // TODO прочекать что это
    // const {value} = useTypedSelector( state => state.globalSearch);
    // const { users } = useTypedSelector(state => state.user);

    const data = useSelector(dataSelector);


    const [loading, setLoading] = useState<boolean>(false);
    const [progressPercent, setProgressPercent] = useState<number>(0);
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    function handleChangeF(pagination: any, filters: any, sorter: any) {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters)
        setSortedInfo(sorter)
    }

    function clearFilters() {
        setFilteredInfo(null)
    }

    function clearAll() {
        setFilteredInfo(null)
        setSortedInfo(null)
    }

    function setAgeSort() {
        setSortedInfo({
            // @ts-ignore

            order: 'descend',
            columnKey: 'age',
        })
    }


    useEffect(() => {
        dispatch(getDataAction());
    }, [dispatch, getDataAction]);

    // TODO вынести в кастомных хук
    // useEffect(() => {
    //   if (loading) {
    //     for (let i = 0; i <= 100; i++) {
    //       setProgressPercent(i);
    //     }
    //   }
    // }, [loading]);

    const handleSelectChange = (selectedRowKeys: any | undefined): void => {
        // setSelectedRowKeys(selectedRowKeys);
        dispatch(setSelectedRow(selectedRowKeys))
        console.log('selectedRowKeys changed: ', selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: handleSelectChange,
        //Стрелочка вниз с выбором
        // selections: [
        //     Table.SELECTION_ALL,
        //     Table.SELECTION_NONE,
        // ],
    };

    const handleChange = useCallback(
        (pagination: TablePaginationConfig) => {
            dispatch(getDataAction({page: pagination.current}));
        },
        [dispatch, getDataAction]
    );

    const operation = useMemo(
        () => ({
            title: () => {
                return (
                    <div className="block-head">
                        <p>Действия</p>
                    </div>
                );
            },
            dataIndex: 'operation',
            key: 'operation',
            width: 20,
            align: 'center',
            render: (_: any, record: any) =>
                (editable || deletable) && (
                    <Space size="middle">
                        {editable && <IconEdit onClick={() => onUpdate?.(record.id)}/>}
                        {deletable && <IconDelete onClick={() => onDelete?.(record.id)}/>}
                    </Space>
                ),
        }),
        [editable, deletable, onUpdate, onDelete]
    );

    return (
        <>
            {/*<Space style={{ marginBottom: 16 }}>
          {
              isTableAddable &&
              <Button type="primary" 
                  onClick={() => onCreate()}>
                  {addButtonText}
              </Button>
          }
          <Button onClick={() => console.log('Сбросить фильтры')}>Сбросить фильтры</Button>
          <Button onClick={() => console.log('Сбросить сортировки')}>Сбросить сортировки</Button>
      </Space>*/}
            {loading ? (
                <>
                    <Progress percent={progressPercent} showInfo={false} status="active"/>
                    <Skeleton active/>
                    <Skeleton active/>
                </>
            ) : (
                <Table
                    // @ts-ignore
                    rowSelection={rowSelection}
                    columns={[...columns, operation]}
                    dataSource={data}
                    onChange={handleChange}
                    bordered
                    loading={loading}
                    rowKey="id"
                    tableLayout="auto"
                    pagination={{
                        current: pagination?.currentPage,
                        pageSize: pagination?.perPage,
                        total: pagination?.totalCount,
                    }}
                    title={() => (
                        <>
                            <div className="table-header">
                                <h3>Всего {pagination?.totalCount}</h3>
                                {addable && (
                                    <Button type="primary" size="middle" className="btn-blue" onClick={onCreate}>
                                        <PlusOutlined/> {addButtonText}

                                    </Button>
                                )}
                            </div>
                            {/*<h3>Фильтры</h3>*/}
                            {filters && searchAction && getSearchParamsSelector && (
                                <TableOuterFilters
                                    filters={filters}
                                    searchAction={searchAction}
                                    getSearchParamsSelector={getSearchParamsSelector}
                                />
                            )}
                        </>
                    )}
                    // footer={() => (isTableDeletable && selectedRowKeys && selectedRowKeys.length > 0 && (
                    //   <DeleteAllRecords
                    //     selectedRowKeys={selectedRowKeys}
                    //     clearSelectedRowKeys={() => setSelectedRowKeys([])}
                    //     onDelete={onDelete}
                    //     onAfterDelete={() => {
                    //       setLoading(true);
                    //       getData(getParams(value))
                    //           .then((res: any) => {
                    //               setHeaders(res.headers);
                    //               setData(onFilter ? onFilter(res.data) : res.data);
                    //           })
                    //           .catch((err: any) => console.log(err))
                    //           .finally(() => setLoading(false))
                    //       }
                    //     }
                    //   />
                    // )}

                    footer={() => <div>
                      {/*@ts-ignore*/}
                        {selectedRowKeys.length > 0 &&
                        <Button style={{
                        }} onClick={() => {
                            //@ts-ignore
                          selectedRowKeys.map(id => {
                                dispatch(deletePayment(id))
                            })
                            dispatch(setSelectedRow([]))

                        }
                        } danger type={'primary'}>Удалить все</Button>
                        }
                    </div>}

                    summary={(currentData: any) => summary}
                />
            )}

        </>
    );
};

export default DataTable;
