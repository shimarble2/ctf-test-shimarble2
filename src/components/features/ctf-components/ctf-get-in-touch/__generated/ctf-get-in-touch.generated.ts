import * as Types from '../../../../../lib/__generated/graphql.types';
import { AssetFieldsFragment, AssetFieldsFragmentDoc } from '../../ctf-asset/__generated/ctf-asset.generated';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '@src/lib/fetchConfig';
import { ComponentReferenceFieldsFragmentDoc } from '@src/lib/shared-fragments/__generated/ctf-componentMap.generated';

// すべての型を any に変更
export type ContactFormFieldsFragment = any;

export type CtfContactFormQueryVariables = any;

export type CtfContactFormQuery = any;

export const ContactFormFieldsFragmentDoc = `
fragment ContactFormFields on ContactForm {
  __typename
  sys {
    id
  }
  name
  shortDescription
  featuredImage {
    ...AssetFields
  }
  body {
    json
    links {
      entries {
        block {
          ...ComponentReferenceFields
        }
      }
      assets {
        block {
          ...AssetFields
        }
      }
    }
  }
}
    `;

export const CtfContactFormDocument = `
    query CftContactForm($id: String!, $locale: String, $preview: Boolean) {
  contactForm(id: $id, locale: $locale, preview: $preview) {
    ...ContactFormFields
  }
}
    ${ContactFormFieldsFragmentDoc}
    ${AssetFieldsFragmentDoc}
${ComponentReferenceFieldsFragmentDoc}
    `;

export const useCtfContactFormQuery = <
      TData = any,
      TError = any
    >(
      variables: any,
      options?: UseQueryOptions<any, any, any>
    ) =>
    useQuery<any, any, any>(
      ['CftContactForm', variables],
      customFetcher<any, any>(CtfContactFormDocument, variables),
      options
    );

useCtfContactFormQuery.getKey = (variables: any) => ['CftContactForm', variables];

useCtfContactFormQuery.fetcher = (variables: any, options?: RequestInit['headers']) => customFetcher<any, any>(CtfContactFormDocument, variables, options);


// fragment ContactFormFields on ContactForm {
//   __typename
//   sys {
//     id
//   }
//   name
//   shortDescription
//   featuredImage {
//     ...AssetFields
//   }
//   body {
//     json
//     links {
//       entries {
//         block {
//           ...ComponentReferenceFields
//         }
//       }
//       assets {
//         block {
//           ...AssetFields
//         }
//       }
//     }
//   }
// }
    