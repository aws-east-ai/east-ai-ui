
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
}
