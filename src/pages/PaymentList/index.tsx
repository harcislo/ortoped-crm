import {FC, useEffect, useState} from 'react';

//import {getPaymentsExpanded, deletePayment} from '../api';
import DataTable from '../../components/DataTable';
//import {getColumnSearchProps} from '../../../components/common/table/TableColumnSearch';
import {Link, useHistory} from 'react-router-dom';
import moment from 'moment';
import {deletePayment, getPayers, getPayments} from '../../actions/PaymentActions';
import {getPaymentsSelector} from '../../selectors';
import AddPayment from '../../components/AddPayment/AddPayment';
import {useDispatch, useSelector} from 'react-redux';
import RemovePayment from '../../components/RemovePayment/RemovePayment';
import {getPaymentPagination} from '../../redux-slices/PaymentsSlice';
import {RootState} from "../../store";
import Button from 'antd/lib/button/button';
import {setSelectedRow} from "../../reducers/Additional";
// import UserFullName from '../../users/components/UserFullName';
// import PersonFullName from '../components/PersonFullName';
// import PersonRoleName from '../components/PersonRoleName';

const PaymentList: FC = () => {
    const selectedRowKeys = useSelector<RootState>(state => state.additional.selectedRowKeys)
    const [payers, setPayers] = useState()
    const history = useHistory();
    const pagination = useSelector(getPaymentPagination)
    const payments = useSelector<RootState>(state => state.payment.payments)
    const dispatch = useDispatch()
    useEffect(() => {
        const response = dispatch(getPayers())
    }, [])
    const [popup, setPopup] = useState(false)
    const [popupRemove, setPopupRemove] = useState(false)

    const columns: any[] = [
        {
            title: 'Дата',
            dataIndex: 'date',
            width: 80,

            align: 'center',
            sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            // ...getColumnSearchProps('date'),
            render: (text: string, record: any) => (
                <Link to={`/payments/update/${record.id}`}>
                    {record.date ? moment(record.date).format('DD.MM.YYYY') : '00:00'}
                </Link>
            ),
        },
        {
            title: 'Плательщик',
            dataIndex: 'person',
            filterSearch: true,
            sorter: (a: any, b: any) => {
                if (a.person && b.person && a.person.lastName && b.person.lastName) {
                    return a.person.lastName.length - b.person.lastName.length
                }
            },
            // ...getColumnSearchProps('person'),
            render: (text: string, record: any) =>
                record.person &&
                record.person.id &&
                `${record.person.lastName} ${record.person.firstName} ${record.person.patronymic}`,
        },
        // {
        //   title: 'Тип плательщика',
        //   dataIndex: 'personId',
        //   filterSearch: true,
        //   // sorter: (a: any, b: any) => a.personId - b.personId,
        //   // ...getColumnSearchProps('personId'),
        //   // render: (text: string, record: any) => (
        //   // 	record.personId &&
        //   // 	<PersonRoleName personId={record.personId} />
        //   // )
        // },
        {
            title: 'Получатель',
            dataIndex: 'user',
            filterSearch: true,
            sorter: (a: any, b: any) => {
                if (a.user && b.user && a.user.lastName && b.user.lastName) {
                    return a.user.lastName.length - b.user.lastName.length
                }
            },
            // ...getColumnSearchProps('user'),
            render: (text: string, record: any) =>
                record.user && record.user.id && `${record.user.surname} ${record.user.name} ${record.user.patronymic}`,
        },
        {
            title: 'Приход/Расход',
            dataIndex: 'status',
            filterSearch: true,
            sorter: (a: any, b: any) => {
                if (a.status && b.status && a.status.name && b.status.name) {
                    return a.status.name.length - b.status.name.length
                }
            },
            // ...getColumnSearchProps('status'),
            render: (text: string, record: any) =>
                // record.status && record.status.id && `${record.status.name}`,
                record.status.id === 1? 'Приход': 'Расход'
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            filterSearch: true,
            sorter: (a: any, b: any) => a.sum - b.sum,
            // ...getColumnSearchProps('sum'),
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            // filterSearch: true,
            // sorter: (a: any, b: any) => a.comment.length - b.comment.length,
            // ...getColumnSearchProps('comment'),
        },
    ];

    return (
        <div>

            {popup &&
            <div className={'add_payment_popup'}>
                <AddPayment btnText={'Добавить'} setPopup={setPopup}/>
            </div>
            }
            {popupRemove &&
            <div className={'add_payment_popup'}>
                <RemovePayment btnText={'Сохранить'} removeId={popupRemove} setPopup={setPopupRemove}/>
            </div>
            }
            <DataTable
                //@ts-ignore
                pagination={{
                    //@ts-ignore
                    totalCount: payments.length,
                }}
                title="Оплаты"
                getDataAction={getPayments}
                dataSelector={getPaymentsSelector}
                columns={columns}
                params={['date', 'comment']}
                addButtonText="Добавить оплату"
                onCreate={() => {
                    history.push(`/payments/new`);
                    // setPopup(true)
                }}
                onUpdate={(id: number) => {
                    history.push(`/payments/update/${id}`);
                    //@ts-ignore
                    // setPopupRemove(id)
                }}
                onDelete={(id: any) => {
                    dispatch(deletePayment(id))


                }}
                editable={true}
                deletable={true}
                addable={true}

            />
            {/*/!*@ts-ignore*!/*/}
            {/*{selectedRowKeys.length > 0 &&*/}
            {/*<Button style={{*/}
            {/*    position: 'fixed',*/}
            {/*    zIndex: 100*/}
            {/*}} onClick={  () => {*/}
            {/*    //@ts-ignore*/}
            {/*    selectedRowKeys.map(id => {*/}
            {/*        dispatch(deletePayment(id))*/}
            {/*    })*/}
            {/*    dispatch(setSelectedRow([]))*/}

            {/*}*/}
            {/*} danger type={'primary'}>Удалить все</Button>*/}
            {/*}*/}
        </div>

    );
};

export default PaymentList;
