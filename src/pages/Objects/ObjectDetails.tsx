import { FC, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { Topbar, PageLoader } from "@vilocnv/allsetra-core";
import ObjectDetailsHeader from "components/sections/objects/ObjectDetailsHeader/ObjectDetailsHeader";
import ObjectDetailsBody from "components/sections/objects/ObjectDetailsBody/ObjectDetailsBody";
import ObjectDetailsTables from "components/sections/objects/ObjectDetailsTables/ObjectDetailsTables";

// Data
import { useActiveObjectById, useAppDispatch, useAppSelector } from "hooks";
import { selectObjectSubscriptions } from "app/data/selectors";
import { getAllSubscriptionsByObjectIdThunk } from "app/features";

const ObjectDetails: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { activeObject, loading } = useActiveObjectById();

  const { objectSubscriptions } = useAppSelector(selectObjectSubscriptions);

  useEffect(() => {
    //@ts-ignore
    dispatch(getAllSubscriptionsByObjectIdThunk(activeObject?.uniqueId));
  }, []);

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
        {!(objectSubscriptions.length > 0) ? (
          <PageLoader />
        ) : (
          <Fragment>
            <ObjectDetailsHeader objectName={activeObject?.name || ""} />
            <ObjectDetailsBody
              activeObject={activeObject}
              objectSubscriptions={objectSubscriptions}
            />
            <ObjectDetailsTables />
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default ObjectDetails;
