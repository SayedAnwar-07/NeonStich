import React from "react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      avatar:
        "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
      rating: 5,
      review: "Great product! Highly recommend it to everyone.",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
      rating: 4,
      review: "Very good quality, but a bit pricey.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar:
        "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
      rating: 3,
      review: "It's okay, but I expected better.",
    },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8">Customer Reviews</h1>
      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{review.name}</h2>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
