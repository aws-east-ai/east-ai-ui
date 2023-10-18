import { PageContainer } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const intl = useIntl();
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage: "url('rectangle.png')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        {intl.formatMessage({
          id: 'pages.common.knowMore',
          defaultMessage: 'Know more',
        })}

        {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const intl = useIntl();
  const { token } = theme.useToken();
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
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            {intl.formatMessage({
              id: 'pages.welcome.title',
              defaultMessage: 'AWS Workshop - GenAI for Marketing Scenario',
            })}
          </div>
          <p
            style={{
              fontSize: '16px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            <ul
              className='welcome-brief'
              style={{ paddingLeft: 10 }}
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({
                  id: 'pages.welcome.brief',
                  defaultMessage: '',
                }),
              }}
            ></ul>
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://catalog.us-east-1.prod.workshops.aws/workshops/4aec1efd-5181-46be-b7b1-2ee9292dae80"
              title={intl.formatMessage({
                id: 'pages.welcome.infoCard01.title',
              })}
              desc={intl.formatMessage({
                id: 'pages.welcome.infoCard01.desc',
              })}
            />
            <InfoCard
              index={2}
              title={intl.formatMessage({
                id: 'pages.welcome.infoCard02.title',
              })}
              href="https://aws.amazon.com/generative-ai/"
              desc={intl.formatMessage({
                id: 'pages.welcome.infoCard02.desc',
              })}
            />
            <InfoCard
              index={3}
              title={intl.formatMessage({
                id: 'pages.welcome.infoCard03.title',
              })}
              href="https://aws.amazon.com/"
              desc={intl.formatMessage({
                id: 'pages.welcome.infoCard03.desc',
              })}
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
