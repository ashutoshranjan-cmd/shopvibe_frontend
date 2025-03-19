// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon,
//   CloudLightning, Heater, Images, Shirt, ShirtIcon,
//   ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon,FootprintsIcon
// } from "lucide-react";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { getFeatureImages } from "@/store/common-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { checkAuth } from "@/store/auth-slice";
// import nike from '../../assets/nike.png'
// import adidas from '../../assets/adidas.png'
// import levis from '../../assets/levis.png'
// import puma from '../../assets/puma.png'
// import zara from '../../assets/zara.png'
// import hm from '../../assets/hm.png'

// const categoriesWithIcon = [
//   { id: "men", label: "Men", icon: ShirtIcon },
//   { id: "women", label: "Women", icon: CloudLightning },
//   { id: "kids", label: "Kids", icon: BabyIcon },
//   { id: "accessories", label: "Accessories", icon: WatchIcon },
//   { id: "footwear", label: "Footwear", icon: FootprintsIcon },
// ];

// const brandsWithIcon = [
//   { id: "nike", label: "Nike", icon: nike },
//   { id: "adidas", label: "Adidas", icon: adidas },
//   { id: "puma", label: "Puma", icon: puma },
//   { id: "levi", label: "Levi's", icon: levis },
//   { id: "zara", label: "Zara", icon: zara },
//   { id: "h&m", label: "H&M", icon: hm },
// ];
// // const brandsWithIcon = [
// //   { id: "nike", label: "Nike", icon: Shirt },
// //   { id: "adidas", label: "Adidas", icon: WashingMachine },
// //   { id: "puma", label: "Puma", icon: ShoppingBasket },
// //   { id: "levi", label: "Levi's", icon: Airplay },
// //   { id: "zara", label: "Zara", icon: Images },
// //   { id: "h&m", label: "H&M", icon: Heater },
// // ];

// const fadeIn = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   exit: { opacity: 0, y: -20 }
// };

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  
//   const { productList, productDetails } = useSelector((state) => state.shopProducts);
//   const {isAuthenticated} = useSelector((state)=>state.auth);
//   const { featureImageList } = useSelector((state) => state.commonFeature);
//   const { user } = useSelector((state) => state.auth);
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();
   

//   const handleNavigateToListingPage = (getCurrentItem, section) => {
//     sessionStorage.removeItem("filters");
//     const currentFilter = {
//       [section]: [getCurrentItem.id],
//     };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate(`/listing`);
//   };

//   const handleGetProductDetails = (getCurrentProductId) => {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   };

