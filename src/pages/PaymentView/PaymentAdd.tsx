import React, {FC, useEffect, useState} from 'react';
import './PaymentAdd.scss'
import {Alert, Button, Checkbox, DatePicker, Form, Input, Select} from "antd";
import {DefaultRootState, useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {getPatients} from "../../redux-slices/PatientSlice";
import {addPayment, getAgents, getPartners, getUsers} from "../../actions";
import {Footer} from "antd/lib/layout/layout";
import {useHistory} from "react-router-dom";
import dateRefactor from "../../utils/dateRefactor";
import {SaveOutlined} from "@ant-design/icons";
import paymentTypeRefactor from "../../utils/paymentTypeRefactor";
import {CSSTransition} from 'react-transition-group'

const {Option} = Select;
const {TextArea} = Input;


const PaymentAdd: FC = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [alertSuccessful, setAlertSuccessful] = useState(false)

    useEffect(() => {
        dispatch(getPatients())
        dispatch(getAgents())
        dispatch(getPartners())
        dispatch(getUsers())
    }, [])

    const patients = useSelector<RootState>(state => state.patient.patients)
    const agents = useSelector<RootState>(state => state.agent.agents)
    const partners = useSelector<RootState>(state => state.partner.partners)
    const users = useSelector<RootState>(state => state.user.users)

    const onFinish = (values: any) => {
        //person-плательщик(patient && agent)
        console.log(values)
        //@ts-ignore
        const resultValuePersonId = values.recipient ? [...patients, ...agents].find(person => person.id === values.payer).id : null
        //user-получатель(agent, partner, user)
        //@ts-ignore
        const resultValueUserId = values.payer ? [...agents, ...partners, ...users].find(user => user.id === values.recipient).id: null

        //Получение валидной даты
        const resultDate = dateRefactor(values.date._d.toLocaleDateString())
        const resultPaymentType = paymentTypeRefactor(values.paymentType)

        const resultValues = {
            "date": resultDate,
            "personId": resultValuePersonId,
            "userId": resultValueUserId,
            "sum": `${values.sum}`,
            "statusId": resultPaymentType,
            "comment": values.comment
        }

        console.log('Файл загружаю, пишу про успешное добавление:', resultValues);
        // console.log(`resultValuePerson: ${resultValuePerson} \n resultValueUser: ${resultValueUser}`)

        //отправить на сервер
        dispatch(addPayment(resultValues))
        setAlertSuccessful(true)
        setTimeout(() => {
            setAlertSuccessful(false)
        }, 500)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Файл не загружаю, вывожу ошибки', errorInfo);
    };

    const onFinishOnly = () => {
    }

    const config = {
        rules: [{type: 'object' as const, required: true, message: 'Выберите дату'}],
    };
    return (
        <>
            <Form
                name="paymentAdd"
                labelCol={{span: 8}}
                wrapperCol={{span: 8}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item name="date" label="Дата" {...config}>
                    <DatePicker placeholder={'Выберите дату'}/>
                </Form.Item>

                <Form.Item
                    name="payer"
                    label="Плательщик"
                    hasFeedback
                    rules={[{required: false, message: 'Выберите плательщика!'}]}
                >
                    <Select placeholder="Выберите плательщика">
                        <Option value={null}>Нет плательщика</Option>

                        {/*@ts-ignore*/}
                        {patients.map(patient => <Option
                            value={patient.id}>{patient.lastName} {patient.firstName} {patient.patronymic} [пациент]</Option>)}
                        {/*@ts-ignore*/}
                        {/*{agents.map(agent => <Option*/}
                        {/*    value={agent.id}>{agent.lastName} {agent.firstName} {agent.patronymic} [агент]</Option>)}*/}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="recipient"
                    label="Получатель"
                    hasFeedback
                    rules={[{required: false, message: 'Выберите получателя!'}]}
                >
                    <Select placeholder="Выберите получателя">
                        {/*/!*@ts-ignore*!/*/}
                        {/*{agents.map(agent => <Option*/}
                        {/*    value={agent.id}>{agent.lastName} {agent.firstName} {agent.patronymic} [агент]</Option>)}*/}
                        {/*/!*@ts-ignore*!/*/}
                        {/*{partners.map(partner => <Option*/}
                        {/*    value={partner.id}>{partner.lastName} {partner.firstName} {partner.patronymic} [партнер]</Option>)}*/}

                        <Option value={null}>Нет получателя</Option>
                        {/*только пользователь или администратор*/}
                        {/*@ts-ignore*/}
                        {users.map(user => <Option
                            value={user.id}>{user.surname} {user.name} {user.patronymic} {user.type === 1 ? '[Администратор]' : '[Пользователь]'}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="paymentType"
                    label="Приход/Расход"
                    hasFeedback
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
                    rules={[{required: true, message: 'Введите сумму!'}]}
                >
                    <Input className={'inputSum'} type={'number'} placeholder={'Введите сумму'}/>
                </Form.Item>

                <Form.Item
                    name="comment"
                    label="Комментарий"
                    hasFeedback
                    rules={[{required: true, message: 'Введите комментарий!'}]}
                >
                    <TextArea rows={4} placeholder={'Введите комментарий'}/>
                </Form.Item>

                <div className={'btn_footer_wrapper'}>
                    <Button onClick={onFinishOnly} type="primary" htmlType="submit" size="large">
                        <SaveOutlined/> {alertSuccessful ? 'Сохранено' : 'Сохранить'}
                    </Button>
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
        </>
    );
};

export default PaymentAdd;