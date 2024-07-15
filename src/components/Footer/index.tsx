import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '生成式AI',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      // links={[
      //   {
      //     key: 'Amazon-AWS-CN',
      //     title: intl.formatMessage({
      //       id: 'app.copyright.corp',
      //       defaultMessage: 'AWS',
      //     }),
      //     href: 'https://www.amazonaws.cn/',
      //     blankTarget: true,
      //   },
      // ]}
    />
  );
};

export default Footer;
