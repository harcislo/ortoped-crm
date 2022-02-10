import React, {FC, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPatients} from "../../redux-slices/PatientSlice";
import {addPayment, getAgents, getPartners, getPayment, getPayments, getUsers, putPayment} from "../../actions";
import {RootState} from "../../store";
import dateRefactor from "../../utils/dateRefactor";
import paymentTypeRefactor from "../../utils/paymentTypeRefactor";
import moment from "moment";

const {Option} = Select;
const {TextArea} = Input;

const PaymentUpdate: FC = () => {
    const history = useHistory()
    const {id} = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const [alertSuccessful, setAlertSuccessful] = useState<any>(false)
    const selectedPayment = useSelector<RootState>(state => state.additional.payment)
    const patients = useSelector<RootState>(state => state.patient.patients)
    const agents = useSelector<RootState>(state => state.agent.agents)
    const partners = useSelector<RootState>(state => state.partner.partners)
    const users = useSelector<RootState>(state => state.user.users)
    const payers = useSelector<RootState>(state => state.additional.payers)
    const payments = useSelector<RootState>(state => state.payment.payments)
    const payment = useSelector<RootState>(state => state.additional.payment)



    useEffect(() => {
        dispatch(getPayments())
        dispatch(getPatients())
        dispatch(getAgents())
        dispatch(getPartners())
        dispatch(getUsers())
        dispatch(getPayment(id))
    }, [id])


    //@ts-ignore
    const initialComment = selectedPayment.comment
    //@ts-ignore
    const initialSum = selectedPayment.sum
    //@ts-ignore
    const initialPaymentType = selectedPayment.statusId === 1 ? 'Приход' : 'Расход'
    //@ts-ignore
    const initialRecipient = selectedPayment.userId ? [...agents, ...partners, ...users].find(recipient => recipient.id === selectedPayment.userId):null
    //@ts-ignore
    const initialPayer = selectedPayment.personId? [...patients].find(payer => payer.id === selectedPayment.personId):null
    //@ts-ignore
    const initialDate = selectedPayment.date



    // const initialValues = {
    //     //@ts-ignore
    //     "date": resultDate || selectedPayment.date,
    //     //@ts-ignore
    //     "personId": resultValuePersonId || selectedPayment.personId,
    //     //@ts-ignore
    //     "userId": 1 || selectedPayment.userId,
    //     "sum": `${values.sum}`,
    //     "statusId": resultPaymentType,
    //     "comment": values.comment
    // }


    const onFinish = (values: any) => {
        //person-плательщик(patient && agent)
        console.log(values, 'values')
        console.log(selectedPayment, 'selectedPayment')
        console.log(payment, 'payment')

        console.log(typeof values.payer)
        let resultValuePersonId
        if (values.payer===null) {
             resultValuePersonId = null
            console.log('asfasdasfasf')

        } else if(typeof values.payer =='string') {
            // @ts-ignore
             resultValuePersonId = payment.personId
        } else {
            // @ts-ignore
             resultValuePersonId = [...patients].find(person => person.id === values.payer).id
        }

        //@ts-ignore
        // const resultValuePersonId = typeof values.payer =='string' ? payment.personId : [...patients].find(person => person.id === values.payer).id
        // @ts-ignore
        //user-получатель(agent, partner, user)
        //@ts-ignore
        const resultValueUserId = typeof values.recipient == 'string' ? payment.userId : values.recipient

        //Получение валидной даты
        //@ts-ignore
        const resultDate = values.date? dateRefactor(values.date._d.toLocaleDateString()):payment.date.split(' ')[0].split('-').join('.')
        const resultPaymentType = paymentTypeRefactor(values.paymentType)
        const resultValues = {
            //@ts-ignore
            "date": resultDate,
            //@ts-ignore
            "personId": resultValuePersonId,
            // "personId": resultValuePersonId.id || payment.personId,
            //@ts-ignore
            "userId": resultValueUserId,
            //@ts-ignore
            "sum": `${values.sum}` || payment.sum,
            //@ts-ignore
            "statusId": resultPaymentType || payment.statusId,
            //@ts-ignore
            "comment": values.comment || payment.comment
        }

        // console.log(`resultValuePerson: ${resultValuePerson} \n resultValueUser: ${resultValueUser}`)

        // отправить на сервер
        dispatch(putPayment(id, resultValues))
        setAlertSuccessful(true)
        setTimeout(() => {
            setAlertSuccessful(false)
        }, 500)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Файл не загружаю, вывожу ошибки');
    };

    const onFinishOnly = () => {
    }

    const config = {
        rules: [{type: 'object' as const, required: false, message: 'Выберите дату'}],
    };

    const dateFormat = 'YYYY/MM/DD';

    return (
        <>
            <div>
                {/*//@ts-ignore*/}
                {Object.keys(selectedPayment).length > 0 && payment && patients && selectedPayment.id ==id ?
                    <>
                        <Form
                            name="paymentAdd"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 8}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item initialValue={moment(`${initialDate.split(' ')[0].split('-').join('/')}`, dateFormat)} name="date" label="Дата" {...config}>
                                <DatePicker  placeholder={'Выберите дату'}/>
                            </Form.Item>

                            {initialPayer?                             <Form.Item
                                name="payer"
                                label="Плательщик"
                                hasFeedback
                                rules={[{required: false, message: 'Выберите плательщика!'}]}
                                initialValue={`${initialPayer?.lastName} ${initialPayer?.firstName} ${initialPayer?.patronymic}`}
                            >
                                <Select placeholder="Выберите плательщика">
                                    <Option value={null}>Нет плательщика</Option>
                                    {/*@ts-ignore*/}
                                    {patients.map(patient => <Option
                                        value={patient.id}>{patient.lastName} {patient.firstName} {patient.patronymic} [пациент]</Option>)}
                                    {/*@ts-ignore*/}

                                </Select>
                            </Form.Item>:
                                <Form.Item
                                    name="payer"
                                    label="Плательщик"
                                    hasFeedback
                                    rules={[{required: false, message: 'Выберите плательщика!'}]}
                                    initialValue={`Нет плательщика`}
                                >
                                    <Select placeholder="Выберите плательщика">
                                        <Option value={null}>Нет плательщика</Option>
                                        {/*@ts-ignore*/}
                                        {patients.map(patient => <Option
                                            value={patient.id}>{patient.lastName} {patient.firstName} {patient.patronymic} [пациент]</Option>)}
                                        {/*@ts-ignore*/}
                                    </Select>
                                </Form.Item>

                            }


                            {initialRecipient?                             <Form.Item
                                name="recipient"
                                label="Получатель"
                                hasFeedback
                                rules={[{required: false, message: 'Выберите получателя!'}]}
                                initialValue={`${initialRecipient?.surname} ${initialRecipient?.name} ${initialRecipient?.patronymic}`}
                            >
                                <Select placeholder="Выберите получателя">
                                    {/*/!*@ts-ignore*!/*/}
                                    {/*{agents.map(agent => <Option*/}
                                    {/*    value={agent.id}>{agent.lastName} {agent.firstName} {agent.patronymic} [агент]</Option>)}*/}
                                    {/*/!*@ts-ignore*!/*/}
                                    {/*{partners.map(partner => <Option*/}
                                    {/*    value={partner.id}>{partner.lastName} {partner.firstName} {partner.patronymic} [партнер]</Option>)}*/}
                                    <Option value={null}>Нет получателя</Option>

                                    {/*@ts-ignore*/}

                                    {users.map(user => <Option
                                        value={user.id}>{user.surname} {user.name} {user.patronymic} {user.type === 1 ? '[Администратор]' : '[Пользователь]'}</Option>)}
                                </Select>
                            </Form.Item>:                            <Form.Item
                                name="recipient"
                                label="Получатель"
                                hasFeedback
                                rules={[{required: false, message: 'Выберите получателя!'}]}
                                initialValue={`Нет получателя`}
                            >
                                <Select placeholder="Выберите получателя">
                                    {/*/!*@ts-ignore*!/*/}
                                    {/*{agents.map(agent => <Option*/}
                                    {/*    value={agent.id}>{agent.lastName} {agent.firstName} {agent.patronymic} [агент]</Option>)}*/}
                                    {/*/!*@ts-ignore*!/*/}
                                    {/*{partners.map(partner => <Option*/}
                                    {/*    value={partner.id}>{partner.lastName} {partner.firstName} {partner.patronymic} [партнер]</Option>)}*/}
                                    <Option value={null}>Нет получателя</Option>

                                    {/*@ts-ignore*/}

                                    {users.map(user => <Option
                                        value={user.id}>{user.surname} {user.name} {user.patronymic} {user.type === 1 ? '[Администратор]' : '[Пользователь]'}</Option>)}
                                </Select>
                            </Form.Item>}

                            <Form.Item
                                name="paymentType"
                                label="Приход/Расход"
                                hasFeedback
                                initialValue={initialPaymentType}
                                rules={[{required: true, message: 'Выберите тип!'}]}
                            >
                                <Select placeholder="Выберите тип">
                                    <Option value={'income'}>Приход</Option>
                                    <Option value={'expense'}>Расход</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="sum"
                                label="Сумма"
                                hasFeedback
                                initialValue={initialSum}
                                rules={[{required: true, message: 'Введите сумму!'}]}
                            >
                                <Input className={'inputSum'} type={'number'} placeholder={'Введите сумму'}/>
                            </Form.Item>

                            <Form.Item
                                name="comment"
                                label="Комментарий"
                                hasFeedback
                                // @ts-ignore
                                initialValue={initialComment}
                                rules={[{required: true, message: 'Введите комментарий!'}]}
                            >
                                <TextArea placeholder={'Введите комментарий'}/>
                            </Form.Item>

                            <div className={'btn_footer_wrapper_update'}>
                                {/*<Button onClick={onFinishOnly} type="primary" htmlType="submit" size="large">*/}
                                {/*    <SaveOutlined/> {alertSuccessful ? 'Сохранено' : 'Сохранить'}*/}
                                {/*</Button>*/}
                                <Button onClick={() => {
                                    history.goBack()
                                }} type="primary" htmlType="submit" size="large">
                                    <SaveOutlined/> Сохранить и выйти
                                </Button>
                                <Button onClick={() => {
                                    history.goBack()
                                }} type="ghost" size="large">
                                    Назад
                                </Button>
                            </div>


                        </Form>
                    </> :
                    <div>Загрузка...</div>
                }

            </div>

        </>
    );
};

export default PaymentUpdate;