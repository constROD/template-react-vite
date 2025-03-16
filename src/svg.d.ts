declare module '*.svg?react' {
  import type * as React from 'react';
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default SVGComponent;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
