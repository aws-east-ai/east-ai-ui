
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

  type InpaintRequest = {
    model_id?: string;
    prompt?: string;
    negative_prompt?: string;
    steps?: number;
    sampler?: string;
    seed?: number;
    count?: number;
    input_image?: string;
    sam_prompt?: string;

  }
  type InpaintResponse = {
    images?: string[];
  }

  type AgentPromptRequest = {
    prompt?: string;
  }

}
