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
  MapActiveIcon,
  DevicesActiveIcon,
  ObjectsActiveIcon,
  SubscriptionActiveIcon,
  DeviceTypesActiveIcon,
  AlertsActiveIcon,
  FieldsActiveIcon,
  ServiceActiveIcon,
  AccountActiveIcon,
  ObjectTypesActiveIcon,
  SubscriptionsIcon,
  SubscriptionsInactiveIcon,
} from "assets/icons";

export const getDrawerMenuItems = (t: any): Array<IDrawerMenuItem> => [
  {
    name: t("drawerMenuLinks.map"),
    icon: MapSvg,
    activeIcon: MapActiveIcon,
    path: "/dashboard",
  },
  {
    name: t("drawerMenuLinks.alarmDesk"),
    icon: AlertSvg,
    activeIcon: AlertsActiveIcon,
    path: "/dashboard/alarm-desk",
  },
  {
    name: t("drawerMenuLinks.devices"),
    icon: DevicesIcon,
    activeIcon: DevicesActiveIcon,
    path: "/dashboard/devices",
  },
  {
    name: t("drawerMenuLinks.objects"),
    icon: ObjectsSvg,
    activeIcon: ObjectsActiveIcon,
    path: "/dashboard/objects",
  },
  {
    name: t("drawerMenuLinks.subscriptions"),
    icon: SubscriptionsInactiveIcon,
    activeIcon: SubscriptionsIcon,
    path: "/dashboard/subscriptions",
  },
];

export const getDrawerSubMenuLists = (): {
  [x: string]: Array<IDrawerMenuItem>;
} => ({
  Admin: [
    {
      name: "Account manager",
      icon: AccountsIcon,
      activeIcon: AccountActiveIcon,
      path: "/dashboard/account-manager",
    },
    {
      name: "Object types",
      icon: ObjectTypesIcon,
      activeIcon: ObjectTypesActiveIcon,
      path: "/dashboard/object-types",
    },
    {
      name: "Service manager",
      icon: ServicesIcon,
      activeIcon: ServiceActiveIcon,
      path: "/dashboard/service-manager",
    },
    {
      name: "Subscription manager",
      icon: SubscriptionSvg,
      activeIcon: SubscriptionActiveIcon,
      path: "/dashboard/subscription-manager",
    },
    {
      name: "Field manager",
      icon: FieldsIcon,
      activeIcon: FieldsActiveIcon,
      path: "/dashboard/field-manager",
    },
  ],
  "Device Manager": [
    {
      name: "Device types",
      icon: DeviceTypesIcon,
      activeIcon: DeviceTypesActiveIcon,
      path: "/dashboard/device-types",
    },
  ],
});
