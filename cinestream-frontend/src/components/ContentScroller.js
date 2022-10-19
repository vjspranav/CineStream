import { useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
// import { useNavigate } from "react-router-dom";

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
  // const navigate = useNavigate();
  // console.log(data);
  let temp = {};
  Object.keys(data).forEach((key) => {
    temp[key.id] = false;
  });

  const [hover, setHover] = useState(temp);

  return (
    <CardGroup
      className="d-flex flex-row flex-nowrap overflow-auto"
      style={{
        width: "100%",
        padding: "10px 0",
      }}
    >
      {Object.values(data).map((item) => (
        <div
          key={item.id}
          style={{
            margin: "0 10px",
          }}
        >
          <Card
            className="mx-2"
            style={
              hover[item.id]
                ? {
                    minWidth: "300px",
                    maxWidth: "300px",
                    minHeight: "350px",
                    cursor: "pointer",
                    boxShadow: "0 0 10px 0 rgba(255, 255, 255, 0.5)",
                  }
                : {
                    minWidth: "300px",
                    maxWidth: "300px",
                    minHeight: "350px",
                  }
            }
            onClick={() => {
              window.location.href = window.location + "movieViewer/" + item.id;
            }}
          >
            <Card.Img
              onMouseEnter={() => {
                setHover({ ...hover, [item.id]: true });
              }}
              onMouseLeave={() => {
                setHover({ ...hover, [item.id]: false });
              }}
              style={{
                height: "200px",
                objectFit: "cover",
              }}
              variant="top"
              src={item.url + "/thumbnails/" + item.name + ".png"}
            />
            <Card.Body
              onMouseEnter={() => {
                setHover({ ...hover, [item.id]: true });
              }}
              onMouseLeave={() => {
                setHover({ ...hover, [item.id]: false });
              }}
              style={{
                color: "black",
              }}
            >
              {/* Scroll text if longer than 20 */}
              <Card.Title
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </Card.Title>

              <Card.Text>{"Price: " + item.cost + " INR"}</Card.Text>
              <Card.Text>
                {"Duration: " +
                  formatTime(parseInt(item.duration.split(" ")[0]))}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </CardGroup>
  );
};

export default ContentScroller;
