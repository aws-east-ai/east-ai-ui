import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Row, Col, theme, Typography, Button, Avatar, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { writeMarketingText } from '@/services/east-ai/api'
import Icon, { LoadingOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';

// const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [pattern, setPattern] = useState('redbook');
  const [response, setResponse] = useState();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  type FieldType = {
    prompt?: string;
    pattern?: string;
  };

  const onFinish = async (values: any) => {
    values.history = history;
    setLoading(true);
    const res: API.MarketingTextResponse = await writeMarketingText(values);
    // console.log(res);
    setLoading(false)

    history.unshift(res.history[res.history.length - 1])
    setResponse(res.response);
    setHistory(history)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onPatternChange = (value: any) => {
    setPattern(value);
    setHistory([]);
  }
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
    background: "#333",
    padding: 5,
    // display: "flex",
    // flexDirection: "row",
    // flexWrap: "wrap"
  }

  const defaultValues = {
    prompt: "汽车",
    pattern: "redbook"
  }

  return (
    <PageContainer
      waterMarkProps={{
        content: ""
      }}
    >
      <div style={{
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
                <Input.TextArea showCount maxLength={500}
                  placeholder='请输入商品特性，描述等内容!'
                  allowClear
                  style={{ height: 180 }} />
              </Form.Item>

              <Form.Item<FieldType>
                label="风格"
                name="pattern"
              >
                <Radio.Group
                  options={patterns}
                  onChange={onPatternChange}
                  value={pattern}
                  optionType="button"
                  buttonStyle='solid'
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  开始生成
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={1}></Col>
          <Col span={14}>
            <div style={{
              width: "100%",
              borderRadius: 4,
              margin: 8,
            }}>
              <div style={comego}>
                {
                  history.length == 0 && <div>输入您的商品描述开始撰写文案，持续聊天可以进行修改。</div>
                }
                {
                  loading ? <div><LoadingOutlined /></div> : null
                }
                {
                  history.map(item => (
                    <div style={{
                      marginBottom: 10
                    }}>
                      <Row>
                        <Col flex="auto" style={{ textAlign: "right", paddingLeft: 60, margin: "8px 4px" }}>{item[0]}</Col>
                        <Col flex="40px" style={{ textAlign: "center" }}>
                          <Avatar size={32} icon={<UserOutlined />} />
                        </Col>
                      </Row>
                      <Row>
                        <Col flex="40px" style={{ textAlign: "center" }}>
                          <Avatar size={32} icon={<RobotOutlined />} />
                        </Col>
                        <Col flex="auto" style={{ paddingRight: 100, maxWidth: "90%" }}>{item[1]}</Col>
                      </Row>
                    </div>
                  ))
                }
              </div>
            </div>
          </Col>
        </Row>

      </div>
    </PageContainer>
  )
}

export default MarketingText;


