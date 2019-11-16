import { message } from 'antd'

const errorSaga = {
  *handleError(action) {
    console.log(action)
    if (action.error === 807) {
      message.error('Username or password is incorrect. Please try again!')
    } else if (action.error === 307) {
      message.error('question content is available!')
    } else if (action.error === 309) {
      message.error('must be at least 1 correct answer!')
    } else if (action.error === 106) {
      message.error('Login session has expired. Please login again!', 1)
      window.localStorage.removeItem('token')
    } else {
      message.error('An error occurred. Please try again!')
    }
  }
}

export default errorSaga
