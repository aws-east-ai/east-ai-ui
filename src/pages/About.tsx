import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';

const AboutPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            fontSize: '20pt',
            fontWeight: 'bold',
          }}
        >
          Authors:
        </div>
        <div
          style={{
            fontSize: '14pt',
          }}
        >
          <ul>
            <li>Liang Fengbiao</li>
            <li>Wu Wantao</li>
            <li>Xiao Yuanjun</li>
            <li>Xie Zhengwei</li>
            <li>Xu Xiaoliang</li>
          </ul>
        </div>
        <div
          style={{
            fontSize: '20pt',
            fontWeight: 'bold',
          }}
        >
          Github:
        </div>
        <div
          style={{
            fontSize: '14pt',
          }}
        >
          <ul>
            <li>
              <a href="https://github.com/aws-east-ai/east-ai-deploy">
                https://github.com/aws-east-ai/east-ai-deploy
              </a>
            </li>
          </ul>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AboutPage;
