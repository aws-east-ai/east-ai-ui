
import { request } from '@umijs/max';



/** 获取当前的用户 GET /api/currentUser */
export async function writeMarketingText(data: API.MarketingTextRequest, options?: { [key: string]: any }) {
  console.log({ ...(options || {}) })
  return request<{
    data: API.MarketingTextResponse;
  }>('/api/write-marketing-text', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}