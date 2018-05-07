import React from 'react';
import propTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect/es';


import {changeUserInput, loginToSystem} from '../../AppRoot/actions';
import {getAuthenticateError, getAuthenticateLoading, getAuthenticateMessage} from '../../AppRoot/selectors';
import {Form, Icon, Input, Button, Layout, Row, Col, Spin, Alert} from 'antd';
import {LOCAL_STORAGE_ID_KEY} from "../../AppRoot/constants";
const FormItem = Form.Item;

const AppWrapper = styled.div`
`;

const emailNameField = 'emailUser';
const passNameField = 'passUser';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static contextTypes = {
        router: propTypes.object,
    };
    componentDidMount() {
        if(localStorage.getItem(LOCAL_STORAGE_ID_KEY.token)) {
            this.context.router.history.push('/');
        }
    }
    /**
     * when initial state username is not null, submit the form to load repos
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loginFn();
            }
        });
    };

    emailUser = '';
    passUser = '';

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        switch (name) {
            case emailNameField:
                this.emailUser = target.value;
                break;
            default:
                this.passUser = target.value;
        }
        let value = {
            emailUser: this.emailUser,
            passUser: this.passUser,
        };
        this.props.updateUserLoginInput(value);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let errorMsg = '';
        if (!!this.props.message) {
            errorMsg = <Alert message={this.props.message} type="error" closable />;
        }
        return (
            <AppWrapper>
                <Helmet>
                    <title>Login Page</title>
                    <meta name="description" content="A React.js Boilerplate application homepage" />
                </Helmet>
                <Layout>
                    <Row>
                        <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 10, offset: 7 }} lg={{ span: 6, offset: 9 }}>
                            <Spin spinning={this.props.loading}>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem>
                                        {getFieldDecorator('emailUser', {
                                            rules: [{
                                                type: 'email', message: 'The input is not valid E-mail!',
                                            }, { required: true, message: 'Please input your Email!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name={emailNameField} placeholder="Email" onChange={this.handleChange} />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} name={passNameField} type="password" placeholder="Password" onChange={this.handleChange} />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button disabled={this.props.loading} type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                    </FormItem>
                                    {errorMsg}
                                </Form>
                            </Spin>
                        </Col>
                    </Row>
                </Layout>
            </AppWrapper>
        );
    }
}

LoginPage.propTypes = {
    loading: propTypes.bool,
    error: propTypes.oneOfType([
        propTypes.object,
        propTypes.bool,
    ]),
    message: propTypes.string,
    loginFn: propTypes.func,
    updateUserLoginInput: propTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        loginFn: () => dispatch(loginToSystem()),
        updateUserLoginInput: (userInput) => dispatch(changeUserInput(userInput)),
    };
}

const mapStateToProps = createStructuredSelector({
    message: getAuthenticateMessage(),
    loading: getAuthenticateLoading(),
    error: getAuthenticateError(),
});

const WrappedNormalLoginForm = Form.create()(LoginPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
