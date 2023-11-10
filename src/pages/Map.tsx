import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import {
  selectAccountGroups,
  selectAccountsState,
  selectDashboardAccountId,
  selectObjectTypesState,
  selectObjectsState,
} from "app/data/selectors";
import {
  getAllObjectTypesThunk,
  getAllObjectsThunk,
  getLoggedInUserThunk,
  getObjectsLocationsThunk,
  getUsersWithRoleDriverThunk,
} from "app/features";
import Map from "components/common/Map/Map";
import {
  MapWrapper,
  MiniButton,
  SearchFieldWrapper,
  TopLeftSection,
  TopRightSection,
} from "components/common/Map/Map.styled";
import {
  FilterButton,
  MapDisplaySettingsForm,
  MapFilterForm,
  SearchField,
  types,
} from "@vilocnv/allsetra-core";
import { useTheme } from "@mui/material";
import { DisplaySettings, FilterSettings } from "assets/icons";
import { FormikHelpers } from "formik";
import { isEmpty, omit } from "lodash";
import { getAllAccountGroupsThunk } from "app/features/accounts/actions/accountGroupsActions";

const MapMain: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [filterOpen, setFilterOpen] = useState(false);
  const [displaySettingsOpen, setDisplaySettingsOpen] = useState(false);

  const { allObjects } = useAppSelector(selectObjectsState);
  const accountId = useAppSelector(selectDashboardAccountId);
  const { accountGroups } = useAppSelector(selectAccountGroups);
  const { usersWithRoleDriver, usersWithRoleDriverLoading } =
    useAppSelector(selectAccountsState);
  const { allObjectTypes, objectTypesLoading } = useAppSelector(
    selectObjectTypesState
  );

  useEffect(() => {
    if (!isEmpty(accountId)) {
      dispatch(getAllAccountGroupsThunk(accountId));
      dispatch(getAllObjectTypesThunk());
      dispatch(getUsersWithRoleDriverThunk(accountId));
    }
  }, [accountId]);

  useDispatchOnMount(getLoggedInUserThunk);
  useDispatchOnMount(getAllObjectsThunk, allObjects.length ? undefined : true);

  const mapFiltersSubmitHanlder = async (
    values: types.IMapFilter,
    formikHelpers: FormikHelpers<types.IMapFilter>
  ) => {
    formikHelpers.setSubmitting(true);

    const payload = {
      accountId: accountId ?? "",
      values: {
        ...values,
        driverId: [values.driverId],
      },
    };

    if (values.driverId) {
      payload.values.driverId = [values.driverId];
    } else {
      // @ts-ignore
      payload.values = omit(values, "driverId");
    }

    await dispatch(getObjectsLocationsThunk(payload));

    formikHelpers.setSubmitting(false);
    setFilterOpen(false);
  };

  return (
    <MapWrapper>
      <TopLeftSection>
        <SearchFieldWrapper>
          <SearchField placeholder="Search" />
        </SearchFieldWrapper>

        <FilterButton
          theme={theme}
          onClick={() => setFilterOpen(true)}
          icon={<FilterSettings />}
        />
      </TopLeftSection>

      <TopRightSection>
        {/* <MiniButton disableRipple>
          <DisplaySettings onClick={() => setDisplaySettingsOpen(true)} />
        </MiniButton> */}
      </TopRightSection>
      <MapFilterForm
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSubmit={mapFiltersSubmitHanlder}
        groups={accountGroups}
        types={allObjectTypes}
        drivers={usersWithRoleDriver}
        dataLoading={usersWithRoleDriverLoading || objectTypesLoading}
        theme={theme}
      />
      <MapDisplaySettingsForm
        open={displaySettingsOpen}
        onClose={() => setDisplaySettingsOpen(false)}
        theme={theme}
        onSubmit={() => {}}
        geozones={[]}
      />
      <Map
        objects={allObjects}
        showSearch
        showFilter
        onFilterClick={() => setFilterOpen(true)}
      />
    </MapWrapper>
  );
};

export default MapMain;
