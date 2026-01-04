import "./Empty.css";
import empty from "../assets/empty.svg";
function Empty() {
  return (
    <div className="empty-container">
      <img src={empty}></img>
      <h3>No Products Yet</h3>
    </div>
  );
}

export default Empty;
