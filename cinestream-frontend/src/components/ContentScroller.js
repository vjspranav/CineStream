import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useNavigate } from "react-router-dom";


// Function that takes time in seconds and returns a string in the format of x hours, y minutes, z seconds
const formatTime = (time) => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = Math.floor(time % 60);

  let timeString = "";

  if (hours > 0) {
    timeString += hours + "h ";
  }

  if (minutes > 0) {
    timeString += minutes + "m ";
  }

  timeString += seconds + "s";

  return timeString;
};

const ContentScroller = ({ data }) => {
  const navigate = useNavigate();

  return (
    <CardGroup className="d-flex flex-row flex-nowrap overflow-auto">
      {Object.values(data).map((item) => (
        <div key={item.id}>
          <Card
            className="mx-2"
            style={{
              minWidth: "300px",
              maxWidth: "350px",
              minHeight: "300px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/movieViewer/${item.id}`)}          >
            <Card.Img
              variant="top"
              src={"data:image/png;base64," + item.thumbnail}
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{"Price: " + item.cost + " INR"}</Card.Text>
              <Card.Text>{"Duration: " + formatTime(
                
                parseInt(item.duration.split(" ")[0])
                )}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </CardGroup>
  );
};

export default ContentScroller;
