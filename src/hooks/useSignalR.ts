import { useEffect, useState, useMemo } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { useAppSelector } from "hooks";
import { selectActiveUserDetails } from "app/data/selectors";

const useSignalR = () => {
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
        `${process.env.REACT_APP_API_BASE_URL}/?source=adminportal&${userEmail}`,
        options
      )
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then((result) => {
        console.log("Connected!", { result });

        newConnection.on("EventRaised", (message) => {
          console.log(message);
        });

        setHubConnection(newConnection);
      })
      .catch((e) => console.log("Connection failed: ", e));
  };

  useEffect(() => {
    if (idToken) {
      createHubConnection();
    }

    return () => {
      hubConnection.stop();
    };
  }, [idToken]);

  return { hubConnection };
};

export default useSignalR;
