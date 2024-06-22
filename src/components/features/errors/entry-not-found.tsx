import { useTranslation } from 'next-i18next';
import React from 'react';

import { ErrorBox } from '@src/components/shared/error-box';

export const EntryNotFound = (props: { className?: string }) => {
  const { t } = useTranslation();
  console.log("entry-not-found.tsx!!!")
  return <ErrorBox {...props}>{t('error.componentNotFound')}</ErrorBox>;
};
