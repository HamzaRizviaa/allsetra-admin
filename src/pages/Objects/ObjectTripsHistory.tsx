import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";

const ObjectTripsHistory: FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (isEmpty(params.id)) {
      navigate(-1);
    }
  }, [params]);

  return <div>ObjectTripsHistory</div>;
};

export default ObjectTripsHistory;
