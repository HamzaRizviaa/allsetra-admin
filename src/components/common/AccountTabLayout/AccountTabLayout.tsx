import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { Box } from "@mui/material";
import { PageLoader, TabPanes, toast } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import {
  getSpecificAccountThunk,
  resetActiveAccountState,
  setActiveTabIndex,
} from "app/features";
import {
  selectAccountActiveTabIndex,
  selectActiveAccountState,
} from "app/data/selectors";
import {
  ACCOUNT_DETAILS_TABS_HEADINGS,
  ACCOUNT_TAB_INDEX_TO_ROUTENAME_MAPPING,
} from "app/data/constants";

const AccountTabLayout: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Global State
  const { activeAccount } = useAppSelector(selectActiveAccountState);
  const accountActiveTabIndex = useAppSelector(selectAccountActiveTabIndex);

  const getSpecificAccountById = async () => {
    // if (!isEmpty(activeAccount) && activeAccount.uniqueId === params.id) return;

    try {
      const { type } = await dispatch(getSpecificAccountThunk(params.id ?? ""));

      if (type !== "accounts/getSpecificAccountThunk/fulfilled") {
        navigate("/dashboard/account-manager");
        toast.error("Account was not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isEmpty(params.id)) {
      dispatch(resetActiveAccountState());
      navigate("/dashboard/account-manager");
    } else {
      getSpecificAccountById();
    }
  }, []);

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
