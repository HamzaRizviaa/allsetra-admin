import { toast, utils } from "@vilocnv/allsetra-core";
import {
  getAccountsByQueryThunk,
  getObjectTypesByQueryThunk,
  getServicesByQueryThunk,
  getFieldsByQueryThunk,
  getSubscriptionsByQueryThunk,
  getAccountServicesThunk,
  getAccountDeviceTypesThunk,
  getAccountObjectTypesThunk,
  getAccountAssociatedUsersThunk,
  getAccountObjectsThunk,
  getAccountDevicesThunk,
  getAccountInstallationsThunk,
  getSpecificAccountThunk,
} from "app/features";
import { AppDispatch } from "app/store";
import { BackendEventsEnum } from "app/data/types";
import { changeLanguage } from "app/data/helpers";

export const signalRGenerateSuccessToastMessage = (
  eventName: string,
  eventFor: string,
  actionType: string
): string => {
  return `${eventFor} with the name "${eventName}" has been ${actionType}.`;
};

export const signalREventsRaisedListener = (
  event: any,
  dispatch: AppDispatch
) => {
  switch (event.eventName) {
    //
    // Account Events
    //
    case BackendEventsEnum.AccountCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Account", event.name, "created")
      );
      dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.AccountUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Account", event.name, "updated")
      );
      dispatch(getSpecificAccountThunk(event.accountId ?? ""));
      break;

    // Account Services Events
    case BackendEventsEnum.ServiceAssignedToAccountEvent:
      toast.success("Service has been assigned.");
      dispatch(
        getAccountServicesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case BackendEventsEnum.ServiceRemovedFromAccountEvent:
      toast.success("Service has been removed.");
      dispatch(
        getAccountServicesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Device Types Events
    case BackendEventsEnum.DeviceTypeAssignedToAccountEvent:
      toast.success("Device type has been assigned.");
      dispatch(
        getAccountDeviceTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case BackendEventsEnum.DeviceTypeRemovedFromAccountEvent:
      toast.success("Device type has been removed.");
      dispatch(
        getAccountDeviceTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Object Types Events
    case BackendEventsEnum.ObjectTypeAssignedToAccountEvent:
      toast.success("Object type has been assigned.");
      dispatch(
        getAccountObjectTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case BackendEventsEnum.ObjectTypeRemovedFromAccountEvent:
      toast.success("Object type has been removed.");
      dispatch(
        getAccountObjectTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Users Events
    case BackendEventsEnum.UserCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("User", event.name, "created")
      );
      dispatch(
        getAccountAssociatedUsersThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case BackendEventsEnum.UserAssignedToAccountEvent:
      toast.success("User has been assigned.");
      dispatch(
        getAccountAssociatedUsersThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case BackendEventsEnum.UserRemovedFromAccountEvent:
      toast.success("User has been removed.");
      dispatch(
        getAccountAssociatedUsersThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Devices Events
    case BackendEventsEnum.DeviceRemovedFromAccountEvent:
      toast.success("Device has been removed.");
      dispatch(
        getAccountDevicesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Object Events
    case BackendEventsEnum.ObjectRemovedFromAccountEvent:
      toast.success("Object has been removed.");
      dispatch(
        getAccountObjectsThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Installation Events
    case BackendEventsEnum.InstallationRemovedFromAccountEvent:
      toast.success("Installation has been removed.");
      dispatch(
        getAccountInstallationsThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    //
    // Object Types Events
    //
    case BackendEventsEnum.ObjectTypeCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Object type", event.name, "created")
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.ObjectTypeUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Object type", event.name, "updated")
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.ObjectTypeActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Object type",
          event.name,
          "activated"
        )
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.ObjectTypeDeactivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Object type",
          event.name,
          "deactivated"
        )
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;

    //
    // Services Events
    //
    case BackendEventsEnum.ServiceCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "created")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.ServiceUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "updated")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.ServiceActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "activated")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.ServiceDeactivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "deactivated")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;

    //
    // Fields Events
    //
    case BackendEventsEnum.FieldCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "created")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.FieldUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "updated")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.FieldActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "activated")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.FieldDeactivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "deactivated")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;

    //
    // Subscriptions Manager Events
    //
    case BackendEventsEnum.SubscriptionCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "created"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.SubscriptionUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "updated"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.SubscriptionActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "activated"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case BackendEventsEnum.SubscriptionDeactivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "deactivated"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;

    //
    // Settings Events
    //
    case BackendEventsEnum.UserUpdatedEvent:
      changeLanguage(event.preferredLanguage || "en");
      toast.success("Settings have been updated.");
      break;

    //
    // Alarm Desk Events
    //
    case BackendEventsEnum.AlarmUpdatedEvent:
      console.log(event);
      break;

    case BackendEventsEnum.AlarmCommentCreatedEvent:
      console.log(event);
      break;
  }
};
