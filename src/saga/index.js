import { takeLatest, all } from 'redux-saga/effects'
import { LoginTypes } from '../redux/login-redux'
import { QuestionTypes } from '../redux/question-redux'
import LoginSagas from './login-saga'
import ErrorSagas from './error-saga'
import QuestionSagas from './question-saga'

export default function* root() {
    yield all([
        takeLatest(LoginTypes.LOGIN_REQUEST, LoginSagas.loginUser),
        takeLatest(LoginTypes.LOGIN_FAILED, ErrorSagas.handleError),
        takeLatest(QuestionTypes.QUESTION_GET_REQUEST, QuestionSagas.getData),
        takeLatest(QuestionTypes.QUESTION_GET_DETAIL, QuestionSagas.getDetailData),
        takeLatest(QuestionTypes.QUESTION_ADD_REQUEST, QuestionSagas.addData),
        takeLatest(QuestionTypes.QUESTION_EDIT_REQUEST, QuestionSagas.editData),
        takeLatest(QuestionTypes.QUESTION_DELETE_REQUEST, QuestionSagas.deleteData),
        takeLatest(QuestionTypes.QUESTION_FAILED, ErrorSagas.handleError)
    ])
}