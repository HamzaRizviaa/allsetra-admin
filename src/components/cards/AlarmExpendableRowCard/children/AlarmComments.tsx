import { FC } from "react";
import { Table, types } from "@vilocnv/allsetra-core";
import { CommnetsBox } from "../AlarmExpendableRowCard.styled";

// DATA
import { useAppDispatch } from "hooks";
import { ALARM_COMMENTS_TABLE_COLUMNS } from "app/data/constants";
import { deleteCommentFromAlarmThunk } from "app/features";

export interface AlarmCommentsProps {
  data: types.IAlarm;
}

const AlarmComments: FC<AlarmCommentsProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleDeleteCommnet = (row: any) => {
    dispatch(
      deleteCommentFromAlarmThunk({
        alarmId: data.uniqueId,
        commentId: row.uniqueId,
      })
    );
  };

  return (
    <CommnetsBox>
      <Table
        title="Comments"
        columns={ALARM_COMMENTS_TABLE_COLUMNS}
        data={data?.comments || []}
        cellActions={[
          {
            name: "Delete comment",
            onClick: handleDeleteCommnet,
          },
        ]}
      />
    </CommnetsBox>
  );
};

export default AlarmComments;
