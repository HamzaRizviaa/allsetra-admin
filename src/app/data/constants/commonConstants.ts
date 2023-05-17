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
  { name: "Map", icon: MapSvg, path: "/dashboard" },
  { name: "Alarm desk", icon: AlertSvg, path: "/dashboard/alarm-desk" },
  { name: "Devices", icon: GeozonesSvg, path: "/dashboard/devices" },
  { name: "Objects", icon: ObjectsSvg, path: "/dashboard/objects" },
];

export const DRAWER_SUB_MENU_LISTS: { [x: string]: Array<IDrawerMenuItem> } = {
  Admin: [
    {
      name: "Account manager",
      icon: MapSvg,
      path: "/dashboard/account-manager",
    },
    { name: "Object types", icon: AlertSvg, path: "/dashboard/object-types" },
    {
      name: "Service manager",
      icon: GeozonesSvg,
      path: "/dashboard/service-manager",
    },
    {
      name: "Field manager",
      icon: ObjectsSvg,
      path: "/dashboard/field-manager",
    },
  ],
  "Device Manager": [
    { name: "Device types", icon: MapSvg, path: "/dashboard/device-types" },
    { name: "CAN database", icon: AlertSvg, path: "/dashboard/can-database" },
  ],
};
