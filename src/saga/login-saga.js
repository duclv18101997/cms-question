import { put, call } from 'redux-saga/effects'
import LoginActions from '../redux/login-redux'
import axios from 'axios'

// const httpclient = axios.create()
// httpclient.defaults.timeout = 3000

const LoginSagas = {
    *loginUser(action) {
        try {
            const userInfor = yield call(() => {
                return axios.post('http://27.72.88.246:8228/api/login/', action.data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            })
            console.log('userInfor: ', userInfor)
            if (userInfor.data.ErrorCode) {
                yield put(LoginActions.loginFailed(userInfor.data.ErrorCode))
            } else {
                window.localStorage.setItem('token',userInfor.data.data.token)
                yield put(LoginActions.loginSucceed(userInfor.data.data.token))
            }

        } catch (error) {
            console.log(error)
            yield put(LoginActions.loginFailed(error))
        }
    }
}

export default LoginSagas
