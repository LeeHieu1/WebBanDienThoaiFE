import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

const SingleBook = ({ book }) => {
  const history = useHistory();
  const onAddToCartClick = async (e) => {
    e.preventDefault();

    try {
      const addToCart = await axios.post(`api/user/addCart`, {
        bookId: book.id,
        quantity: 1,
      });
      if (addToCart.data.success)
        swal("Success", addToCart.data.message, "success");
      else swal("Warning", "Try again", "warning");
    } catch (error) {
      console.log(error);
    }
  };
  const onImageClick = (e) => {
    e.preventDefault();
    history.push(`/books/${book.id}`);
  };
  return (
    <Card style={{ width: "25%", margin: "5px 10px 5px 10px " }}>
      <Card.Img
        variant="top"
        src={book.image}
        onClick={onImageClick}
      />
      <Card.Body>
        <Card.Title>
          <Link to={"/books/" + book.id}> {book.name}</Link>
        </Card.Title>
        <Card.Text>Giá: {book.price.toLocaleString('it-IT',{
          style:"currency",
          currency:"VND"
        })} </Card.Text>

        <Button variant="primary" onClick={onAddToCartClick}>
          Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
