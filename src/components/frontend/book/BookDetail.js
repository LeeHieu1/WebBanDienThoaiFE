import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/BookDetail.css";
import swal from "sweetalert";

const BookDetail = () => {
  let { id } = useParams();

  const [bookState, setBookState] = useState({
    book: null,
    bookLoading: true,
  });

  const [quantity, setQuantity] = useState(1);

  const onAddToCartClick = async (e) => {
    e.preventDefault();

    try {
      const addToCart = await axios.post(`api/user/addCart`, {
        bookId: id,
        quantity: quantity,
      });
      if (addToCart.data.success)
        swal("Success", addToCart.data.message, "success");
      else swal("Warning", "Try again", "warning");
    } catch (error) {
      console.log(error);
    }
  };
  const onBuyNowClick = () => {};
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    async function getBookDetail() {
      try {
        const bookResponse = await axios.get(`api/book/${id}`);

        setBookState({
          book: bookResponse.data,
          bookLoading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getBookDetail();
  }, []);
  let body;
  if (bookState.bookLoading)
    body = (
      <>
        <div>Loading</div>
      </>
    );
  else
    body = (
      <>
        <div className="product-details-container">
          <div className="product-details-image-left">
            <div className="img-holder">
              <img
                src={bookState.book.image}
                alt=""
              />
            </div>
            <div className="product-buttons">
              <button className="btn-add-to-cart" onClick={onAddToCartClick}>
                Thêm vào giỏ hàng
              </button>
              {/* <button className="btn-buy-now" onClick={onBuyNowClick}>
                Mua ngay
              </button> */}
            </div>
          </div>
          <div className="product-details-right">
            <div className="product-title">{bookState.book.name}</div>
            <p>
              <strong>Tác giả: </strong>
              {bookState.book.authorname}
            </p>
            <div>
              <strong>Đánh giá (96) </strong>
            </div>
            <div className="rating">
              <input type="radio" name="rating" value="5" id="5" />
              <label for="5">☆</label>
              <input type="radio" name="rating" value="4" id="4" />
              <label for="4">☆</label>
              <input type="radio" name="rating" value="3" id="3" />
              <label for="3">☆</label>
              <input type="radio" name="rating" value="2" id="2" />
              <label for="2">☆</label>
              <input type="radio" name="rating" value="1" id="1" />
              <label for="1">☆</label>
            </div>
            <label for="description">
              <strong>Mô tả:</strong>
            </label>
            {bookState.book.description.split("\n").map((d) => (
              <p>{d}</p>
            ))}
            {/* <p>{bookState.book.description}</p> */}
            <div>
              <strong>Giá:</strong> {bookState.book.price} đ
            </div>
            <div>
              <div className="line-quantity">
                <label for="input-quantity">
                  <strong>Số lượng: </strong>
                </label>
                <div className="input-quantity" id="input-quantity">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      minusQuantity();
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      e.preventDefault();

                      setQuantity(parseInt(e.target.value));
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addQuantity();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return body;
};

export default BookDetail;
