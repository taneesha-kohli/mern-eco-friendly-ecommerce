// import products from './products.json'
import { Button } from "@/components/ui/button";
import { addToCart, fetchCart, getCartTotal } from "@/store/shop/CartSlice";
import {
  addToWishlist,
  fetchProducts,
  getProduct,
} from "@/store/shop/ProductSlice";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ShopPage() {
  const dispatch = useDispatch();
  const { products, wishlist } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeBrand = searchParams.get("brand");
  const navigate = useNavigate();
  const [category, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log("user", user);

  console.log("products", products);

  console.log("active brand", activeBrand);

  const handleAddToCart = (productId) => {
    const cartData = {
      userId: user.userId,
      productId: productId,
    };

    dispatch(addToCart(cartData)).then((res) => {
      if (res.payload.status) {
        toast.success("Product added to cart");
        dispatch(fetchCart(user.userId));
        dispatch(getCartTotal());
      }
      if (res.payload.limit) {
        toast.error("You can't increase quantity more than 5");
      }
    });
  };

  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const categories = [
    "Clothing",
    "Footwear",
    "Bags",
    "Accessories",
    "Beauty & Personal Care",
    "Home & Living",
    "Reusable Products",
    "Kitchen & Dining",
    "Fitness & Outdoor",
  ];

  const brands = [
    "TerraStep",
    "CarryKind",
    "BareForm",
    "Root & Ritual",
    "NestTheory",
    "LoopLife",
    "BambooRoot",
    "WildForm",
    "EarthWear",
  ];

  const handleClickedCategory = (item) => {
    const exists = category.find((cat) => cat == item.toLowerCase());
    if (exists) {
      const updatedCategory = category.filter(
        (cat) => cat != item.toLowerCase(),
      );
      setCategories(updatedCategory);
    } else {
      setCategories((prev) => [...prev, item.toLowerCase()]);
    }
  };
  const handleClickedBrand = (item) => {
    const exists = brand.find((br) => br == item.toLowerCase());
    if (exists) {
      const updatedBrand = brand.filter((br) => br != item.toLowerCase());
      setBrand(updatedBrand);
    } else {
      setBrand((prev) => [...prev, item.toLowerCase()]);
    }
  };

  const openProductDetail = (_id) => {
    dispatch(getProduct(_id));
    navigate(`/shop/${_id}`);
  };

  let filteredProducts = [];

  if (category.length > 0 || brand.length > 0) {
    category?.forEach((cat) => {

        
      let product = products.find((item) => item.category.toLowerCase() == cat);
      if(product)
      {
      if(brand.length > 0)
      {
        // filteredProducts = [];
      let brandProduct = brand.find((item) => item == product.brand.toLowerCase());
      const exists = filteredProducts.find((item)=> item == product);
  
      if (brandProduct) {
        if(!exists)
        {

          filteredProducts.push(product);
        }
      }

    }
    else 
    {
      const exists = filteredProducts.find((item)=> item == product);

      if(!exists)
      {
        filteredProducts.push(product);
      }
    }
  }

      
    });

    brand?.forEach((br) => {

      
      let product = products.find((item) => item.brand.toLowerCase() == br);
     if(product)
     {
      
      if(category.length > 0)
      {
        // filteredProducts = [];
      let catProduct = category.find((item) => item == product.category.toLowerCase());
      const exists = filteredProducts.find((item)=> item == product);
  
      if (catProduct) {
        if(!exists)
        {

          filteredProducts.push(product);
        }
      }


    }
    else 
    {
      const exists = filteredProducts.find((item)=> item == product);

      if(!exists)
      {
        filteredProducts.push(product);
      }
    }
    
     }

    });
  }
 
   else {
    filteredProducts = products;
  }

  console.log("filter product before sort by", filteredProducts)

   if(sortBy && filteredProducts)
  {

    if(sortBy == 'Price: Low to High')
    {
      const updated = [...filteredProducts].sort((a, b)=> a.price - b.price)
      filteredProducts = updated
    }
    if(sortBy == 'Price: High to Low')
    {
      const updated = [...filteredProducts].sort((a, b)=> b.price - a.price)
      filteredProducts = updated
    }
    if(sortBy == 'Title: A - Z')
    {
      const updated = [...filteredProducts].sort((a, b)=> a.title.localeCompare(b.title))
      filteredProducts = updated
    }
    if(sortBy == 'Title: Z - A')
    {
      const updated = [...filteredProducts].sort((a, b)=> b.title.localeCompare(a.title))
      filteredProducts = updated
    }
  }

  console.log("filtered products", filteredProducts);

  console.log("categories", category, " brand ", brand, " sort by ", sortBy);

  if (activeCategory) {
    filteredProducts = products.filter(
      (item) => item.category == activeCategory.toLowerCase(),
    );
  }
  if (activeBrand) {
    filteredProducts = products.filter(
      (item) => item.brand.toLowerCase() == activeBrand.toLowerCase(),
    );
  }


  return (
    <div className="min-h-screen bg-white p-6 px-[5vw] flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-64 border-r pr-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="flex flex-col gap-2 text-sm">
            {categories.map((item) => {
              return (
                <label>
                  <input
                    type="checkbox"
                    checked={item == activeCategory || category.includes(item.toLowerCase()) ? true : false}
                    onClick={() => handleClickedCategory(item)}
                  />{" "}
                  {item}
                </label>
              );
            })}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-semibold mb-2">Brand</h3>
          <div className="flex flex-col gap-2 text-sm cursor-pointer">
            {brands.map((item) => {
              return (
                <label>
                  <input
                    type="checkbox"
                    checked={activeBrand == item || brand.includes(item.toLowerCase()) ? true : false}
                    onClick={() => handleClickedBrand(item)}
                  />{" "}
                  {item}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Eco Shop</h1>

          {/* Sort Dropdown */}
          <select
            className="border px-3 py-2 rounded-md text-sm"
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option>Sort By</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Title: A - Z">Title: A - Z</option>
            <option value="Title: Z - A">Title: Z - A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            filteredProducts ?
            filteredProducts.map((item) => {
            const { _id, title, brand, price, image, status, stock } = item;
            const wishlistProduct = wishlist.find(
              (item) => item.productId == _id,
            );
            if (status == "Active") {
              return (
                <div
                  className="border rounded-xl overflow-hidden shadow-sm relative "
                 
                >
                  <img src={image} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold cursor-pointer"  onClick={() => openProductDetail(_id)}>{title}</h3>
                    <p className="text-sm text-gray-500">{brand}</p>
                    <p className="text-green-600 font-bold">
                      ${price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    className="bg-[var(--main)] p-5 text-white flex  mx-auto mb-5 w-[90%]"
                    onClick={() => handleAddToCart(_id)}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    className=" text-white flex rounded-[100%] absolute top-1 right-1 w-[35px] h-[35px]"
                    onClick={() => handleAddToWishlist(_id)}
                  >
                    {" "}
                    <Heart
                      className={
                        wishlistProduct
                          ? "fill-red-600 stroke-transparent size-[25px] shadow-black"
                          : "size-[25px] shadow-black stroke-[var(--main)]"
                      }
                    />
                  </Button>
                </div>
              );
            }
          }) :
          ''
          }
        </div>
      </div>
    </div>
  );
}
