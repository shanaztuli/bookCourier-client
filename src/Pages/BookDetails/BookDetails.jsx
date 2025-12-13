import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import OrderModal from "./OrderModal";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

 const handleOrderClick = () => {
   if (!user) {
     navigate("/login");
     return;
   }
   setOpenModal(true);
 };

 if (!book) return <LoadingSpinner></LoadingSpinner>;


//
const handleAddWishlist = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  const wishlistData = {
    bookId: book._id,
    bookTitle: book.title,
    bookImage: book.image,
    price: book.price,
    userEmail: user.email,
  };

  fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(wishlistData),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Already wishlisted");
      return res.json();
    })
    .then(() => {
      toast("Added to wishlist ❤️");
    })
    .catch((err) => {
      toast("Already in wishlist");
    });
};




  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={book.image} className="rounded-xl" />

        <div>
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-gray-500 mt-2">by {book.author}</p>

          <p className="mt-4">{book.description}</p>

          <p className="text-2xl font-semibold mt-4">$ {book.price}</p>

          <div className="flex  flex-col gap-4">
            <button onClick={handleOrderClick} className="btn btn-btn  mt-6">
              Order Now
            </button>
            <button
              onClick={handleAddWishlist}
              className="btn btn-outline "
            >
              🤍 Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <OrderModal book={book} closeModal={() => setOpenModal(false)} />
      )}
    </div>
  );
};

export default BookDetails;
