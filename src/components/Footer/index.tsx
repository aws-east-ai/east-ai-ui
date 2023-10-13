import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'AWS CS East Team',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'AWS Global',
          title: 'AWS Global',
          href: 'https://aws.amazon.com/',
          blankTarget: true,
        },
        {
          key: 'Amazon-AWS-CN',
          title: intl.formatMessage({
            id: 'app.copyright.corp',
            defaultMessage: 'AWS',
          }),
          href: 'https://www.amazonaws.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
