// delcaration.d.ts file

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: string;
  export default src;
}

declare module "*.shadow.css" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string;
  export default content;
}
