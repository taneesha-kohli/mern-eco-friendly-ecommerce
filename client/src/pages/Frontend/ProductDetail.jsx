import { useSelector } from "react-redux";

const ProductDetail = () => {

   const {singleProduct}  = useSelector((state)=> state.product)

   console.log("single product", singleProduct)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-14">

        {/* Left - Image */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <img
            src={singleProduct.image}
            alt="Eco Bottle"
            className="w-full h-[400px] object-contain rounded-xl"
          />
        </div>

        {/* Right - Details */}
        <div>

          <h1 className="text-3xl font-semibold text-gray-800 mb-3">
            {singleProduct.title}
          </h1>

          <p className="text-2xl text-green-600 font-bold mb-4">
           ${(singleProduct.price).toFixed(2)}
          </p>

          <p className="text-gray-600 mb-6">
           {singleProduct.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex border rounded-lg">
              <button className="px-3 py-1">-</button>
              <span className="px-4">1</span>
              <button className="px-3 py-1">+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold">
              Add to Cart
            </button>

            <button className="flex-1 border border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50">
              Buy Now
            </button>
          </div>



        </div>
      </div>

      {/* Extra Section */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Product Details
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Our bamboo bottle is handcrafted using ethically sourced materials. It is lightweight, durable, and perfect for everyday use. Designed for eco-conscious consumers who care about the environment.
        </p>
      </div> */}
    </div>
  );
};

export default ProductDetail;