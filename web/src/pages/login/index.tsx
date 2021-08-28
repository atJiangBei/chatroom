import React, { useRef } from 'react'
import { Form, Input, Button } from 'antd'
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import './index.scss'
import request from '../../utils/request'
const Login = (props: any) => {
  const formRef: React.MutableRefObject<any> = useRef(null)
  const onFinish = (values: any) => {
    console.log('Success:', values)
    request.GET("/chat/login", {
      params: {
        ...values
      }
    }).then(res => {
      localStorage.setItem("userInfo", JSON.stringify(res))
      props.history.push('/chat')
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const reset = () => {
    console.log(props)
    formRef.current.resetFields()
  }
  return (
    <div className="login-container">
      <div className="login-content padding-large">
        <h3>用户登录</h3>
        <div>
          <Form
            ref={formRef}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input placeholder="用户名" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button htmlType="button" onClick={reset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
          <p className="ta-right">
            没有账号，<a href="/register">注册</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
