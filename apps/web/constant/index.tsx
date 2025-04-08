import { LinkItems } from "@/types";
import { useTranslations } from "next-intl";

export function useNavItems(): LinkItems[] {
  const translate = useTranslations("header");
  return [
    { title: translate("docs"), href: "/docs/introduction" },
    { title: translate("components"), href: "/docs/components/accordion" },
    { title: translate("blocks"), href: "/ui-blocks" },
    { title: translate("themes"), href: "/themes" },
    { title: translate("colors"), href: "/colors" },
    { title: translate("community"), href: "/community" },
  ];
}
