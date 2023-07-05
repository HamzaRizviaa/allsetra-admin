import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";

const ObjectLocationHistory: FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (isEmpty(params.id)) {
      navigate(-1);
    }
  }, [params]);

  return <div>ObjectLocationHistory</div>;
};

export default ObjectLocationHistory;
