import { FC } from "react";
import { PageLoader } from "@vilocnv/allsetra-core";
import ObjectSettingsForm from "components/forms/objects/ObjectSettingsForm/ObjectSettingsForm";

// DATA
import { useActiveObjectById } from "hooks";

const ObjectSettings: FC = () => {
  const { activeObject, loading } = useActiveObjectById();

  return (
    <div>
      {loading ? (
        <PageLoader isLoading={loading} />
      ) : (
        <ObjectSettingsForm activeObject={activeObject} />
      )}
    </div>
  );
};

export default ObjectSettings;
