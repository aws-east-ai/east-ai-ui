import { inpaint } from '@/services/east-ai/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  theme,
  Upload,
} from 'antd';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

// const { Title } = Typography;

const Inpaint: React.FC = () => {
  const { token } = theme.useToken();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input_image, setInput_image] = useState();

  type FieldType = {
    model_id?: string;
    prompt?: string;
    negative_prompt?: string;
    steps?: number;
    sampler?: string;
    seed?: number;
    count?: number;
    input_image?: string;
    sam_prompt?: string;
  };

  const toHttpImage = (s3_url: string) => {
    return s3_url.replace('s3://east-ai-workshop', 'https://d1onssyrnp1eaq.cloudfront.net');
  };
  const onFinish = async (values: any) => {
    // console.log(values)
    setLoading(true);
    if (input_image && input_image.length > 1) {
      values.input_image = input_image;
    }
    const res: API.InpaintResponse = await inpaint(values);
    // console.log(res);
    setResponse(res['images']);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // const submit = (values: any) => {
  //   console.log("XXX", values);
  //   // writeMarketingText(pattern);
  // }
  const samplers = ['euler_a', 'eular', 'heun', 'lms', 'dpm2', 'dpm2_a', 'ddim'];
  const defaultValues = {
    negative_prompt:
      '(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, disfigured, gross proportions',
    steps: 30,
    sampler: 'ddim',
    seed: -1,
    count: 1,
    model_id: 'product_design',
    sam_prompt: '',
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.success) {
        setInput_image(info.file.response.data);
      } else {
        message.error(info.file.response.message);
      }
      setLoading(false);
    }
  };
  const beforeUpload = (file: RcFile) => {
    const isImage =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isImage) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt = file.size / 1024 / 1024 < 5;
    if (!isLt) {
      message.error('Image must smaller than 5MB!');
    }
    // message.info(file.name);
    // console.log(file)
    // return false;
    return isImage && isLt;
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
              <Form.Item<FieldType> label="模型选择" name="model_id">
                <Select>
                  <Select.Option value="product_design">抠图渲染模型</Select.Option>
                  <Select.Option value="product_inpaint">备用模型</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item<FieldType>
                label="产品图片"
                name="input_image"
                rules={[{ required: true, message: '请上传原始图片!' }]}
                valuePropName="fieldList"
              >
                <Upload
                  name="file"
                  action="/api/upload"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                >
                  {input_image ? (
                    <img
                      src={toHttpImage(input_image)}
                      alt="avatar"
                      style={{ maxHeight: 320, maxWidth: 320 }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <Form.Item<FieldType>
                label="产品描述"
                name="sam_prompt"
                rules={[{ required: true, message: '请描述您上传图片的中需要保留的内容!' }]}
              >
                <Input placeholder="请描述您上传图片的中需要保留的内容!" />
              </Form.Item>
              <Form.Item<FieldType>
                label="背景提示词"
                name="prompt"
                rules={[{ required: true, message: '请输入重绘内容!' }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="除了保留的内容，其他地方您想画什么？"
                  allowClear
                  style={{ height: 120 }}
                />
              </Form.Item>

              <Form.Item<FieldType>
                label="避免出现在画面中的内容"
                name="negative_prompt"
                rules={[{ required: true, message: '请输入反向提示词!' }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="请输入您不想在重会区域中出现的内容"
                  allowClear
                  style={{ height: 120 }}
                />
              </Form.Item>

              <Row>
                <Col span={24}>
                  <Form.Item<FieldType>
                    label="图片数量"
                    name="count"
                    rules={[{ required: true, message: '图片数量!' }]}
                  >
                    <InputNumber min={1} max={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ display: 'none' }}>
                <Col span={24}>
                  <Form.Item<FieldType>
                    label="种子"
                    name="seed"
                    rules={[{ required: true, message: '种子!' }]}
                  >
                    <InputNumber />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="采样器"
                    name="sampler"
                    rules={[{ required: true, message: '采样器!' }]}
                  >
                    <Select>
                      {samplers.map((s) => (
                        <Select.Option key={s} value={s}>
                          {s}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="步数"
                    name="steps"
                    rules={[{ required: true, message: '步数!' }]}
                  >
                    <InputNumber min={5} max={50} />
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
            <div
              style={{
                width: '100%',
                borderRadius: 4,
                margin: 8,
              }}
            >
              {loading ? (
                <div>
                  <LoadingOutlined />
                </div>
              ) : null}
              {response.map((imgStr, i) => {
                return (
                  <Image
                    key={i}
                    src={'data:image/png;base64,' + imgStr}
                    style={{
                      maxWidth: 320,
                      maxHeight: 320,
                      border: 'solid #fff 1px',
                      margin: '10px',
                      float: 'left',
                    }}
                  />
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    </PageContainer >
  );
};

export default Inpaint;
