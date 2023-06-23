import { IDrawerMenuItem } from "app/data/types";
import {
  MapSvg,
  AlertSvg,
  ObjectsSvg,
  SubscriptionSvg,
  DevicesIcon,
  AccountsIcon,
  ObjectTypesIcon,
  ServicesIcon,
  FieldsIcon,
  DeviceTypesIcon,
} from "assets/icons";

export const getDrawerMenuItems = (t: any): Array<IDrawerMenuItem> => [
  { name: t("drawerMenuLinks.map"), icon: MapSvg, path: "/dashboard" },
  {
    name: t("drawerMenuLinks.alarmDesk"),
    icon: AlertSvg,
    path: "/dashboard/alarm-desk",
  },
  {
    name: t("drawerMenuLinks.devices"),
    icon: DevicesIcon,
    path: "/dashboard/devices",
  },
  {
    name: t("drawerMenuLinks.objects"),
    icon: ObjectsSvg,
    path: "/dashboard/objects",
  },
];

export const getDrawerSubMenuLists = (): {
  [x: string]: Array<IDrawerMenuItem>;
} => ({
  Admin: [
    {
      name: "Account manager",
      icon: AccountsIcon,
      path: "/dashboard/account-manager",
    },
    {
      name: "Object types",
      icon: ObjectTypesIcon,
      path: "/dashboard/object-types",
    },
    {
      name: "Service manager",
      icon: ServicesIcon,
      path: "/dashboard/service-manager",
    },
    {
      name: "Subscription manager",
      icon: SubscriptionSvg,
      path: "/dashboard/subscription-manager",
    },
    {
      name: "Field manager",
      icon: FieldsIcon,
      path: "/dashboard/field-manager",
    },
  ],
  "Device Manager": [
    {
      name: "Device types",
      icon: DeviceTypesIcon,
      path: "/dashboard/device-types",
    },
  ],
});
