import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const ContentScroller = ({ data }) => {
  return (
    <CardGroup className="d-flex flex-row flex-nowrap overflow-auto">
      {Object.values(data).map((item) => (
        <Card className="mx-2" style={{ minWidth: "300px", maxWidth: "300px" }}>
          <Card.Img
            variant="top"
            src={"data:image/png;base64," + item.thumbnail}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{("Price:", item.cost)}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
};

export default ContentScroller;
