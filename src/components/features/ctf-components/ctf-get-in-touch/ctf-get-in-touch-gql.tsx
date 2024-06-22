import { useContentfulLiveUpdates } from '@contentful/live-preview/react';

import { useCtfContactFormQuery } from '@src/components/features/ctf-components/ctf-get-in-touch/__generated/ctf-get-in-touch.generated';
import { CftGetInTouch } from './ctf-get-in-touch';
// import { CtfPerson } from './ctf-person';

// import { useCtfPersonQuery } from '@src/components/features/ctf-components/ctf-person/__generated/ctf-person.generated';
// import { useCtfContactFormQuery } from '@src/components/features/ctf-components/ctf-get-in-touch/__generated/ctf-get-in-touch.generated';

interface CtfGetInTouchGqlPropsInterface {
  id: string;
  locale: string;
  preview: boolean;
  previousComponent: string | null;
}

export const CtfGetInTouchGql = (props: CtfGetInTouchGqlPropsInterface) => {
  const { id, locale, preview, previousComponent } = props;
  console.log('!! ctf-get-in-touch-gql.tsx : ');

  const { isLoading, data } = useCtfContactFormQuery({
    id,
    locale,
    preview,
  });

  const contactForm = useContentfulLiveUpdates(data?.contactForm);

  if (isLoading || !contactForm) {
    return null;
  }

  console.log('!! ctf-get-in-touch-gql.tsx : data', data);

  return <CftGetInTouch {...contactForm} previousComponent={previousComponent} />;
};

