import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Row, Col, theme, Typography, Button, Checkbox, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { writeMarketingText } from '@/services/east-ai/api'
import Icon, { LoadingOutlined } from '@ant-design/icons';

// const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [pattern, setPattern] = useState('redbook');
  const [response, setResponse] = useState('请编写您的商品的名称，特性，卖点，关键词等');
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
    background: "#333"
  }
  const left = {
    textAlign: "left",
    marginRight: 120,
    padding: 10
  }
  const right = {
    textAlign: "left",
    marginLeft: 120,
    padding: 10
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
              {
                loading ? <div><LoadingOutlined /></div> : null
              }
              {
                history.map(item => (
                  <div style={comego}>
                    <div style={left}>{item[0]}</div>
                    <div style={right}>{item[1]}</div>
                  </div>
                ))
              }
            </div>
          </Col>
        </Row>

      </div>
    </PageContainer>
  )
}

export default MarketingText;


