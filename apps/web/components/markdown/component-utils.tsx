import Pre from "../pre"
import MdxBadge from "./mdx-badge"

export const ComponentUtilsText = () => {
  return (
    <p>
      Second, you need to create a new folder called <MdxBadge>lib</MdxBadge> in
      you root directory and create a new file called{" "}
      <MdxBadge>utils.ts</MdxBadge> and paste the following code in it:
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
