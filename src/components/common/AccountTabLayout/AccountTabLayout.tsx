import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box } from "@mui/material";
import { TabPanes } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { setActiveTabIndex } from "app/features";
import { selectAccountActiveTabIndex } from "app/data/selectors";
import {
  ACCOUNT_DETAILS_TABS_HEADINGS,
  ACCOUNT_TAB_INDEX_TO_ROUTENAME_MAPPING,
} from "app/data/constants";

const AccountTabLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Global State
  const accountActiveTabIndex = useAppSelector(selectAccountActiveTabIndex);

  useEffect(() => {
    if (isEmpty(params.id)) {
      navigate("/dashboard/account-manager");
    }
  }, [params]);

  const onChangeTab = (value: number) => {
    dispatch(setActiveTabIndex(value));
    navigate(
      `/dashboard/account-manager/${ACCOUNT_TAB_INDEX_TO_ROUTENAME_MAPPING[value]}/${params.id}`
    );
  };

  return (
    <Box>
      <TabPanes
        value={accountActiveTabIndex}
        onChange={onChangeTab}
        headings={ACCOUNT_DETAILS_TABS_HEADINGS}
      >
        <Box mt={4} mx={4}>
          {children}
        </Box>
      </TabPanes>
    </Box>
  );
};

export default AccountTabLayout;
