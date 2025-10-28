import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../types";
import EmptyStateIcon from "./EmptyStateIcon";

type HomeProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

// ========================
// Image Slider Component
// ========================
const ProductImagesSlider = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return; // no slider needed
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );
  }

  return (
    <div className="w-full h-48 overflow-hidden relative bg-neutral-200 flex items-center justify-center">
      {images.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`${title} ${idx + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${idx === currentIndex ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

// ========================
// FAQ Item Component
// ========================
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left text-neutral-800 font-medium hover:text-secondary transition-colors"
      >
        <span>{question}</span>
        <span className={`transform transition-transform ${open ? "rotate-45" : "rotate-0"} text-2xl`}>+</span>
      </button>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="py-2 text-neutral-600">{answer}</p>
      </div>
    </div>
  );
};

// ========================
// Main Home Component
// ========================
const Home = ({ products, loading, error }: HomeProps) => {
  if (loading) {
    return <div className="text-center p-20 font-semibold text-neutral-500">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-20 text-red-600 font-semibold">
        Could not connect to the backend. Please make sure it's running.
      </div>
    );
  }

  // ===== FAQ Data =====
  const faqData = [
    {
      question: "How does RebuZZar work?",
      answer:
        "RebuZZar is an online marketplace where sellers can list their products for sale. Our team reviews the listing for quality and authenticity, then it becomes visible to buyers."
    },
    {
      question: "Do I need an account to use RebuZZar?",
      answer:
        "Yes. To sell or buy products, you must have an account. New users can sign up via email, and existing users can log in to access the platform."
    },
    {
      question: "How can I list a product for sale?",
      answer:
        "Log in, navigate to the 'Sell an Item' section, upload product details and images, then submit for review. Once approved, your product is live for buyers."
    },
    {
      question: "How does the approval process work?",
      answer: "Every product goes through a quality and authenticity review. If the product violates any of our guidelines, it will be rejected or sent back to the seller for correction."
    },
    {
      question: "What types of products are allowed?",
      answer: "Only original and authorized products that comply with laws and platform policies. Counterfeit or illegal items are strictly prohibited."
    },
    {
      question: "What payment methods do you support?",
      answer:
        "Buyers pay directly to the delivery agent at the time of delivery after inspecting the product. No advance payment is required."
    },
    {
      question: "Can I return or refund a product after purchasing?",
      answer:
        "No. All sales are final. Buyers can inspect products at delivery before making payment."
    },
    {
      question: "Can I cancel an order after placing it?",
      answer: "Buyers can cancel their orders any time before payment is made. Once payment has been completed, cancellations, returns, and refunds are not allowed."
    },
    {
      question: "Is my personal information safe on RebuZZar?",
      answer: "Yes. All personal data is processed in accordance with applicable data protection laws and our Privacy Policy."
    },
    {
      question: "How do I contact support?",
      answer: "Reach our support team via the 'Contact Us' page for any queries or issues."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-neutral-800 text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          The Student Marketplace
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-neutral-300">
          Buy and sell textbooks, electronics, and more, exclusively within your university community.
        </p>
        <Link
          to="/sell"
          className="mt-8 inline-block bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-transform duration-200 hover:scale-105"
        >
          Start Selling Today
        </Link>
      </div>

      {/* Main Content Area - Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center text-neutral-800 mb-8">
              Recently Added Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((data) => (
                <Link to={`/product/${data._id}`} key={data._id} className="group">
                  <div className="h-full flex flex-col border border-neutral-200 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-300 bg-neutral-100 overflow-hidden">
                    {/* Image Slider */}
                    <ProductImagesSlider
                      images={Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl]}
                      title={data.title}
                    />
                    {/* Product Info */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="font-bold text-lg truncate mb-1 text-neutral-700 group-hover:text-neutral-900 transition-colors">
                        {data.title}
                      </h2>
                      <p className="text-sm text-neutral-500 mb-2">{data.category}</p>
                      <p className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-neutral-900 transition-colors">
                        ₹{data.price.toLocaleString("en-IN")}
                      </p>
                      <div className="flex-grow"></div>
                      <button className="w-full mt-2 bg-neutral-600 text-white py-2 rounded-md font-semibold hover:bg-neutral-900 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-neutral-100 mt-12 rounded-lg shadow-sm">
            <EmptyStateIcon />
            <h2 className="mt-6 text-2xl font-semibold text-neutral-700">The Marketplace is Empty</h2>
            <p className="mt-2 text-neutral-600 max-w-md mx-auto">
              Be the first to list an item and help build the campus community marketplace!
            </p>
          </div>
        )}
      </div>

      {/* Story & Values Section */}
      <div className="bg-neutral-100 pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-sm font-semibold text-primary-dark uppercase tracking-wider">Our Story</h3>
          <h2 className="mt-2 text-3xl font-extrabold text-neutral-900">The Spark of an Idea</h2>
          <p className="mt-4 text-lg text-neutral-600">
            RebuZZar was born from a simple need: finding affordable course materials. We realized that countless items on campus—books, notes, lab coats, calculators, graphics designing kit—were used for just a semester and then left to gather dust. That spark became our mission.
          </p>

          <div className="mt-16">
            <h3 className="text-sm font-semibold text-primary-dark uppercase tracking-wider">Our Mission</h3>
            <h2 className="mt-2 text-3xl font-extrabold text-neutral-900">Affordable, Sustainable, and Safe</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Our goal is to create a trusted, circular economy within our university. We empower students to save money, reduce waste, and connect with peers safely.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-neutral-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-primary-dark uppercase tracking-wider">Our Philosophy</h3>
            <h2 className="mt-2 text-3xl font-extrabold text-neutral-900">Our Core Values</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <ValueCard
              Icon={ShieldIcon}
              title="Built on Trust"
              description="With university-only registration, you're always dealing with a fellow student. It's a community you can trust."
            />
            <ValueCard
              Icon={LeafIcon}
              title="Campus Sustainability"
              description="Every item bought and sold is one less item wasted. Join us in building a greener, more sustainable campus."
            />
            <ValueCard
              Icon={RupeeIcon}
              title="Student-Friendly Prices"
              description="We're all on a student budget. RebuZZar helps you find what you need without breaking the bank."
            />
          </div>
        </div>
      </div>

      {/* FAQ Section - Above Footer */}
      <div className="bg-neutral-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-neutral-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <FAQItem key={idx} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>

      {/* Join Our Movement */}
      <div className="bg-neutral-800">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="block">Ready to dive in?</span>
            <span className="block text-secondary">Join our campus movement today.</span>
          </h2>
          <a
            href="https://www.instagram.com/_rebuzzar_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-white bg-secondary hover:bg-opacity-90 sm:w-auto transition-transform hover:scale-105"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </>
  );
};

// ========================
// Value Card Component
// ========================
const ValueCard = ({ Icon, title, description }: { Icon: React.FC; title: string; description: string }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-neutral-700 mx-auto">
      <Icon />
    </div>
    <h3 className="mt-5 text-xl font-bold text-neutral-800">{title}</h3>
    <p className="mt-2 text-base text-neutral-600">{description}</p>
  </div>
);

// ========================
// SVG Icons
// ========================
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v5c0 5.25-3.5 10.25-8 11-4.5-.75-8-5.75-8-11V6l8-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>
);

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9 4 5 8 5 12c0 5 4 8 7 8 3 0 7-3 7-8 0-4-4-8-7-10zM8 15c1 1 3 2 4 2" />
  </svg>
);

const RupeeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-700" viewBox="0 0 24 24" aria-hidden="true">
    <text
      x="50%"
      y="50%"
      fill="currentColor"
      fontSize="30"
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      textAnchor="middle"
      dominantBaseline="central"
    >
      ₹
    </text>
  </svg>
);

export default Home;
