import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Row, Col, theme, Select, Button, Image, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { productDesign } from '@/services/east-ai/api'
import Icon, { LoadingOutlined } from '@ant-design/icons';

// const { Title } = Typography;

const MarketingText: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  type FieldType = {
    prompt?: string;
    negative_prompt?: string;
    steps?: number;
    sampler?: string;
    seed?: number;
    width?: number;
    height?: number;
    count?: number;
    input_image?: string;
  };

  const onFinish = async (values: any) => {
    // console.log(values)
    setLoading(true);
    const res: API.ProductDesignResponse = await productDesign(values);
    console.log(res);
    setResponse(res["images"]);
    setLoading(false)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const submit = (values: any) => {
  //   console.log("XXX", values);
  //   // writeMarketingText(pattern);
  // }
  const samplers = [
    'euler_a',
    'eular',
    'heun',
    'lms',
    'dpm2',
    'dpm2_a',
    'ddim'
  ];
  const defaultValues = {
    "prompt": "3D product render, futuristic armchair, finely detailed, purism, ue 5, a computer rendering, minimalism, octane render, 4k",
    "negative_prompt": "EasyNegative, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), cropped, text, jpeg artifacts, signature, watermark, username, sketch, cartoon, drawing, anime, duplicate, blurry, semi-realistic, out of frame, ugly, deformed",
    "steps": 30,
    "sampler": "dpm2_a",
    "seed": -1,
    "height": 512,
    "width": 512,
    "count": 1,
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
                label="正向提示词"
                name="prompt"
                rules={[{ required: true, message: '请输入商品特点等内容!' }]}
              >
                <Input.TextArea showCount maxLength={500}
                  placeholder='请输入商品内容，特点等内容!'
                  allowClear
                  style={{ height: 120 }} />
              </Form.Item>

              <Form.Item<FieldType>
                label="反向提示词"
                name="negative_prompt"
                rules={[{ required: true, message: '请输入反向提示词!' }]}
              >
                <Input.TextArea showCount maxLength={500}
                  placeholder='请输入您不想在产品中出现的元素'
                  allowClear
                  style={{ height: 120 }} />
              </Form.Item>

              <Row>
                <Col span={10}>
                  <Form.Item<FieldType>
                    label="采样器"
                    name="sampler"
                    rules={[{ required: true, message: '采样器!' }]}
                  >
                    <Select >
                      {
                        samplers.map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item<FieldType>
                    label="宽"
                    name="width"
                    rules={[{ required: true, message: '宽度!' }]}
                  >
                    <Input allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item<FieldType>
                    label="高"
                    name="height"
                    rules={[{ required: true, message: '高度!' }]}
                  >
                    <Input allowClear
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Form.Item<FieldType>
                    label="种子"
                    name="seed"
                    rules={[{ required: true, message: '种子!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item<FieldType>
                    label="步数"
                    name="steps"
                    rules={[{ required: true, message: '宽度!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                  <Form.Item<FieldType>
                    label="数量"
                    name="count"
                    rules={[{ required: true, message: '图片数量!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
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
                response.map(imgStr => {
                  return <Image
                    src={"data:image/png;base64," + imgStr}
                    style={{
                      maxWidth: 320,
                      maxHeight: 320,
                      border: "solid #fff 1px",
                      margin: "10px",
                      float: "left"
                    }}
                  />
                })
              }

            </div>
          </Col>
        </Row>
      </div>
    </PageContainer>
  )
}

export default MarketingText;


