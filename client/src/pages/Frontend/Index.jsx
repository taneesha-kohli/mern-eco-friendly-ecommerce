import products from './products.json'
import { Leaf, Truck, ShieldCheck, RefreshCcw, ChevronLeft, ChevronRight, Heart } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart, getCartTotal } from '@/store/shop/CartSlice';
import { toast } from 'react-toastify';
import { addToWishlist, getProduct } from '@/store/shop/ProductSlice';
import { useNavigate } from 'react-router-dom';


export default function Home() {

  const dispatch = useDispatch()

  const array = [
     "banner1.webp",
     "banner2.avif",
     "banner3.webp",
     "banner4.webp "
  ]

  const [activeIndex, setActiveIndex] = useState(0);
  const {products, wishlist} = useSelector((state)=> state.product)
  const {user} = useSelector((state)=> state.auth)

  const arrayLength = (array.length)-1;

  console.log("Products through json", products);

    const handleAddToCart = (productId)=>{
      const cartData = {
        userId: user.userId,
        productId: productId,
      }

      dispatch(addToCart(cartData)).then((res)=>{
        if(res.payload.status)
        {
          toast.success("Product added to cart");
          dispatch(fetchCart(user.userId))
          dispatch(getCartTotal())
        }
        if(res.payload.limit){
          toast.error("You can't increase quantity more than 5")
        }
      })
    }

   const handleAddToWishlist = (productId)=>{
      dispatch(addToWishlist(productId))
   }

   const navigate = useNavigate();

    const handleActiveCategory = (item)=>{
  navigate(item.path ? item.path : `/shop?category=${encodeURIComponent(item.category)}`)

  }
    const handleActiveBrand = (item)=>{
  navigate(item.path ? item.path : `/shop?brand=${encodeURIComponent(item.brand)}`)

  }

  const openProductDetail = (_id)=>{
    dispatch(getProduct(_id));
    navigate(`/shop/${_id}`);
  }

  const brands = [

  {
    brand: 'BareForm',
    value: 'bareForm',
    img: 'bareform.png'
  },
  {
    brand: 'CarryKind',
    value: 'carryKind',
    img: 'carryKind.png'
  },
  {
    brand: 'EarthWear',
    value: 'earthWear',
    img: 'earthWear.png'
  },
  {
    brand: 'LoopLife',
    value: 'loopLife',
    img: 'loopLife.png'
  },
  {
    brand: 'NestTheory',
    value: 'nestTheory',
    img: 'nestTheory.png'
  },
  {
    brand: 'Root & Ritual',
    value: 'root-ritual',
    img: 'root.png'
  },
  {
    brand: 'WildForm',
    value: 'wildForm',
    img: 'wildForm.png'
  },
  {
    brand: 'TerraStep',
    value: 'terraStep',
    img: 'terrastep.png'
  },
  {
    brand: 'BambooRoot',
    value: 'bambooRoot',
    img: 'bambooRoot.png'
  }
];

  return (
    <div className="w-full">

      {/* HERO BANNER */}
      <section className="bg-[#e6f5ef]">
        <div className="max-w-full w-full slider relative">

{/* 
        <img src={array[activeIndex]} alt="" className="w-full max-w-full h-[140vh]" />

       <div className="arrows flex absolute top-[40%] justify-between mx-3 w-[98.5%] ">
        <div className="prev p-2 border-black border-2 rounded cursor-pointer" onClick={()=> setActiveIndex((prev)=> prev>0 ? --prev : arrayLength)}>
            <ChevronLeft />
        </div>
        <div className="next p-2 border-black border-2 rounded cursor-pointer" onClick={()=> setActiveIndex((prev)=> prev<arrayLength ? ++prev : 0)}>
          <ChevronRight />
        </div>
        </div>

        <div className="bullets absolute gap-2 w-full flex justify-center bottom-4">
        {
          array.map((item,index)=>{
            console.log("index", index, "is equal to active", index == activeIndex)
            return(
              <div className={`bullet w-4 h-4 rounded-[100%] border-black border-2 cursor-pointer ${activeIndex == index ? 'bg-[var(--main)] border-white' : ''}`} onClick={()=> setActiveIndex(index)}></div>
            )
          })
        }
         
        </div> */}

          <Carousel className="main-banner ">
            <CarouselContent >
              <CarouselItem><img src="banner1.webp" className="w-full h-[140vh]" /></CarouselItem>
              <CarouselItem><img src="banner2.avif" className="w-full h-[140vh]" /></CarouselItem>
              <CarouselItem><img src="banner3.webp" className="w-full h-[140vh]" /></CarouselItem>
              <CarouselItem><img src="banner4.webp" className="w-full h-[140vh]" /></CarouselItem>
            </CarouselContent>

            <CarouselPrevious className="banner-prev"/>
            <CarouselNext className="banner-next"/>

          </Carousel>

        </div>
      </section>


      {/* CATEGORIES */}
      <section className="py-14 px-[5vw]">
        <div className="max-w-[1200px] mx-auto">

          <h2 className="text-2xl font-semibold text-center mb-8">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              {
                category: "Clothing",
                img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
              },
              {
                category: "Footwear",
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              },
              {
                category: "Bags",
                img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7"
              },
              {
                category: "Accessories",
                img: "https://images.unsplash.com/photo-1519741497674-611481863552"
              },
              {
                category: "Home & Living",
                img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              },
              {
                category: "Reusable Products",
                img: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807"
              }
            ].map((cat) => (
              <div
                key={cat.name}
                className="border rounded-lg overflow-hidden hover:shadow-md cursor-pointer bg-white"
              onClick={()=> handleActiveCategory(cat)}  
              >

                <img
                  src={cat.img}
                  alt={cat.category}
                  className="w-full h-36 object-cover"
                />

                <div className="p-3 text-center">
                  <p className="font-medium">{cat.category}</p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>


 {/* BRAND LOGOS */}

<section className="bg-gray-50 py-14 px-[5vw]">
  <div className="max-w-[1200px] mx-auto">

```
<h2 className="text-center text-2xl font-semibold mb-10">
  Trusted Eco Brands
</h2>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-5">
  {
    brands.map((item)=>{
    return(
      <div
      className="bg-white border rounded-lg flex items-center justify-center p-6 hover:shadow-md transition"
      onClick={()=> handleActiveBrand(item)}
    >
      <img
        src={item.img}
        className="h-10 object-contain"
      />
    </div>
    )
    })
  }
   
  

</div>

  </div>
</section>




      {/* FEATURED PRODUCTS */}
      <section className="py-14 px-[5vw]">
        <div className="max-w-[1200px] mx-auto">

          <h2 className="text-2xl font-semibold text-center mb-8">
            Featured Products
          </h2>

         
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                 products.map((item)=>{
                   const {_id, title, brand, price, image, status, stock} = item;
                     const wishlistProduct = wishlist.find((item)=> item.productId == _id);
                   if(status == 'Active')
                   {
                   return(
                      <div className="border rounded-xl overflow-hidden shadow-sm relative " >
                 <img
                   src={image}
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-4">
                    <h3 className="font-semibold cursor-pointer"  onClick={() => openProductDetail(_id)}>{title}</h3>
                   <p className="text-sm text-gray-500">{brand}</p>
                   <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
                 </div>
                <Button className="bg-[var(--main)] p-5 text-white flex  mx-auto mb-5 w-[90%]" onClick={()=> handleAddToCart(_id)}>Add To Cart</Button>
                                <Button className=" text-white flex rounded-[100%] absolute top-1 right-1 w-[35px] h-[35px]" onClick={()=> handleAddToWishlist(_id)}> <Heart className={wishlistProduct ? 'fill-red-600 stroke-transparent size-[25px] shadow-black' : 'size-[25px] shadow-black stroke-[var(--main)]'}/></Button>
               </div>
                   )
                   }
                 })
                }
          
     
     
             </div>

        </div>
      </section>


      {/* PROMOTION BANNER */}
      <section className="bg-[#00965f] text-white py-12 px-[5vw]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>
            <h2 className="text-2xl font-semibold">
              Summer Eco Sale
            </h2>
            <p>Up to 40% off sustainable products</p>
          </div>

          <button className="bg-white text-black px-6 py-3 rounded-md">
            Shop Deals
          </button>

        </div>
      </section>


      {/* BEST SELLERS */}
      <section className="py-14 px-[5vw]">
        <div className="max-w-[1200px] mx-auto">

          <h2 className="text-2xl font-semibold text-center mb-8">
            Best Sellers
          </h2>

          
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                 products.map((item)=>{
                   const {_id, title, brand, price, image, status, stock} = item;
                     const wishlistProduct = wishlist.find((item)=> item.productId == _id);
                   if(status == 'Active')
                   {
                   return(
                      <div className="border rounded-xl overflow-hidden shadow-sm relative " >
                 <img
                   src={image}
                   className="w-full h-48 object-cover"
                 />
                 <div className="p-4">
                    <h3 className="font-semibold cursor-pointer"  onClick={() => openProductDetail(_id)}>{title}</h3>
                   <p className="text-sm text-gray-500">{brand}</p>
                   <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
                 </div>
                <Button className="bg-[var(--main)] p-5 text-white flex  mx-auto mb-5 w-[90%]" onClick={()=> handleAddToCart(_id)}>Add To Cart</Button>
                                <Button className=" text-white flex rounded-[100%] absolute top-1 right-1 w-[35px] h-[35px]" onClick={()=> handleAddToWishlist(_id)}> <Heart className={wishlistProduct ? 'fill-red-600 stroke-transparent size-[25px] shadow-black' : 'size-[25px] shadow-black stroke-[var(--main)]'}/></Button>
               </div>
                   )
                   }
                 })
                }
          
     
     
             </div>

        </div>
      </section>


      {/* ECO BENEFITS */}
      <section className="bg-gray-50 py-14 px-[5vw]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          <div>
            <Leaf className="mx-auto mb-3 text-[#00965f]" size={30}/>
            <h4 className="font-semibold mb-2">Eco Friendly</h4>
            <p className="text-sm text-gray-500">
              Sustainable materials used
            </p>
          </div>

          <div>
            <Truck className="mx-auto mb-3 text-[#00965f]" size={30}/>
            <h4 className="font-semibold mb-2">Free Shipping</h4>
            <p className="text-sm text-gray-500">
              On orders above $50
            </p>
          </div>

          <div>
            <ShieldCheck className="mx-auto mb-3 text-[#00965f]" size={30}/>
            <h4 className="font-semibold mb-2">Secure Payment</h4>
            <p className="text-sm text-gray-500">
              100% safe checkout
            </p>
          </div>

          <div>
            <RefreshCcw className="mx-auto mb-3 text-[#00965f]" size={30}/>
            <h4 className="font-semibold mb-2">Easy Returns</h4>
            <p className="text-sm text-gray-500">
              30 day returns
            </p>
          </div>

        </div>
      </section>


      {/* NEW ARRIVALS */}
      <section className="py-14 px-[5vw]">
        <div className="max-w-[1200px] mx-auto">

          <h2 className="text-2xl font-semibold text-center mb-8">
            New Arrivals
          </h2>

         
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                         {
                          products.map((item)=>{
                            const {_id, title, brand, price, image, status, stock} = item;
                              const wishlistProduct = wishlist.find((item)=> item.productId == _id);
                            if(status == 'Active')
                            {
                            return(
                               <div className="border rounded-xl overflow-hidden shadow-sm relative " >
                          <img
                            src={image}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                             <h3 className="font-semibold cursor-pointer"  onClick={() => openProductDetail(_id)}>{title}</h3>
                            <p className="text-sm text-gray-500">{brand}</p>
                            <p className="text-green-600 font-bold">${price.toFixed(2)}</p>
                          </div>
                         <Button className="bg-[var(--main)] p-5 text-white flex  mx-auto mb-5 w-[90%]" onClick={()=> handleAddToCart(_id)}>Add To Cart</Button>
                                         <Button className=" text-white flex rounded-[100%] absolute top-1 right-1 w-[35px] h-[35px]" onClick={()=> handleAddToWishlist(_id)}> <Heart className={wishlistProduct ? 'fill-red-600 stroke-transparent size-[25px] shadow-black' : 'size-[25px] shadow-black stroke-[var(--main)]'}/></Button>
                        </div>
                            )
                            }
                          })
                         }
                   
              
              
                      </div>

        </div>
      </section>


      {/* NEWSLETTER */}
      <section className="bg-[#00965f] py-14 px-[5vw] text-white">
        <div className="max-w-[700px] mx-auto text-center">

          <h2 className="text-2xl font-semibold mb-3">
            Join Our Eco Community
          </h2>

          <p className="mb-6">
            Subscribe for eco tips and special offers
          </p>

          <div className="flex bg-white rounded overflow-hidden">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-black outline-none"
            />

            <button className="bg-black px-6">
              Subscribe
            </button>

          </div>

        </div>
      </section>

    </div>
  )
}