import { PageContainer } from '@ant-design/pro-components';
import { useModel, useIntl } from '@umijs/max';
import { Avatar, Button, Col, Form, Input, Row, theme, Image } from 'antd';
import React, { useState } from 'react';
import { LoadingOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { agentTask } from '@/services/east-ai/api';

const Agent: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');

  type FieldType = {
    prompt?: string;
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    console.log('Success:', values);

    const res = await agentTask(values);
    // console.log(res);

    history.unshift([values["prompt"], res]);
    console.log(history);
    setHistory(history);
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

  const comego = {
    margin: 4,
    borderRadius: 4,
    background: '#333',
    padding: 5,
    fontSize: '16pt',
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap"
  };


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
                <div
                  style={{
                    width: '100%',
                    borderRadius: 4,
                    margin: 8,
                  }}
                >
                  <div style={comego}>
                    {history.length === 0 && !loading && (
                      <div>{intl.formatMessage({ id: 'pages.agent.result.help' })} </div>
                    )}

                    {loading ? (
                      <div>
                        <LoadingOutlined /> AI is thinking...
                      </div>
                    ) : null}
                    {history.length > 0 && history.map((item, idx) => (
                      <div
                        style={{
                          marginBottom: 10,
                        }}
                        key={"XXX" + idx}
                      >
                        <Row justify="end">
                          <Col
                            flex="1"
                            style={{
                              textAlign: 'left',
                              paddingLeft: 100,
                              margin: '8px 4px',
                              fontSize: '16pt',

                            }}
                          >
                            <div style={{ backgroundColor: '#666', width: 'auto', padding: '5px', borderRadius: '4px', marginBottom: "25px" }}>
                              {item[0]}
                            </div>
                          </Col>
                          <Col flex="40px" style={{ textAlign: 'center', marginTop: "8px" }}>
                            <Avatar size={32} icon={<UserOutlined />} />
                          </Col>
                        </Row>
                        <Row>
                          <Col flex="40px" style={{ textAlign: 'center', marginTop: "4px" }}>
                            <Avatar size={32} icon={<RobotOutlined />} />
                          </Col>
                          <Col
                            flex="auto"
                            style={{
                              paddingRight: 100,
                              maxWidth: '90%',
                              fontSize: '16pt',
                              lineHeight: '1.5',
                              marginBottom: "30px"
                            }}
                          >
                            <>
                              <Image
                                key={"img" + idx}
                                src={'data:image/png;base64,' + item[1].images[0]}
                                style={{
                                  maxWidth: 320,
                                  maxHeight: 320,
                                  border: 'solid #fff 1px',
                                  margin: '10px',
                                  float: 'left',
                                }}
                              /><br />
                              {
                                (item[1].images_path) ? <>
                                  请尝试输入：请将以下图片 ({item[1].images_path[0]}) {item[1]["object"]} 中的背景替换为雪山
                                </> : null

                              }
                            </>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Col>
          </Row>

        </div>
      </Form>
    </PageContainer>
  )
}

export default Agent;


