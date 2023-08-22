import { FC, useState } from "react";
import { useAppSelector, useDispatchOnMount } from "hooks";
import { selectObjectsState } from "app/data/selectors";
import { getAllObjectsThunk } from "app/features";
import Map from "components/common/Map/Map";
import {
  MapWrapper,
  MiniButton,
  SearchFieldWrapper,
  TopLeftSection,
  TopRightSection,
} from "components/common/Map/Map.styled";
import {
  Button,
  FilterButton,
  MapDisplaySettingsForm,
  MapFilterForm,
  SearchField,
} from "@vilocnv/allsetra-core";
import { useTheme } from "@mui/material";
import { DisplaySettings } from "assets/icons";

const MapMain: FC = () => {
  const theme = useTheme();
  const temp = [{}];
  const type = [
    { name: "Tags", id: 1 },
    { name: "Tags 2", id: 2 },
    { name: "Tags 3", id: 3 },
  ];
  const state = [
    { name: "Moving", id: 1 },
    { name: "Ignition off", id: 2 },
    { name: "Stopped", id: 3 },
  ];
  const accounts = [
    { name: "Any account", id: 1 },
    { name: "Skoda", id: 2 },
    { name: "Mahindra", id: 3 },
  ];
  const geozones = [
    { name: "Geozone 1", id: 1 },
    { name: "Geozone 2", id: 2 },
    { name: "Geozone 3", id: 3 },
  ];

  const [filterOpen, setFilterOpen] = useState(false);
  const [displaySettingsOpen, setDisplaySettingsOpen] = useState(false);

  const { allObjects } = useAppSelector(selectObjectsState);

  useDispatchOnMount(getAllObjectsThunk, allObjects.length ? undefined : true);

  const geozone = [{ lat: 52.150125, lng: 5.4 }];

  return (
    <MapWrapper>
      <TopLeftSection>
        <SearchFieldWrapper>
          <SearchField placeholder="Search" />
        </SearchFieldWrapper>

        <FilterButton theme={theme} onClick={() => setFilterOpen(true)} />
      </TopLeftSection>

      <TopRightSection>
        <MiniButton disableRipple>
          <DisplaySettings onClick={() => setDisplaySettingsOpen(true)} />
        </MiniButton>
      </TopRightSection>
      <MapFilterForm
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        theme={theme}
        onSubmit={() => {}}
        type={type}
        state={state}
        accounts={accounts}
      />
      <MapDisplaySettingsForm
        open={displaySettingsOpen}
        onClose={() => setDisplaySettingsOpen(false)}
        theme={theme}
        onSubmit={() => {}}
        geozones={geozones}
      />
      <Map
        center={{ lat: 52.0, lng: 5.301137 }}
        zoom={10}
        radius={50}
        objects={temp}
        geozone={geozone}
      />
    </MapWrapper>
  );
};

export default MapMain;
