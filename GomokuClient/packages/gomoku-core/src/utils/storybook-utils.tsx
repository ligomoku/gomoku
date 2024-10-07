import { ReactNode, useMemo } from "react";
import { setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import * as enLocaleMessages from "@/locales/en/messages";

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(2);

export const GlobalStorybookDecorator = (props: { children: ReactNode }) => {
  return (
    <>
      <FallbackProviders>{props.children}</FallbackProviders>
    </>
  );
};

function FallbackProviders({ children }: { children: ReactNode }) {
  const i18n = useMemo(() => {
    return setupI18n({
      locale: "en",
      messages: {
        en: enLocaleMessages,
      },
    });
  }, []);

  return (
    <I18nProvider key={i18n.locale} i18n={i18n}>
      {children}
    </I18nProvider>
  );
}

export const withGlobalStorybookDecorator = (Story: any) => (
  <GlobalStorybookDecorator>
    <Story />
  </GlobalStorybookDecorator>
);
