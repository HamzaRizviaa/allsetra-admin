import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { toast } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectDevicesState } from "app/data/selectors";
import { getSpecificDeviceThunk } from "app/features";

const useActiveDevice = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Global State
  const { specificDevice, loading } = useAppSelector(selectDevicesState);

  const getSpecificDevice = async () => {
    if (isEmpty(specificDevice) || specificDevice.uniqueId !== params.id) {
      const { type } = await dispatch(getSpecificDeviceThunk(params.id ?? ""));

      if (type === "devices/getSpecificDeviceThunk/rejected") {
        navigate(-1);
        toast.error("Device not found");
      }
    }
  };

  useEffect(() => {
    if (isEmpty(params.id)) {
      navigate(-1);
    } else {
      getSpecificDevice();
    }
  }, [params]);

  return { specificDevice, loading };
};

export default useActiveDevice;
