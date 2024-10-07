import { ElementType, ReactNode, useMemo } from "react";
import { setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import * as enLocaleMessages from "@/locales/en/messages";

const FallbackProviders = ({ children }: { children: ReactNode }) => {
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
};

export const GlobalStorybookDecorator = (props: { children: ReactNode }) => (
  <FallbackProviders>{props.children}</FallbackProviders>
);

export const withGlobalStorybookDecorator = (Story: ElementType) => (
  <GlobalStorybookDecorator>
    <Story />
  </GlobalStorybookDecorator>
);
