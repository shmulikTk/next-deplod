import { IconType } from "react-icons";

interface Route {
  type: string;
  name: string;
  key: string;
  route: string;
}

export interface RouteWithCollapse {
  type: string;
  name: string;
  key: string;
  route: string;
  icon?: IconType;
  collapse?: Route[];
}
