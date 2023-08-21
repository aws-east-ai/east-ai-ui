
import { request } from '@umijs/max';


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

export async function productDesign(data: API.ProductDesignRequest, options?: { [key: string]: any }) {
  // console.log({ ...(options || {}) })
  // console.log(data);
  return request<{
    data: API.ProductDesignRequest;
  }>('/api/product-design', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}