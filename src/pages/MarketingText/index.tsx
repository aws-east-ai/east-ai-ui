import { LoadingOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Col, Form, Input, Radio, Row, theme, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from '@umijs/max';

// const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  const intl = useIntl();
  //  const { initialState } = useModel('@@initialState');
  const [pattern, setPattern] = useState('redbook');
  // const [response, setResponse] = useState();
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [model_id, setModel_id] = useState('bedrock_claude3');
  //  const [messageApi, contextHolder] = ant_message.useMessage();

  type FieldType = {
    model_id?: string;
    prompt?: string;
    pattern?: string;
  };
  // const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

  // let sessionHistory = [];

  useEffect(() => {
    let loc = window.location,
      new_uri;
    if (loc.protocol === 'https:') {
      new_uri = 'wss:';
    } else {
      new_uri = 'ws:';
    }
    new_uri += '//' + loc.host;
    new_uri += '/api/chat-bot';
    // console.log("11111111", new_uri)
    // const new_uri = "ws://127.0.0.1:8000/api/chat-bot"
    // console.log(new_uri);
    ws.current = new WebSocket(new_uri);
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    let curA = "", curQ = "";

    ws.current.onmessage = (e) => {
      const revStr = e.data;
      let jObject;
      try {
        jObject = JSON.parse(revStr);
      } catch (e) { }
      // console.log("rev: ", jObject)
      if (jObject && jObject.status === 'done') {
        history.push([curQ, curA]);
        setHistory(history);
        if (history.length > 0) {
          setMessage('');
        }
        setQuestion('');
        curA = "", curQ = "";
        setLoading(false);
      } else if (jObject && jObject.status === 'begin') {
        curQ = jObject.question;
        setQuestion(curQ);
      } else {
        curA += revStr;
        setMessage((prev) => prev + revStr);
      }
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, [history]);

  const onFinish = async (values: any) => {
    values.history = history;
    setLoading(true);
    // console.log(ws.current);
    if (ws.current.readyState === 1) {
      ws.current.send(JSON.stringify(values));
    } else {
      console.log('error, socket closed.');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onPatternChange = (value: any) => {
    setPattern(value);
    setHistory([]);
  };
  const handleModelChange = (value: string) => {
    setModel_id(value);
    setHistory([]);
  };

  const patterns = [
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.redbook',
      }), value: 'redbook'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.zhihu',
      }), value: 'zhihu'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.weibo',
      }), value: 'weibo'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.gongzhonghao',
      }), value: 'gongzhonghao'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.dianping',
      }), value: 'dianping'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.toutiao',
      }), value: 'toutiao'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.zhidemai',
      }), value: 'zhidemai'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.douyin',
      }), value: 'douyin'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.kuaishou',
      }), value: 'kuaishou'
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.twitter',
      }), value: "twitter"
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.instagram',
      }), value: "instagram"
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.tiktok',
      }), value: "tiktok"
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.youtube',
      }), value: "youtube"
    },
    {
      label: intl.formatMessage({
        id: 'pages.marketingText.patterns.medium',
      }), value: "medium"
    },
    { label: 'Freestyle', value: 'freestyle' },
  ];
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
      id: 'pages.marketingText.prompt.defaultValue',
    }),
    pattern: 'redbook',
    model_id: 'bedrock_claude3',
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
                  id: 'pages.marketingText.modelId.title',
                })}
                name="model_id"
              >
                <Select onChange={handleModelChange}>
                  <Select.Option value="bedrock_claude3">
                    {intl.formatMessage({ id: 'pages.marketingText.model.bedrockClaude3' })}
                  </Select.Option>
                  <Select.Option value="bedrock_claude2">
                    {intl.formatMessage({ id: 'pages.marketingText.model.bedrockClaude2' })}
                  </Select.Option>
                  <Select.Option value="chatglm2">
                    {intl.formatMessage({ id: 'pages.marketingText.model.chatglm2' })}
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<FieldType>
                label={intl.formatMessage({
                  id: 'pages.marketingText.prompt.title',
                })}
                name="prompt"
                rules={[{
                  required: true, message: intl.formatMessage({
                    id: 'pages.marketingText.prompt.required',
                  })
                }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder={intl.formatMessage({
                    id: 'pages.marketingText.prompt.placeholder',
                  })}
                  allowClear
                  style={{ height: 180 }}
                />
              </Form.Item>

              <Form.Item<FieldType>
                label={intl.formatMessage({
                  id: 'pages.marketingText.style.title',
                })} name="pattern">
                <Radio.Group
                  options={patterns}
                  onChange={onPatternChange}
                  value={pattern}
                  optionType="button"
                  buttonStyle="solid"
                  disabled={loading}
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
                  <div>{intl.formatMessage({ id: 'pages.marketingText.result.help' })} </div>
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
                        <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                          {item[1]}
                        </pre>
                      </Col>
                    </Row>
                  </div>
                ))}
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
                      <pre style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                        {message}
                      </pre>
                    </Col>
                  </Row>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default MarketingText;
