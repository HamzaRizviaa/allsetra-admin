import { FC, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { Topbar, PageLoader } from "@vilocnv/allsetra-core";
import ObjectDetailsHeader from "components/sections/objects/ObjectDetailsHeader/ObjectDetailsHeader";
import ObjectDetailsBody from "components/sections/objects/ObjectDetailsBody/ObjectDetailsBody";
import ObjectDetailsTables from "components/sections/objects/ObjectDetailsTables/ObjectDetailsTables";

// Data
import { useActiveObjectById } from "hooks";

const ObjectDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { activeObject, loading } = useActiveObjectById();

  return (
    <Box>
      <Topbar
        theme={theme}
        title="Object details"
        breadcrumbTitle="Objects"
        breadcrumbRedirectTo={() => navigate("/dashboard/objects")}
        primaryButton={{
          variant: "contained",
          text: "Settings",
          startIcon: <Settings />,
          onClick: () =>
            navigate(`/dashboard/objects/${activeObject?.uniqueId}/settings`),
        }}
      />
      <Box mx={4} mt={4}>
        {loading ? (
          <PageLoader />
        ) : (
          <Fragment>
            <ObjectDetailsHeader objectName={activeObject?.name || ""} />
            <ObjectDetailsBody activeObject={activeObject} />
            <ObjectDetailsTables />
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ObjectDetails;
