import { Form, Input, Button, Checkbox, DatePicker, Select, InputNumber } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './RemovePayment.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, putPayment } from '../../actions';

const { Option } = Select;


const RemovePayment = (props: any) => {
  //@ts-ignore
  const payers = useSelector(state => state.additional.payers)
  //@ts-ignore
  const recipients = useSelector(state => state.additional.payers)
  //@ts-ignore
  const payments = useSelector(state => state.payment.payments)

  const removeId = props.removeId



  const dispatch = useDispatch()

  const onFinish = (values: any) => {
    //получение user из общего списка

    const resultValuePerson = payers.filter((payer:any) => (payer.firstName == values.payer.split(' ')[1]) &&
      (payer.lastName == values.payer.split(' ')[0]) && (payer.patronymic == values.payer.split(' ')[2]))

    const resultValueUser = recipients.filter((recipient:any) => (recipient.firstName == values.recipient.split(' ')[1]) &&
      (recipient.lastName == values.recipient.split(' ')[0]) && (recipient.patronymic == values.recipient.split(' ')[2]))

    const statusCode = (status:any) => {
      if (status === 'создан') return 1
      if (status === 'отправлен') return 2
      if (status === 'поступил') return 3
    }

    const resultDate = (date = values.date._d.toLocaleDateString()) => {
      const arrDate = date.split('.')
      const year = arrDate[2]
      const month = arrDate[1]
      const day = arrDate[0]
      return `${year}.${month}.${day}`
    }


    const resultValues = {
      "date":resultDate(),
      "personId": resultValuePerson[0].id,
      "userId":1,
      "sum":`${values.sum}.00`,
      "statusId":statusCode(values.status),
      "comment":`${values.user.introduction}`
    }
    console.log('Success: 111', (resultValues));

    //отправить на сервер

      dispatch(putPayment(removeId, resultValues))
      props.setPopup(false)

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  function onChange(value: any) {
    console.log(`selected ${value}`);
  }

  function onSearch(val: any) {
    console.log('search:', val);
  }


  const initialValues = (payments.filter((payment:any) => payment.id == removeId))[0]
  console.log(initialValues)

  return (
    <div className={'container'} onClick={(e) => {
      // @ts-ignore
      if (e.target.className === 'container') props.setPopup(false)
    }}>

      <div className={'popup_wrapper'}>
        <div className={'btn_close'}>
          <CloseOutlined onClick={() => props.setPopup(false)} />
        </div>
        <div className={'form'}>

          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Дата'
              name='date'
              rules={[{ required: true, message: 'Выберите дату!' }]}
            >
              <DatePicker
                placeholder={initialValues.person.created.split(' ')[0] || 'Выберите дату'}
              />
            </Form.Item>

            <Form.Item
              name='payer'
              label='Плательщик'
              rules={[{ required: true, message: 'Выберите плательщика!' }]}
              initialValue={`${initialValues.person.lastName} ${initialValues.person.firstName} ${initialValues.person.patronymic}`}
            >
              <Select
                showSearch
                placeholder='Выберите плательщика'
                optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {/*//добавить map*/}
                {payers.map((payer:any, i:any) => <Option key={i} value={payer.lastName+' '+payer.firstName+' '+payer.patronymic}>{payer.lastName+' '+payer.firstName+' '+payer.patronymic}</Option>)}
              </Select>
            </Form.Item>

            {/*<Form.Item*/}
            {/*  name='typePayer'*/}
            {/*  label='Тип плательщика:'*/}
            {/*  rules={[{ required: true, message: 'Выберите плательщика!' }]}*/}
            {/*>*/}
            {/*  <Select*/}
            {/*    showSearch*/}
            {/*    placeholder='Выберите плательщика'*/}
            {/*    optionFilterProp='children'*/}
            {/*    onChange={onChange}*/}
            {/*    onSearch={onSearch}*/}
            {/*    filterOption={(input: any, option: any) =>*/}
            {/*      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
            {/*    }*/}
            {/*  >*/}
            {/*//добавить map*/}
            {/*    <Option value='red'>Red</Option>*/}
            {/*    <Option value='green'>Green</Option>*/}
            {/*    <Option value='blue'>Blue</Option>*/}
            {/*  </Select>*/}
            {/*</Form.Item>*/}

            <Form.Item
              name='recipient'
              label='Получатель'
              rules={[{ required: true, message: 'Выберите полкчателя!' }]}
              initialValue={initialValues.user.username}
            >
              <Select
                showSearch
                placeholder='Выберите получателя'
                optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {/*//добавить map*/}
                {/*{recipients.map((recipient:any, i:any) => <Option key={i} value={recipient.lastName+' '+recipient.firstName+' '+recipient.patronymic}>{recipient.lastName+' '+recipient.firstName+' '+recipient.patronymic}</Option>)}*/}
                <Option value={'admin'}>Администратор</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name='status'
              label='Статус'
              rules={[{ required: true, message: 'Выберите статус!' }]}
              initialValue={initialValues.status.name}
            >
              <Select
                showSearch
                placeholder='Выберите статус'
                optionFilterProp='children'
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {/*//добавить map*/}
                <Option value='создан'>создан</Option>
                <Option value='отправлен'>отправлен</Option>
                <Option value='поступил'>поступил</Option>
              </Select>
            </Form.Item>


            <Form.Item initialValue={Number(initialValues.sum)} label='Сумма' name='sum' rules={[{ required: true, message: 'Выберите сумму!' }]}>
              <InputNumber type={'number'} min={1} max={1000000} />
            </Form.Item>

            <Form.Item initialValue={initialValues.comment} name={['user', 'introduction']} label='Комментарий'
                       rules={[{ required: true, message: 'Введите комментарий!' }]}
            >
              <Input.TextArea />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                {props.btnText}
              </Button>
            </Form.Item>
          </Form>
        </div>


      </div>
    </div>


  );
};

export default RemovePayment;