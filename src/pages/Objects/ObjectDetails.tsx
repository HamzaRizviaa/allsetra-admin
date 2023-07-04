import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { Topbar } from "@vilocnv/allsetra-core";
import ObjectDetailsHeader from "components/sections/objects/ObjectDetailsHeader/ObjectDetailsHeader";
import ObjectDetailsBody from "components/sections/objects/ObjectDetailsBody/ObjectDetailsBody";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueriedObjectsState } from "app/data/selectors";
import { getSpecificObjectByIdThunk } from "app/features";

const ObjectDetails: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const objectId = searchParams.get("objectId");

  // Global State
  const { activeObject, loading } = useAppSelector(selectQueriedObjectsState);

  useEffect(() => {
    if (isEmpty(objectId)) {
      navigate(-1);
    } else {
      dispatch(getSpecificObjectByIdThunk(objectId ?? ""));
    }
  }, [searchParams]);

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
          onClick: () => {},
        }}
      />
      <Box mx={4} mt={4}>
        <ObjectDetailsHeader objectName={activeObject?.name || ""} />
        <ObjectDetailsBody />
      </Box>
    </Box>
  );
};

export default ObjectDetails;
