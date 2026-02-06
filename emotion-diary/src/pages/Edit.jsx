import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();

  return <div>Edit {params.id}</div>;
};

export default Edit;
