import { FC } from "react";

const Map: FC<any> = ({ useSignalREffect }) => {
  useSignalREffect(
    "EventRaised",
    (message: any) => {
      console.log("SignalR Event: ", { message });
    },
    []
  );

  return <div>Map</div>;
};

export default Map;
