declare module '*.mdx' {
   import { ReactNode } from 'react';

   export const metadata: {
      title: string;
      description: string;
   };

   function MDXComponent(props: { components?: Record<string, ReactNode> }): JSX.Element;
   export default MDXComponent;
}