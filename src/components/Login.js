import React from 'react';
import {Button, Form, Icon, Input, message} from 'antd';
import {Link} from 'react-router-dom';
import {API_ROOT} from "../constants";

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        {/*Method validateFields can be found in Antd Forms*/
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${API_ROOT}/login`, {
                    method: "Post",
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    })
                })
                    .then((response) => {
                        if (response.ok) {
                            {/* Return the token*/
                            }
                            return response.text();
                        }
                        throw new Error(response.stateText);
                    })
                    .then((data) => {
                        console.log('data -> ', data);
                        {/* This prop is a callback function pass from the App*/
                        }
                        this.props.handleLoginSucceed(data)
                        message.success("Login Success")
                    })
                    .catch((err) => {
                        console.log(err);
                        message.error("Login fail")
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <p>Or <Link to="/register">register now!</Link></p>
                </Form.Item>
            </Form>
        );
    }
}

const Login = Form.create({name: 'normal_login'})(NormalLoginForm);
export default Login;