//   const handleAddtoCart = (getCurrentProductId) => {
//     console.log(getCurrentProductId);
//     if(isAuthenticated)
//     {

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product added to cart successfully",
//           className: "bg-green-50"
//         });
//       }
//     });
//   }
//   else{
//     toast({
//       title: "Please log in first",
//       className: "bg-green-50"
//     });
//   }
//   };

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
//     }, 15000);
//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => {
//     dispatch(fetchAllFilteredProducts({
//       filterParams: {},
//       sortParams: "price-lowtohigh",
//     }));
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   return (
//     <motion.div 
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className="flex flex-col min-h-screen"
//     >
//       {/* Hero Section with Image Slider */}
//       <motion.div 
//         variants={fadeIn}
//         className="relative w-full h-[600px] overflow-hidden bg-gray-100"
//       >
//         <AnimatePresence mode="wait">
//           {featureImageList?.map((slide, index) => (
//             index === currentSlide && (
//               <motion.img
//                 key={index}
//                 src={slide?.image}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5}}
//                 className="absolute top-0 left-0 w-full h-full object-contain"
//               />
//             )
//           ))}
//         </AnimatePresence>
        
//         <div className="absolute inset-0 flex items-center justify-between px-4">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setCurrentSlide((prev) => 
//               (prev - 1 + featureImageList.length) % featureImageList.length
//             )}
//             className="transform hover:scale-105 transition-transform bg-white/80 hover:bg-white"
//           >
//             <ChevronLeftIcon className="w-4 h-4" />
//           </Button>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setCurrentSlide((prev) => 
//               (prev + 1) % featureImageList.length
//             )}
//             className="transform hover:scale-105 transition-transform bg-white/80 hover:bg-white"
//           >
//             <ChevronRightIcon className="w-4 h-4" />
//           </Button>
//         </div>
//       </motion.div>

//       {/* Categories Section */}
//       <motion.section 
//         variants={fadeIn}
//         className="py-16 bg-gradient-to-b from-gray-50 to-white"
//       >
//         <div className="container mx-auto px-4">
//           <motion.h2 
//             variants={fadeIn}
//             className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
//           >
//             Shop by Category
//           </motion.h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {categoriesWithIcon.map((category, index) => (
//               <motion.div
//                 key={category.id}
//                 variants={fadeIn}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card
//                   onClick={() => handleNavigateToListingPage(category, "category")}
//                   className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-6">
//                     <category.icon className="w-12 h-12 mb-4 text-primary" />
//                     <span className="font-bold">{category.label}</span>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Brands Section */}
//       <motion.section 
//         variants={fadeIn}
//         className="py-16 bg-white"
//       >
//         <div className="container mx-auto px-4">
//           <motion.h2 
//             variants={fadeIn}
//             className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
//           >
//             Shop by Brand
//           </motion.h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {brandsWithIcon.map((brand, index) => (
//               <motion.div
//                 key={brand.id}
//                 variants={fadeIn}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card
//                   onClick={() => handleNavigateToListingPage(brand, "brand")}
//                   className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 duration-300 "
//                 >
//                   <CardContent className="flex flex-col items-center justify-center p-6 ">
//                     <img className="h-14" src={brand.icon} alt="" />
//                     {/* <brand.icon className="w-12 h-12 mb-4 text-primary" /> */}
//                     <span className="font-bold">{brand.label}</span>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Featured Products Section */}
//       <motion.section 
//         variants={fadeIn}
//         className="py-16 bg-gradient-to-b from-white to-gray-50"
//       >
//         <div className="container mx-auto px-4">
//           <motion.h2 
//             variants={fadeIn}
//             className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
//           >
//             Featured Products
//           </motion.h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList?.map((product, index) => (
//               <motion.div
//                 key={product.id}
//                 variants={fadeIn}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <ShoppingProductTile
//                   handleGetProductDetails={handleGetProductDetails}
//                   product={product}
//                   handleAddtoCart={handleAddtoCart}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </motion.div>
//   );
// }

// export default ShoppingHome;
import React, { useEffect, useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon,
  CloudLightning, Heater, Images, Shirt, ShirtIcon,
  ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon, FootprintsIcon
} from "lucide-react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getFeatureImages } from "@/store/common-slice";
import { checkAuth } from "@/store/auth-slice";
import nike from '../../assets/nike.png'
import adidas from '../../assets/adidas.png'
import levis from '../../assets/levis.png'
import puma from '../../assets/puma.png'
import zara from '../../assets/zara.png'
import hm from '../../assets/hm.png'

// Lazy load components
const ShoppingProductTile = lazy(() => import("@/components/shopping-view/product-tile"));
const ProductDetailsDialog = lazy(() => import("@/components/shopping-view/product-details"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Image component with lazy loading
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <>
      {!isLoaded && <div className={`${className} bg-gray-200 animate-pulse`} />}
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={alt} 
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
      )}
    </>
  );
};

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: FootprintsIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: nike },
  { id: "adidas", label: "Adidas", icon: adidas },
  { id: "puma", label: "Puma", icon: puma },
  { id: "levi", label: "Levi's", icon: levis },
  { id: "zara", label: "Zara", icon: zara },
  { id: "h&m", label: "H&M", icon: hm },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Intersection Observer setup for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && productList?.length > visibleProducts.length && !loadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );
    
    const loadingElement = document.getElementById('loading-more');
    if (loadingElement) {
      observer.observe(loadingElement);
    }
    
    return () => {
      if (loadingElement) {
        observer.unobserve(loadingElement);
      }
    };
  }, [visibleProducts, productList, loadingMore]);

  const loadMoreProducts = () => {
    setLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const nextBatch = productList?.slice(
        visibleProducts.length,
        visibleProducts.length + 4
      );
      
      if (nextBatch?.length) {
        setVisibleProducts(prev => [...prev, ...nextBatch]);
      }
      
      setLoadingMore(false);
    }, 300);
  };

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/listing`);
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddtoCart = (getCurrentProductId) => {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product added to cart successfully",
            className: "bg-green-50"
          });
        }
      });
    } else {
      toast({
        title: "Please log in first",
        className: "bg-green-50"
      });
    }
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({
      filterParams: {},
      sortParams: "price-lowtohigh",
    }));
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Initialize visible products on productList change
  useEffect(() => {
    if (productList?.length > 0) {
      setVisibleProducts(productList.slice(0, 4));
    }
  }, [productList]);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section with Image Slider */}
      <motion.div 
        variants={fadeIn}
        className="relative w-full h-[600px] overflow-hidden bg-gray-100"
      >
        <AnimatePresence mode="wait">
          {featureImageList?.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5}}
                className="absolute top-0 left-0 w-full h-full"
              >
                <LazyImage 
                  src={slide?.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentSlide((prev) => 
              (prev - 1 + featureImageList.length) % featureImageList.length
            )}
            className="transform hover:scale-105 transition-transform bg-white/80 hover:bg-white"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentSlide((prev) => 
              (prev + 1) % featureImageList.length
            )}
            className="transform hover:scale-105 transition-transform bg-white/80 hover:bg-white"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.section 
        variants={fadeIn}
        className="py-16 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesWithIcon.map((category, index) => (
              <motion.div
                key={category.id}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(category, "category")}
                  className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <category.icon className="w-12 h-12 mb-4 text-primary" />
                    <span className="font-bold">{category.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Brands Section */}
      <motion.section 
        variants={fadeIn}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Shop by Brand
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandsWithIcon.map((brand, index) => (
              <motion.div
                key={brand.id}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  onClick={() => handleNavigateToListingPage(brand, "brand")}
                  className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <LazyImage 
                      src={brand.icon}
                      alt={brand.label}
                      className="h-14"
                    />
                    <span className="font-bold">{brand.label}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <motion.section 
        variants={fadeIn}
        className="py-16 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={product}
                    handleAddtoCart={handleAddtoCart}
                  />
                </Suspense>
              </motion.div>
            ))}
          </div>
          
          {/* Loading indicator for infinite scroll */}
          {productList?.length > visibleProducts?.length && (
            <div 
              id="loading-more"
              className="flex justify-center mt-8"
            >
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </motion.section>

      <Suspense fallback={<LoadingFallback />}>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </Suspense>
    </motion.div>
  );
}

export default ShoppingHome;