import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useDispatchOnMount } from "hooks";
import {
  selectAccountGroups,
  selectAccountsState,
  selectObjectTypesState,
  selectObjectsState,
} from "app/data/selectors";
import {
  getAllAccountsThunk,
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
  AdminMapFilterForm,
  FilterButton,
  MapDisplaySettingsForm,
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
  const [mapFilterSelectedId, setMapFilterSelectedID] = useState<string | null>(
    null
  );

  const { allObjects } = useAppSelector(selectObjectsState);
  const { accountGroups } = useAppSelector(selectAccountGroups);
  const { usersWithRoleDriver, usersWithRoleDriverLoading } =
    useAppSelector(selectAccountsState);
  const { allObjectTypes, objectTypesLoading } = useAppSelector(
    selectObjectTypesState
  );
  const { allAccounts } = useAppSelector(selectAccountsState);

  useEffect(() => {
    dispatch(getAllAccountsThunk());
  }, []);

  useEffect(() => {
    if (!isEmpty(mapFilterSelectedId)) {
      //@ts-ignore
      dispatch(getAllAccountGroupsThunk(mapFilterSelectedId));
      dispatch(getAllObjectTypesThunk());
      //@ts-ignore
      dispatch(getUsersWithRoleDriverThunk(mapFilterSelectedId));
    }
  }, [mapFilterSelectedId]);

  useDispatchOnMount(getLoggedInUserThunk);
  useDispatchOnMount(getAllObjectsThunk, allObjects.length ? undefined : true);

  const handleAccountIDChange = (filterSelectedId: string | null) => {
    setMapFilterSelectedID(filterSelectedId);
  };

  const mapFiltersSubmitHanlder = async (
    values: types.IAdminMapFilter,
    formikHelpers: FormikHelpers<types.IAdminMapFilter>
  ) => {
    formikHelpers.setSubmitting(true);

    const payload = {
      accountId: values.accountId ?? "",
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
      <AdminMapFilterForm
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSubmit={mapFiltersSubmitHanlder}
        users={allAccounts}
        groups={accountGroups}
        types={allObjectTypes}
        drivers={usersWithRoleDriver}
        dataLoading={usersWithRoleDriverLoading || objectTypesLoading}
        theme={theme}
        handleAccountIDChange={handleAccountIDChange}
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
