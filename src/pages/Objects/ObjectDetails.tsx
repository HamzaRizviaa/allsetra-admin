import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { Topbar } from "@vilocnv/allsetra-core";
import { toast } from "react-toastify";
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
  const params = useParams();

  // Global State
  const { activeObject } = useAppSelector(selectQueriedObjectsState);

  const getSpecificObjectById = async () => {
    const { type } = await dispatch(
      getSpecificObjectByIdThunk(params.id ?? "")
    );

    if (type === "objects/getSpecificObjectByIdThunk/rejected") {
      navigate(-1);
      toast.error("Object not found");
    }
  };

  useEffect(() => {
    if (isEmpty(params.id)) {
      navigate(-1);
    } else {
      getSpecificObjectById();
    }
  }, [params]);

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
          onClick: () => navigate("/dashboard/objects/details/settings"),
        }}
      />
      <Box mx={4} mt={4}>
        <ObjectDetailsHeader objectName={activeObject?.name || ""} />
        <ObjectDetailsBody activeObject={activeObject} />
      </Box>
    </Box>
  );
};

export default ObjectDetails;
