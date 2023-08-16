import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'CS East GenAI Workshop',
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
          title: '亚马逊云科技',
          href: 'https://www.amazonaws.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
