
declare namespace API {
  type MarketingTextResponse = {
    response?: string;
    history?: string[][];
  }
  type MarketingTextRequest = {
    prompt?: string;
    pattern?: string;
    history?: string[][];
  }
  type ProductDesignRequest = {
    prompt?: string;
    negative_prompt?: string;
    steps?: number;
    sampler?: string;
    seed?: number;
    width?: number;
    height?: number;
    count?: number;
    input_image?: string;
  }
  type ProductDesignResponse = {
    images?: string[];
  }
}
