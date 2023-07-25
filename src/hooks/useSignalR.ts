import { useEffect, useState, useMemo } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { utils, toast } from "@vilocnv/allsetra-core";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectActiveUserDetails } from "app/data/selectors";
import { BackendEventsEnum } from "app/data/types";
import { getAccountsByQueryThunk } from "app/features";

const useSignalR = () => {
  const dispatch = useAppDispatch();
  const [hubConnection, setHubConnection] = useState(HubConnection.prototype);

  const { userEmail, idToken } = useAppSelector(selectActiveUserDetails);

  const options = useMemo(
    () => ({
      accessTokenFactory: () => idToken ?? "",
      headers: {
        "X-Subscription": `${process.env.REACT_APP_API_HEADER_SUBSCRIPTION}`,
      },
    }),
    [idToken]
  );

  const createHubConnection = () => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(
        `${process.env.REACT_APP_API_BASE_URL}/?source=adminportal&user=${userEmail}`,
        options
      )
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected SignalR!");

        newConnection.on("EventRaised", (event) => {
          switch (event.eventName) {
            case BackendEventsEnum.AccountCreatedEvent:
              toast.success(
                `Account with the name "${event.name}" has been created.`
              );
              dispatch(getAccountsByQueryThunk(utils.getCommonParamsForApi()));
              break;
            default:
              console.log({ eventName: event.eventName });
          }
        });

        setHubConnection(newConnection);
      })
      .catch((e) => console.log("Connection failed: ", e));
  };

  useEffect(() => {
    if (idToken && userEmail) {
      createHubConnection();
    }

    return () => {
      hubConnection.stop();
    };
  }, [idToken, userEmail]);

  return { hubConnection };
};

export default useSignalR;
