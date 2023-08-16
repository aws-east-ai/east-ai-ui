import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Row, Col, theme, Typography, Button, Space, Form, Input, Radio } from 'antd';
import React, { useState, useEffect } from 'react';

const { Title } = Typography;

const CustomerBot: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');


  useEffect(() => {


  });

  const [chatHeight, setChatHeight] = useState(100);
  const [pattern, setPattern] = useState('redbook');

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
          <Col span={24}>

            <Space.Compact style={{ width: '100%' }}>
              <Input.TextArea
                placeholder='请输入您的问题'
                style={{ height: 100 }} />
              <Button type="primary"
                style={{ height: 100 }} >Submit</Button>
            </Space.Compact>
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
    </PageContainer>
  )
}

export default CustomerBot;


