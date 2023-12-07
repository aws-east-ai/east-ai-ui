import { LoadingOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Col, Form, Input, Radio, Row, theme, Select } from 'antd';
import React, { useState } from 'react';
import { useIntl } from '@umijs/max';

// const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  const intl = useIntl();
  //  const { initialState } = useModel('@@initialState');
  // const [response, setResponse] = useState();
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  //  const [messageApi, contextHolder] = ant_message.useMessage();

  type FieldType = {
    prompt?: string;
  };

  const onFinish = async (values: any) => {
    // values.history = history;
    setLoading(true);
    let curA = "";
    setQuestion(values.prompt);
    const decoder = new TextDecoder();
    var url = "/api/bedrock-rag";
    // console.log("values", JSON.stringify(values));
    const response = await fetch(url, {
      method: "POST",
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(values)
    });
    const reader = response.body.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      let strValue = decoder.decode(value);
      console.log(strValue);
      strValue = strValue.replace(/\n/g, "<br />");
      curA += strValue;
      // console.log("N", strValue);
      setMessage((prev) => prev + strValue);
    }
    setLoading(false);
    curA = curA.trim().replace(/^(<br\s*\/?>)*|(<br\s*\/?>)*$/ig, "");
    history.unshift([values.prompt, curA])
    // console.log(history)
    setQuestion("");
    setMessage("");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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

  const defaultValues = {
    prompt: intl.formatMessage({
      id: 'pages.bedrockKB.prompt.defaultValue',
    }),
  };

  return (
    <PageContainer
      waterMarkProps={{
        content: '',
      }}
    >
      <div
        style={{
          color: token.colorTextHeading,
        }}
      >
        <Row>
          <Col span={8}>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              initialValues={defaultValues}
            >
              <Form.Item<FieldType>
                label={intl.formatMessage({
                  id: 'pages.bedrockKB.prompt.title',
                })}
                name="prompt"
                rules={[{
                  required: true, message: intl.formatMessage({
                    id: 'pages.bedrockKB.prompt.required',
                  })
                }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  allowClear
                  style={{ height: 180 }}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={loading}>
                  {intl.formatMessage({
                    id: 'pages.common.buttonBeginGen',
                  })}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={1}></Col>
          <Col span={14}>
            <div
              style={{
                width: '100%',
                borderRadius: 4,
                margin: 8,
              }}
            >
              <div style={comego}>
                {history.length === 0 && !question && (
                  <div>{intl.formatMessage({ id: 'pages.bedrockKB.result.help' })} </div>
                )}
                {question && (
                  <Row>
                    <Col
                      flex="1"
                      style={{
                        textAlign: 'left',
                        paddingLeft: 100,
                        margin: '8px 4px',
                        fontSize: '16pt',
                      }}
                    >
                      <div style={{ backgroundColor: '#666', width: 'auto', padding: '5px', borderRadius: '4px', marginBottom: "25px" }}>{question}</div>
                    </Col>
                    <Col flex="40px" style={{ textAlign: 'center', marginTop: "8px" }}>
                      <Avatar size={32} icon={<UserOutlined />} />
                    </Col>
                  </Row>
                )}

                {loading ? (
                  <div>
                    <LoadingOutlined />
                  </div>
                ) : null}
                {message && (
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
                      <span dangerouslySetInnerHTML={{ __html: message }}></span>
                    </Col>
                  </Row>
                )}

                {history.length > 0 && history.map((item) => (
                  <div
                    style={{
                      marginBottom: 10,
                    }}
                    key={item}
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
                        <div style={{ backgroundColor: '#666', width: 'auto', padding: '5px', borderRadius: '4px', marginBottom: "25px" }}>{item[0]}</div>
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
                        <span dangerouslySetInnerHTML={{ __html: item[1] }}></span>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default MarketingText;
