import React from 'react';
import { Link } from 'react-router-dom';
import Shopvibe from '../../assets/shopvibe_footer.png'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  MapPin,
  Phone,
  HousePlug,
  CreditCard,
  Truck,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { Separator } from '../ui/separator';

const ShopFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 w-full pt-12">
      {/* Features Section */}
      <div className="container mb-12 mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
          <div className="flex bg-gray-800 p-6 rounded-lg shadow-sm gap-4 items-center">
            <Truck className="h-10 text-primary text-white w-10" />
            <div>
              <h3 className="text-white font-bold">Free Shipping</h3>
              <p className="text-gray-400 text-sm">On orders over $100</p>
            </div>
          </div>
          <div className="flex bg-gray-800 p-6 rounded-lg shadow-sm gap-4 items-center">
            <ShieldCheck className="h-10 text-primary text-white w-10" />
            <div>
              <h3 className="text-white font-bold">Secure Payment</h3>
              <p className="text-gray-400 text-sm">100% secure payments</p>
            </div>
          </div>
          <div className="flex bg-gray-800 p-6 rounded-lg shadow-sm gap-4 items-center">
            <HeartHandshake className="h-10 text-primary text-white w-10" />
            <div>
              <h3 className="text-white font-bold">24/7 Support</h3>
              <p className="text-gray-400 text-sm">Dedicated support</p>
            </div>
          </div>
          <div className="flex bg-gray-800 p-6 rounded-lg shadow-sm gap-4 items-center">
            <CreditCard className="h-10 text-primary text-white w-10" />
            <div>
              <h3 className="text-white font-bold">Easy Returns</h3>
              <p className="text-gray-400 text-sm">30 day returns policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2 pb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              {/* <HousePlug className="h-6 text-white w-6" />
               */}
               <img src={Shopvibe} className='mt-[-6rem]' alt="shop-vibe logo" />
              {/* <span className="text-white text-xl font-bold">Shop Vibe</span> */}
            </div>
            <p className="text-gray-400">
              Your one-stop destination for trendy and quality products. Shop with confidence and style.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Products", "About Us", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Men", "Women", "Kids", "Beauty", "Sports"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {[{icon: MapPin, text: "1275A Kharar Garden Colony, Punjab 140301, Punjab"},
                {icon: Phone, text: "+1 234 567 8900"},
                {icon: Mail, text: "support@shopvibe.com"}].map(({icon: Icon, text}, index) => (
                <li key={index} className="flex text-gray-400 gap-3 items-center">
                  <Icon className="h-5 text-primary w-5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-gray-700 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between gap-4 items-center md:flex-row py-6">
            <p className="text-gray-400 text-sm">© {currentYear} Shop Vibe. All rights reserved.</p>
            <div className="flex gap-6 items-center">
              {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((item, index) => (
                <Link key={index} to="#" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
