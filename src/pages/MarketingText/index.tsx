import { LoadingOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Button, Col, Form, Input, Radio, Row, theme } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

// const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  //  const { initialState } = useModel('@@initialState');
  const [pattern, setPattern] = useState('redbook');
  // const [response, setResponse] = useState();
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  //  const [messageApi, contextHolder] = ant_message.useMessage();

  type FieldType = {
    prompt?: string;
    pattern?: string;
  };
  // const [isPaused, setPause] = useState(false);
  const ws = useRef(null);

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
    console.log(new_uri);
    ws.current = new WebSocket(new_uri);
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onclose = () => console.log('ws closed');

    ws.current.onmessage = (e) => {
      const revStr = e.data;
      let jObject;
      try {
        jObject = JSON.parse(revStr);
      } catch (e) { }

      if (jObject && jObject.status === 'done') {
        setHistory(jObject.history);
        setMessage('');
        setQuestion('');
      } else if (jObject && jObject.status === 'begin') {
        setQuestion(jObject.question);
      } else {
        // console.log(revStr, message);
        setMessage((prev) => prev + revStr);
        setLoading(false);
      }
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  const onFinish = async (values: any) => {
    values.history = history;
    setLoading(true);
    console.log(ws.current);
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
  // const submit = (values: any) => {
  //   console.log("XXX", values);
  //   // writeMarketingText(pattern);
  // }
  const patterns = [
    { label: '小红书', value: 'redbook' },
    { label: '知乎', value: 'zhihu' },
    { label: '微博', value: 'weibo' },
    { label: '公众号', value: 'gongzhonghao' },
    { label: '点评', value: 'dianping' },
    { label: '头条', value: 'toutiao' },
    { label: '值得买', value: 'zhidemai' },
    { label: '抖音', value: 'douyin' },
    { label: '快手', value: 'kuaishou' },
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
    prompt: '汽车',
    pattern: 'redbook',
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
                label="商品描述"
                name="prompt"
                rules={[{ required: true, message: '请输入商品特性，描述等内容!' }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="请输入商品特性，描述等内容!"
                  allowClear
                  style={{ height: 180 }}
                />
              </Form.Item>

              <Form.Item<FieldType> label="风格" name="pattern">
                <Radio.Group
                  options={patterns}
                  onChange={onPatternChange}
                  value={pattern}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={loading}>
                  开始生成
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
                  <div>输入您的商品描述开始撰写文案，持续聊天可以进行修改。</div>
                )}
                {history.map((item) => (
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
                          paddingLeft: 60,
                          margin: '8px 4px',
                          fontSize: '16pt',

                        }}
                      >
                        <div style={{ backgroundColor: '#666', width: 'fit-content', padding: '5px', borderRadius: '4px' }}>{item[0]}</div>
                      </Col>
                      <Col flex="40px" style={{ textAlign: 'center', fontSize: '16pt' }}>
                        <Avatar size={32} icon={<UserOutlined />} />
                      </Col>
                    </Row>
                    <Row>
                      <Col flex="40px" style={{ textAlign: 'center', fontSize: '16pt' }}>
                        <Avatar size={32} icon={<RobotOutlined />} />
                      </Col>
                      <Col
                        flex="auto"
                        style={{
                          paddingRight: 100,
                          maxWidth: '90%',
                          fontSize: '16pt',
                          lineHeight: '1.5',
                        }}
                      >
                        {item[1]}
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
                        paddingLeft: 60,
                        margin: '8px 4px',
                        fontSize: '16pt',

                      }}
                    >

                      <div style={{ backgroundColor: '#666', width: 'fit-content', padding: '5px', borderRadius: '4px' }}>{question}</div>
                    </Col>
                    <Col flex="40px" style={{ textAlign: 'center', }}>
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
                    <Col flex="40px" style={{ textAlign: 'center' }}>
                      <Avatar size={32} icon={<RobotOutlined />} />
                    </Col>
                    <Col
                      flex="auto"
                      style={{
                        paddingRight: 100,
                        maxWidth: '90%',
                        fontSize: '16pt',
                        lineHeight: '1.5',
                      }}
                    >
                      {message}
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
