import { FC } from "react";
import { AlarmCardContainer } from "./AlarmExpendableRowCard.styled";
import { types } from "@vilocnv/allsetra-core";

// DATA
import AlarmActions, { AlarmActionsProps } from "./children/AlarmActions";
import AlarmMetadata from "./children/AlarmMetadata";
import AlarmComments from "./children/AlarmComments";

export interface AlarmExpendableRowCardProps extends AlarmActionsProps {
  data: types.IAlarm;
  toggleSendEmailModal: () => void;
  toggleClearAlarmModal: () => void;
  toggleReportTheftModal: () => void;
  toggleSendSMSModal: () => void;
  handleDisableImmobilizer: (deviceId: string) => void;
}

const AlarmExpendableRowCard: FC<AlarmExpendableRowCardProps> = ({
  data,
  toggleSendEmailModal,
  toggleClearAlarmModal,
  toggleReportTheftModal,
  toggleSendSMSModal,
  handleDisableImmobilizer,
}) => {
  return (
    <AlarmCardContainer>
      <AlarmActions
        data={data}
        toggleSendEmailModal={toggleSendEmailModal}
        toggleClearAlarmModal={toggleClearAlarmModal}
        toggleReportTheftModal={toggleReportTheftModal}
        toggleSendSMSModal={toggleSendSMSModal}
        handleDisableImmobilizer={handleDisableImmobilizer}
      />
      <AlarmMetadata data={data} />
      <AlarmComments data={data} />
    </AlarmCardContainer>
  );
};

export default AlarmExpendableRowCard;
