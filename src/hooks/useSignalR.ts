import { useEffect, useState, useMemo } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectActiveUserDetails } from "app/data/selectors";
import { signalREventsRaisedListener } from "app/data/helpers";

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
        `${process.env.REACT_APP_API_BASE_LIVE_UPDATE_URL}/?source=adminportal&user=${userEmail}`,
        options
      )
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected SignalR!");

        newConnection.on("EventRaised", (event) =>
          signalREventsRaisedListener(event, dispatch)
        );

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
