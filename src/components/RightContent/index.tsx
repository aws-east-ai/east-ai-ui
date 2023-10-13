
import { SelectLang as UmiSelectLang } from '@umijs/max';
export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  // return <div></div>
  return <UmiSelectLang
    style={{
      padding: 4,
    }}
  />;
};
