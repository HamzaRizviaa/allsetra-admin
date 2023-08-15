import { FC } from "react";
import { Button, ContentSectionLayout, Table } from "@vilocnv/allsetra-core";
import { Stack } from "@mui/material";
import { ChildFormBox } from "components/forms/objects/ObjectSettingsForm/ObjectSettingsForm.styled";
import { DEVICEIOMAPPING__TABLE_COLUMNS } from "app/data/constants";

const DeviceIOMappingSettings: FC = () => {
  return (
    <ContentSectionLayout
      title="Device I/O Mapping"
      subTitle="Some text to help user understand what this block is responsible for."
    >
      <ChildFormBox>
        <Stack spacing={4}>
          <Table
            columns={DEVICEIOMAPPING__TABLE_COLUMNS}
            data={[
              { dataPoint: "Internal Battery Voltage" },
              { dataPoint: "External Battery Voltage" },
              { dataPoint: "Body Temperature" },
              { dataPoint: "Operating Time" },
            ]}
          />
          <Button
            variant={"outlined"}
            size={"medium"}
            onClick={() => {}}
            sx={{ width: "30%" }}
          >
            Add Mapping
          </Button>
        </Stack>
      </ChildFormBox>
    </ContentSectionLayout>
  );
};

export default DeviceIOMappingSettings;
