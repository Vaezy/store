import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./App.scss";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Une erreur est survenue.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const newProduct = {
      title: "Nouveau produit",
      price: 19.99,
      description:
        "Ceci est une description d'un produit ajouté par l'utilisateur.",
      image: "https://via.placeholder.com/150",
      category: "electronics",
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été créé`);
      setProducts([...products, data]);
    } catch (error) {
      console.error(error.message);
      alert("Une erreur est survenue lors de l'ajout du produit.");
    }
  };

  const updateProduct = async (id) => {
    const updatedProduct = {
      title: "Produit modifié",
      price: 29.99,
      description: "Description mise à jour du produit.",
      image: "https://via.placeholder.com/150",
      category: "electronics",
    };

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }

      const data = await response.json();
      alert(`Le produit avec l'id ${data.id} a été modifié`);
      setProducts(
        products.map((product) => (product.id === id ? data : product))
      );
    } catch (error) {
      console.error(error.message);
      alert("Une erreur est survenue lors de la modification du produit.");
    }
  };

  const updatePrice = async (id) => {
    const newPrice = 5;

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }

      const data = await response.json();
      alert(`Le prix du produit avec l'id ${data.id} a été modifié`);

      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, price: newPrice } : product
        )
      );
    } catch (error) {
      console.error(error.message);
      alert("Une erreur est survenue lors de la modification du prix.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${
            response.statusText ? response.statusText + " - " : ""
          }${response.status}`
        );
      }

      alert(`Le produit avec l'id ${id} a été supprimé`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error.message);
      alert("Une erreur est survenue lors de la suppression du produit.");
    }
  };

  if (error) return <p>Erreur : {error}</p>;
  if (loading) return <p>Chargement...</p>;

  return (
    <Container className="mt-4">
      <Button onClick={addProduct} variant="primary" className="mb-4">
        Ajouter un produit
      </Button>

      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} lg={3} className="mb-4">
            <Card className="product-card">
              <Card.Img
                src={product.image}
                className="product-image"
                alt={product.title}
              ></Card.Img>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text-muted">
                  {product.description}
                </Card.Text>
                <Card.Text>{product.price} €</Card.Text>
                <Button
                  onClick={() => updateProduct(product.id)}
                  variant="warning"
                >
                  Modifier le produit complet
                </Button>
                <Button
                  onClick={() => updatePrice(product.id)}
                  variant="secondary"
                  className="mt-2"
                >
                  Modifier le prix du produit
                </Button>
                <Button
                  onClick={() => deleteProduct(product.id)}
                  variant="danger"
                  className="mt-2"
                >
                  Supprimer le produit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
