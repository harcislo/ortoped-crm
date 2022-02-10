const GET_PAYERS = 'GET_PAYERS'
const SET_SELECTED_ROW = 'SET_SELECTED_ROW'
const SET_PAYMENT = 'SET_PAYMENT'

const initialState = {
  payers: [],
  selectedRowKeys: [],
  payment: {}
}

export const AdditionalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PAYERS:
      return {...state, payers: action.payload}
    case SET_SELECTED_ROW:
      return {...state, selectedRowKeys: action.payload}
    case SET_PAYMENT:
      return {...state, payment: action.payload}

    default:
      return state
  }
}

export const getPayersAction = (payers:any) => ({type: GET_PAYERS, payload: payers})
export const setSelectedRow = (selectedRowKeys: Array<number>) => ({type: SET_SELECTED_ROW, payload: selectedRowKeys})
export const setPayment = (payment: any) => ({type: SET_PAYMENT, payload: payment})
