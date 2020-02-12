import { Button } from "reactstrap";

const ControllMenu = props => {
  return (
    <div className="controll-menu">
      <h1 className="title">Write Your Story</h1>
      <div className="status-box">Saved</div>
      <Button onClick={props.save} color="success">
        Save
      </Button>
    </div>
  );
};

export default ControllMenu;
