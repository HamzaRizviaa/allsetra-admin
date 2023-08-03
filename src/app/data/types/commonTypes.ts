import { FunctionComponent, SVGProps } from "react";

export interface IDrawerMenuItem {
  name: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  activeIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  path: string;
}
