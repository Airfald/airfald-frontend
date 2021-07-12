import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import {
  useHistory
} from 'react-router-dom'
import { routePaths } from '@src/routes'
import Storage from '@src/utils/storage'
import { sleep } from '@src/utils/tools'
import * as commonService from '@src/services/common'
import request from '@src/services/request'

import './index.scss'

const prefixCls = 'login'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const formRules = {
  username: [{ required: true, message: 'Please input your username!' }],
  password: [{ required: true, message: 'Please input your password!' }]
}

const Login: React.FC = () => {
  const history = useHistory()

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const { username, password } = values
    // TODO clear catch

    try {
      const res = await commonService.login({
        username,
        password
      })
      message.success('登录成功')
      request.instance.defaults.headers.common['authorization'] = `Bearer ${res.access_token}`
      Storage.set('token', res.access_token)

      await sleep(1000)
      history.push(routePaths.home)
    } catch (error) {
      message.error(error.message)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-panel`}>
        <div className={`${prefixCls}-panel-title`}>
          登录
        </div>
        <Form
          {...layout}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={formRules.username}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={formRules.password}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <span style={{ marginLeft: '10px' }}>Tip: (admin/123456)</span>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
