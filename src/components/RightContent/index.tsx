import { QuestionCircleOutlined } from '@ant-design/icons';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return <div></div>;
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
