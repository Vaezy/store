import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  });
  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                src={product.image}
                style={{ height: "300px", objectFit: "contain" }}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price} €</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
