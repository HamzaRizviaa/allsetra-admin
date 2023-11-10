import { toast, utils, types } from "@vilocnv/allsetra-core";
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
  setIsLockedOfAlarm,
} from "app/features";
import { AppDispatch } from "app/store";
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
    case types.BackendEventsEnum.AccountCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Account", event.name, "created")
      );
      dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.AccountUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Account", event.name, "updated")
      );
      dispatch(getSpecificAccountThunk(event.accountId ?? ""));
      break;

    // Account Services Events
    case types.BackendEventsEnum.ServiceAssignedToAccountEvent:
      toast.success("Service has been assigned.");
      dispatch(
        getAccountServicesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case types.BackendEventsEnum.ServiceRemovedFromAccountEvent:
      toast.success("Service has been removed.");
      dispatch(
        getAccountServicesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Device Types Events
    case types.BackendEventsEnum.DeviceTypeAssignedToAccountEvent:
      toast.success("Device type has been assigned.");
      dispatch(
        getAccountDeviceTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case types.BackendEventsEnum.DeviceTypeRemovedFromAccountEvent:
      toast.success("Device type has been removed.");
      dispatch(
        getAccountDeviceTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Object Types Events
    case types.BackendEventsEnum.ObjectTypeAssignedToAccountEvent:
      toast.success("Object type has been assigned.");
      dispatch(
        getAccountObjectTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case types.BackendEventsEnum.ObjectTypeRemovedFromAccountEvent:
      toast.success("Object type has been removed.");
      dispatch(
        getAccountObjectTypesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Users Events
    case types.BackendEventsEnum.UserCreatedEvent:
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
    case types.BackendEventsEnum.UserAssignedToAccountEvent:
      toast.success("User has been assigned.");
      dispatch(
        getAccountAssociatedUsersThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;
    case types.BackendEventsEnum.UserRemovedFromAccountEvent:
      toast.success("User has been removed.");
      dispatch(
        getAccountAssociatedUsersThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Devices Events
    case types.BackendEventsEnum.DeviceRemovedFromAccountEvent:
      toast.success("Device has been removed.");
      dispatch(
        getAccountDevicesThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Object Events
    case types.BackendEventsEnum.ObjectRemovedFromAccountEvent:
      toast.success("Object has been removed.");
      dispatch(
        getAccountObjectsThunk({
          accountId: event.accountId,
          params: utils.getCommonParamsForApi(),
        })
      );
      break;

    // Account Installation Events
    case types.BackendEventsEnum.InstallationRemovedFromAccountEvent:
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
    case types.BackendEventsEnum.ObjectTypeCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Object type", event.name, "created")
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.ObjectTypeUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Object type", event.name, "updated")
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.ObjectTypeActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Object type",
          event.name,
          "activated"
        )
      );
      dispatch(getObjectTypesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.ObjectTypeDeactivatedEvent:
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
    case types.BackendEventsEnum.ServiceCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "created")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.ServiceUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "updated")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.ServiceActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "activated")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.ServiceDeactivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Service", event.name, "deactivated")
      );
      dispatch(getServicesByQueryThunk(utils.getCommonParamsForApi()));
      break;

    //
    // Fields Events
    //
    case types.BackendEventsEnum.FieldCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "created")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.FieldUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "updated")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.FieldActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "activated")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.FieldDeactivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Field", event.name, "deactivated")
      );
      dispatch(getFieldsByQueryThunk(utils.getCommonParamsForApi()));
      break;

    //
    // Subscriptions Manager Events
    //
    case types.BackendEventsEnum.SubscriptionCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "created"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.SubscriptionUpdatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "updated"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.SubscriptionActivatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage(
          "Subscription",
          event.name,
          "activated"
        )
      );
      dispatch(getSubscriptionsByQueryThunk(utils.getCommonParamsForApi()));
      break;
    case types.BackendEventsEnum.SubscriptionDeactivatedEvent:
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
    case types.BackendEventsEnum.UserUpdatedEvent:
      changeLanguage(event.preferredLanguage || "en");
      toast.success("Settings have been updated.");
      break;

    //
    // Alarm Desk Events
    //
    case types.BackendEventsEnum.AlarmUpdatedEvent:
      console.log({
        alarmId: event.uniqueId,
        lockedBy: event.author,
        isLocked: event.isLocked,
      });
      dispatch(
        setIsLockedOfAlarm({
          alarmId: event.uniqueId,
          lockedBy: event.author,
          isLocked: event.isLocked,
        })
      );
      break;

    case types.BackendEventsEnum.AlarmCommentCreatedEvent:
      console.log(event);
      break;

    //
    // Devices Events
    //
    case types.BackendEventsEnum.DeviceImmobilizerStatusChangeReportedEvent:
      console.log({ event });
      break;
  }
};
