import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Row, Col, theme, Typography, Button, Checkbox, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [open, setOpen] = useState(true);
  const [pattern, setPattern] = useState('redbook');
  const onClose = () => {
    setOpen(false);
  }
  const showDrawer = () => {
    setOpen(true);
  };
  type FieldType = {
    prompt?: string;
    pattern?: string;
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onPatternChange = (value: any) => {
    setPattern(value);
  }
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
    { label: '影音评论', value: 'movie' },
    { label: '游戏评论', value: 'game' },
  ];
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
              initialValues={{ remember: true }}
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
          <Col span={16}>
            <div style={{
              width: "100%",
              borderRadius: 4,
              margin: 8,
            }}>
              ddd
            </div>
          </Col>
        </Row>

      </div>
    </PageContainer>
  )
}

export default MarketingText;


