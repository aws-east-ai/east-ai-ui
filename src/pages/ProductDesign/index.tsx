import { productDesign } from '@/services/east-ai/api';
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

const MarketingText: React.FC = () => {
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
    width?: number;
    height?: number;
    count?: number;
    input_image?: string;
  };

  const onFinish = async (values: any) => {
    // console.log(values)
    setLoading(true);
    if (input_image && input_image.length > 1) {
      values.input_image = input_image;
    }
    const res: API.ProductDesignResponse = await productDesign(values);
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
    prompt:
      'futuristic armchair',
    negative_prompt:
      'EasyNegative, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), cropped, text, jpeg artifacts, signature, watermark, username, sketch, cartoon, drawing, anime, duplicate, blurry, semi-realistic, out of frame, ugly, deformed',
    steps: 30,
    sampler: 'dpm2_a',
    seed: -1,
    height: 512,
    width: 512,
    count: 1,
    model_id: 'product_design',
  };

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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <Button icon={<PlusOutlined />} >上传</Button>}
    </div>
  );
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
                  <Select.Option value="product_design">真实风格模型</Select.Option>
                  <Select.Option value="product_inpaint">备用模型</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item<FieldType> label="参考图片（可选）" name="input_image"
                valuePropName="fieldList">
                <Upload
                  name="file"
                  action="/api/upload"
                  className="avatar-uploader"
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                  showUploadList={false}
                >
                  {input_image ? (
                    <img
                      src={"/api/s3-image/" + input_image}
                      alt="product image"
                      style={{ maxHeight: 320, maxWidth: 320 }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <Form.Item<FieldType>
                label="生成内容提示词"
                name="prompt"
                rules={[{ required: true, message: '请输入商品特点等内容!' }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={500}
                  placeholder="请输入商品特点等内容!"
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
                  placeholder="请输入您不想在产品中出现的元素"
                  allowClear
                  style={{ height: 120 }}
                />
              </Form.Item>

              <Row>
                <Col span={8}>
                  <Form.Item<FieldType>
                    label="宽(px)"
                    name="width"
                    rules={[{ required: true, message: '宽度!' }]}
                  >
                    <InputNumber min={128} max={1024} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<FieldType>
                    label="高(px)"
                    name="height"
                    rules={[{ required: true, message: '高度!' }]}
                  >
                    <InputNumber min={128} max={1024} />
                  </Form.Item>
                </Col>
                <Col span={8}>
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
    </PageContainer>
  );
};

export default MarketingText;
