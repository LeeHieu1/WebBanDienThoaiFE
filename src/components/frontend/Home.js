import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import SingleBook from "./book/SingleBook";

function Home() {
  const [bookState, setBookState] = useState({ books: [], bookLoading: true });

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get("api/book/search?page=1");
        setBookState({ books: response.data.data, bookLoading: false });
      } catch (error) {
        console.log(error);
      }
    }
    getBooks();
  }, []);
  let body;
  console.log("re-rendered");
  if (bookState.bookLoading) {
    body = <div>Loading</div>;
  } else {
    body = (
      <Row>
        {bookState.books.map((book) => {
          console.log("Alo");
          return (
            <>
              <SingleBook book={book} />
            </>
          );
        })}
      </Row>
    );
  }
  return (
    <div>
      <h1>I am Home Page</h1>
      {body}
    </div>
  );
}

export default Home;
