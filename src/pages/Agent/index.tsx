import { PageContainer } from '@ant-design/pro-components';
import { useModel, useIntl } from '@umijs/max';
import { Row, Col, theme, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { agentTask } from '@/services/east-ai/api';

const CustomerBot: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  type FieldType = {
    prompt?: string;
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log('Success:', values);

    const res = await agentTask(values);
    console.log(res);
    // if (res.error) {
    //   message.error(res.error);
    //   setLoading(false);
    //   return;
    // }
    // setResponse(res['images']);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const defaultValues = {
    prompt: ""
  }


  return (
    <PageContainer
      waterMarkProps={{
        content: ""
      }}
    >

      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        initialValues={defaultValues}
      >

        <div style={{
          color: token.colorTextHeading,
        }}
        >
          <Row>
            <Col span={22}>
              <Form.Item<FieldType>
                name="prompt"
                rules={[{
                  required: true, message: intl.formatMessage({
                    id: 'pages.Agent.prompt.required',
                  })
                }]}
              >
                <Input.TextArea
                  placeholder={intl.formatMessage({
                    id: 'pages.Agent.input.placeholder',
                  })}
                  style={{ height: 100 }} />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item wrapperCol={{ offset: 1, span: 2 }}>
                <Button type="primary" htmlType="submit" disabled={loading}
                  style={{ height: 100, }} >
                  {intl.formatMessage({
                    id: 'pages.common.buttonBeginGen',
                  })}
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div style={{
                minHeight: 600,
                background: '#333',
                marginTop: 10,
                borderRadius: 5
              }}>

              </div>
            </Col>
          </Row>

        </div>
      </Form>
    </PageContainer>
  )
}

export default CustomerBot;


