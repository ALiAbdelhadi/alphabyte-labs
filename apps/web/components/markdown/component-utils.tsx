import { useTranslations } from "next-intl"
import Pre from "../pre"
import MdxBadge from "./mdx-badge"

export const ComponentUtilsText = () => {
  const t = useTranslations("componentUtils")
  return (
    <p>
      {t("text.description")} <MdxBadge>{t("text.libFolder")}</MdxBadge> in
      {t("text.inRootDirectory")}{" "}
      <MdxBadge>{t("text.utilsFile")}</MdxBadge> {t("text.pasteCode")}
      <br />
    </p>
  )
}

const ComponentUtils = () => {
  return (
    <Pre className="language-typescript" folderPath="lib/utils.ts">
      {`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}`}
    </Pre>
  )
}

export default ComponentUtils
