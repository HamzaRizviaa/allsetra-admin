import { toast, utils } from "@vilocnv/allsetra-core";
import { AppDispatch } from "app/store";
import {
  getAccountsByQueryThunk,
  getObjectTypesByQueryThunk,
  getServicesByQueryThunk,
  getFieldsByQueryThunk,
  getSubscriptionsByQueryThunk,
} from "app/features";
import { BackendEventsEnum } from "app/data/types";

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
    // Account Events
    case BackendEventsEnum.AccountCreatedEvent:
      toast.success(
        signalRGenerateSuccessToastMessage("Account", event.name, "created")
      );
      dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
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

    default:
      console.log({ eventName: event.eventName });
  }
};
