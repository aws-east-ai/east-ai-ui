import { productDesign } from '@/services/east-ai/api';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
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

const MarketingText: React.FC = () => {
  const intl = useIntl();
  const { token } = theme.useToken();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input_image, setInput_image] = useState();
  const [model_id, setModel_id] = useState('product_design');

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
    style_preset?: string;
  };

  const onFinish = async (values: any) => {
    // console.log(values)
    setLoading(true);
    values.prompt = `3D product render, ${values.prompt}, finely detailed, purism, ue 5, a computer rendering, minimalism, octane render, 4k`;
    if (input_image && input_image.length > 1) {
      values.input_image = input_image;
    }
    const res: API.ProductDesignResponse = await productDesign(values);
    // console.log(res);
    if (res.error) {
      message.error(res.error);
      setLoading(false);
      return;
    }
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
  const style_presets = [
    'enhance',
    'anime',
    'photographic',
    'digital-art',
    'comic-book',
    'fantasy-art',
    'analog-film',
    'neon-punk',
    'isometric',
    'low-poly',
    'origami',
    'line-art',
    'craft-clay',
    'cinematic',
    '3d-model',
    'pixel-art',
  ];

  const defaultValues = {
    prompt: 'futuristic armchair',
    negative_prompt:
      'EasyNegative, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), cropped, text, jpeg artifacts, signature, watermark, username, sketch, cartoon, drawing, anime, duplicate, blurry, semi-realistic, out of frame, ugly, deformed',
    steps: 30,
    sampler: 'dpm2_a',
    seed: -1,
    height: 512,
    width: 512,
    count: 1,
    model_id: 'product_design',
    style_preset: '3d-model',
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
  const handleModelChange = (value: string) => {
    // alert(value);
    setModel_id(value);
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Button icon={<PlusOutlined />}>
          {intl.formatMessage({ id: 'pages.common.buttonUpload' })}
        </Button>
      )}
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
              <Form.Item<FieldType>
                label={intl.formatMessage({
                  id: 'pages.productDesign.modelId.title',
                })}
                name="model_id"
              >
                <Select onChange={handleModelChange}>
                  <Select.Option value="product_design">
                    {intl.formatMessage({ id: 'pages.productDesign.model.realityStyle' })}
                  </Select.Option>
                  <Select.Option value="bedrock_sdxl">
                    {intl.formatMessage({ id: 'pages.productDesign.model.bedrockSDXL' })}
                  </Select.Option>
                </Select>
              </Form.Item>
              {model_id === 'product_design' ? (
                <Form.Item<FieldType>
                  label={intl.formatMessage({
                    id: 'pages.productDesign.inputImage.title',
                  })}
                  name="input_image"
                  valuePropName="fieldList"
                >
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
                        src={'/api/s3-image/' + input_image}
                        alt="product image"
                        style={{ maxHeight: 320, maxWidth: 320 }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              ) : null}
              <Form.Item<FieldType>
                label={intl.formatMessage({
                  id: 'pages.productDesign.prompt.title',
                })}
                name="prompt"
                rules={[{ required: true }]}
              >
                <Input.TextArea showCount maxLength={500} allowClear style={{ height: 120 }} />
              </Form.Item>

              <Form.Item<FieldType>
                label={intl.formatMessage({
                  id: 'pages.productDesign.nprompt.title',
                })}
                name="negative_prompt"
                rules={[{ required: true }]}
              >
                <Input.TextArea showCount maxLength={500} allowClear style={{ height: 120 }} />
              </Form.Item>

              <Row>
                <Col span={8}>
                  <Form.Item<FieldType>
                    label={intl.formatMessage({
                      id: 'pages.productDesign.width.title',
                    })}
                    name="width"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={128} max={model_id === 'product_design' ? 1024 : 768} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<FieldType>
                    label={intl.formatMessage({
                      id: 'pages.productDesign.height.title',
                    })}
                    name="height"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={128} max={model_id === 'product_design' ? 1024 : 768} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  {model_id === 'product_design' ? (
                    <Form.Item<FieldType>
                      label={intl.formatMessage({
                        id: 'pages.productDesign.count.title',
                      })}
                      name="count"
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={1} max={4} />
                    </Form.Item>
                  ) : null}
                  {model_id === 'bedrock_sdxl' ? (
                    <Form.Item<FieldType>
                      label={intl.formatMessage({
                        id: 'pages.productDesign.stylePreset.title',
                      })}
                      name="style_preset"
                    >
                      <Select>
                        {style_presets.map((s) => (
                          <Select.Option key={s} value={s}>
                            {s}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ) : null}
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
