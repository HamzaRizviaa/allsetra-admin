import { IDrawerMenuItem } from "app/data/types";
import {
  MapSvg,
  AlertSvg,
  GeozonesSvg,
  ObjectsSvg,
  // MembersSvg,
  // CustomersSvg,
  // GroupsSvg,
  // SupportSvg,
  // LogoutSvg,
} from "assets/icons";

export const DRAWER_MENU_ITEMS: Array<IDrawerMenuItem> = [
  { name: "Maps", icon: MapSvg, path: "/dashboard" },
  { name: "Alarm Desk", icon: AlertSvg, path: "/dashboard/alarm-desk" },
  { name: "Devices", icon: GeozonesSvg, path: "/dashboard/devices" },
  { name: "Objects", icon: ObjectsSvg, path: "/dashboard/objects" },
];

export const DRAWER_SUB_MENU_LISTS: { [x: string]: Array<IDrawerMenuItem> } = {
  Admin: [
    { name: "Customer manager", icon: MapSvg, path: "" },
    { name: "Object types", icon: AlertSvg, path: "" },
    { name: "Service manager", icon: GeozonesSvg, path: "" },
    { name: "Field manager", icon: ObjectsSvg, path: "" },
  ],
  "Device Manager": [
    { name: "Device types", icon: MapSvg, path: "" },
    { name: "CAN Database", icon: AlertSvg, path: "" },
  ],
};
