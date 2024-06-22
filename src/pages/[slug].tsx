import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { useCtfFooterQuery } from '@src/components/features/ctf-components/ctf-footer/__generated/ctf-footer.generated';
import { useCtfNavigationQuery } from '@src/components/features/ctf-components/ctf-navigation/__generated/ctf-navigation.generated';
import { useCtfPageQuery } from '@src/components/features/ctf-components/ctf-page/__generated/ctf-page.generated';
import CtfPageGgl from '@src/components/features/ctf-components/ctf-page/ctf-page-gql';
import { ComponentReferenceFieldsFragment } from '@src/lib/__generated/graphql.types';
import { getServerSideTranslations } from '@src/lib/get-serverside-translations';
import { prefetchMap, PrefetchMappingTypeFetcher } from '@src/lib/prefetch-mappings';
import { prefetchPromiseArr } from '@src/lib/prefetch-promise-array';

const SlugPage: NextPage = () => {
  const router = useRouter();
  const slug = (router?.query.slug as string) || '';
  console.log('@[slug].tsx : CtfPageGgl start >>', slug);


  return <CtfPageGgl slug={slug} />;
};

export interface CustomNextPageContext extends NextPageContext {
  params: {
    slug: string;
  };
  id: string;
}

export const getServerSideProps = async ({ locale, params, query }: CustomNextPageContext) => {
  const slug = params.slug;
  const preview = Boolean(query.preview);
  // console.log('>>[slug].tsx:slug', slug);

  try {
    const queryClient = new QueryClient();

    // Default queries
    const prefetchPromises = [
      queryClient.prefetchQuery(
        useCtfPageQuery.getKey({ slug, locale, preview }),
        useCtfPageQuery.fetcher({ slug, locale, preview }),
      ),
      queryClient.prefetchQuery(
        useCtfNavigationQuery.getKey({ locale, preview }),
        useCtfNavigationQuery.fetcher({ locale, preview }),
      ),
      queryClient.prefetchQuery(
        useCtfFooterQuery.getKey({ locale, preview }),
        useCtfFooterQuery.fetcher({ locale, preview }),
      ),
    ];
    // console.log(">>[slug].tsx : prefetchPromises",prefetchPromises)

    // Dynamic queries
    const pageData = await useCtfPageQuery.fetcher({ slug, locale, preview })();
    const page = pageData.pageCollection?.items[0];

    const topSection = page?.topSectionCollection?.items;
    const extraSection = page?.extraSectionCollection?.items;
    const content: ComponentReferenceFieldsFragment | undefined | null = page?.pageContent;

    // console.log('>>[slug].tsx:page', page);
    // console.log('>>[slug].tsx : content', content);

    await Promise.all([
      ...prefetchPromises,
      ...prefetchPromiseArr({ inputArr: topSection, locale, queryClient }),
      ...prefetchPromiseArr({ inputArr: extraSection, locale, queryClient }),
      ...prefetchPromiseArr({ inputArr: [content], locale, queryClient }),
    ]);

    if (content) {
      // console.log('>>[slug].tsx : content OK!');

      const { __typename, sys } = content;

      if (!__typename)
        return {
          notFound: true,
        };
      // console.log('>>[slug].tsx : __typename OK!',__typename);
      

      const query = prefetchMap?.[__typename];

      // console.log('>>[slug].tsx : query', query);




      if (!query)
        return {
          notFound: true,
        };

        // console.log('>>[slug].tsx : query OK!');
      

      const data: PrefetchMappingTypeFetcher = await query.fetcher({
        id: sys.id,
        locale,
        preview,
      })();

      // 追加
      if (data) {
        // console.log('>>[slug].tsx : data', data);
      } else {
        console.log('data is not fetched');
      }

      // Different data structured can be returned, this function makes sure the correct data is returned
      const inputArr = (__typename => {
        if ('topicBusinessInfo' in data) {
          return data?.topicBusinessInfo?.body?.links.entries.block;
        }

        if ('topicPerson' in data) {
          return [data?.topicPerson];
        }

        if ('topicProduct' in data) {
          return [data?.topicProduct];
        }

        return [];
      })();

      await Promise.all([
        ...prefetchPromiseArr({
          inputArr,
          locale,
          queryClient,
        }),
      ]);
    }

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch(error){
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};

export default SlugPage;
