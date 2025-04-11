import React from 'react'
import Pre from '../pre'
import MdxBadge from './mdx-badge'
import {useTranslations} from "next-intl";

export const ComponentUtilsText = () => {
    const tranlsate = useTranslations("component-utils")
    return (
        <p>{tranlsate("des-1")} <MdxBadge>lib</MdxBadge> {tranlsate("des-2")} <MdxBadge>utils.ts</MdxBadge> {tranlsate("des-3")}:</p>
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