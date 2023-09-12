import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { toast } from "@vilocnv/allsetra-core";

// Data
import { useAppDispatch, useAppSelector } from "hooks";
import { selectQueriedObjectsState } from "app/data/selectors";
import { getSpecificObjectByIdThunk } from "app/features";

const useActiveObjectById = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  // Global State
  const { activeObject, loading } = useAppSelector(selectQueriedObjectsState);

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
  }, [params.id]);

  return { activeObject, loading };
};

export default useActiveObjectById;
