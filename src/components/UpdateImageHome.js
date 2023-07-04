import Button from "react-bootstrap/Button";

const UpdateImageHome = ({ handleUpdateImage }) => {
  return (
    <div>
      <Button onClick={handleUpdateImage}>Update Image</Button>
    </div>
  );
};
export default UpdateImageHome;
