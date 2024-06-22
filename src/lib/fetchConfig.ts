export const fetchConfig = {
  endpoint: `https://graphql.contentful.com/content/v1/spaces/${String(
    process.env.CONTENTFUL_SPACE_ID,
  )}`,
  params: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  },
  previewParams: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
    },
  },
};

export function customFetcher<TData, TVariables extends { preview?: boolean | null }>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
) {
  return async (): Promise<TData> => {

    // console.log('%%fitchConfig.ts :  Starting fetch request'); // 追加
    // console.log('%%fitchConfig.ts : Endpoint:', fetchConfig.endpoint); // 追加
    // console.log('%%fitchConfig.ts : Query:', query); // 追加
    // console.log('%%fitchConfig.ts : Variables:', variables); // 追加


    const res = await fetch(fetchConfig.endpoint as string, {
      method: 'POST',
      ...options,
      ...(variables?.preview ? fetchConfig.previewParams : fetchConfig.params),
      body: JSON.stringify({ query, variables }),
    });


    const json = await res.json();

    // console.log('fetchConfig.ts : JSON response:', json); // 追加
          // itemsの中身を展開して表示
          if (json.data && json.data.footerMenuCollection && Array.isArray(json.data.footerMenuCollection.items)) {
            json.data.footerMenuCollection.items.forEach((item, index) => {
              // console.log(`fetchConfig.ts : Item ${index}:`, item);
            });
          }

    if (json.errors) {
      const { message } = json.errors[0];
      console.error('GraphQL error!!!:', message); // 追加

      throw new Error(message);
    }

    return json.data;
  };
}
