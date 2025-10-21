// import { Link } from "react-router-dom";
// import { Product } from "../types";
// import EmptyStateIcon from "./EmptyStateIcon";

// type HomeProps = {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// };

// const Home = ({ products, loading, error }: HomeProps) => {
//   if (loading) {
//     return <div className="text-center p-20 font-semibold text-neutral-500">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-center p-20 text-red-600 font-semibold">Could not connect to the backend. Please make sure it's running.</div>;
//   }

//   return (
//     <>
//       <div className="bg-neutral-800 text-center py-20 px-4">
//         <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
//           The Student Marketplace
//         </h1>
//         <p className="mt-4 text-lg max-w-2xl mx-auto text-neutral-300">
//           Buy and sell textbooks, electronics, and more, exclusively within your university community.
//         </p>
//         <Link
//           to="/sell"
//           className="mt-8 inline-block bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-transform hover:scale-105">
//           Start Selling Today
//         </Link>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Product Grid (no changes) */}
//         {products.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
//             {products.map((data) => (
//               <Link to={`/product/${data._id}`} key={data._id} className="group">
//                 {/* Product Card */}
//                  <div className="h-full flex flex-col border rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden">
//                   {/* Image Container */}
//                     <div className="w-full h-48 overflow-hidden bg-neutral-100 flex items-center justify-center">
//                         <img
//                           src={data.imageUrl}
//                           className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                           alt={data.title}
//                         />
//                     </div>
//                     {/* Text and Button Container */}
//                     <div className="p-4 flex flex-col flex-grow">
//                         <h2 className="font-bold text-lg truncate mb-1 text-neutral-800 group-hover:text-primary-dark transition-colors">
//                           {data.title}
//                         </h2>
//                         <p className="text-sm text-neutral-500 mb-2">
//                           {data.category}
//                         </p>
//                         <p className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-dark transition-colors">
//                           ₹{data.price.toLocaleString("en-IN")}
//                         </p>
//                         <div className="flex-grow"></div>
//                         <button className="w-full mt-2 bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors">
//                           View Details
//                         </button>
//                     </div>
//                   </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 px-4 bg-white mt-12 rounded-lg shadow-sm">
//             {/* Empty state message */}
//             <EmptyStateIcon />
//             <h2 className="mt-6 text-2xl font-semibold text-neutral-900">No Items Found</h2>
//             <p className="mt-2 text-neutral-600 max-w-md mx-auto">It looks like no items match your current search or filter. Try a different category or clear your search!</p>
//           </div>
//         )}
//       </div>
//       {/* --- NEW: "WHY CAMPUS KART?" SECTION --- */}
//       <div className="bg-neutral-200 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-extrabold text-neutral-800">The Campus Kart Story</h2>
//           <p className="mt-4 max-w-2xl mx-auto text-neutral-600">
//             Our mission is to create a safe, affordable, and sustainable marketplace for our university community.
//           </p>
          
//           {/* Core Values Grid */}
//           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Value 1: By Students, For Students */}
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
//                   <StudentIcon />
//                 </div>
//               </div>
//               <h3 className="mt-5 text-lg font-bold text-neutral-900">By Students, For Students</h3>
//               <p className="mt-2 text-base text-neutral-600">
//                 Built by students who understand the need for affordable textbooks, gear, and supplies on campus.
//               </p>
//             </div>

//             {/* Value 2: Safe & Secure */}
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
//                   <ShieldIcon />
//                 </div>
//               </div>
//               <h3 className="mt-5 text-lg font-bold text-neutral-900">Safe & Secure Trading</h3>
//               <p className="mt-2 text-base text-neutral-600">
//                 With university-only registration, you can be confident you're trading with fellow students.
//               </p>
//             </div>

//             {/* Value 3: Sustainable & Affordable */}
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
//                   <LeafIcon />
//                 </div>
//               </div>
//               <h3 className="mt-5 text-lg font-bold text-neutral-900">Sustainable & Affordable</h3>
//               <p className="mt-2 text-base text-neutral-600">
//                 Give your old items a new life. Save money and reduce waste by buying and selling used goods.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* --- END OF NEW SECTION --- */}
//     </>
//   );
// };

// // --- NEW: SVG Icons for the Core Values Section ---
// const StudentIcon = () => (
//   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0121 18.782V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-.218c0-1.78.5-3.44 1.34-4.86L12 14z" />
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0018 0 12.02 12.02 0 00-3.382-9.016z" />
//   </svg>
// );

// const LeafIcon = () => (
//   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-4.949-1.05l-1.414-1.414a2 2 0 10-2.828-2.828L5 14.95l1.05-4.949a2 2 0 102.828-2.828L14.95 5l4.949 1.05a2 2 0 102.828-2.828L19 2.05l-1.05 4.949a2 2 0 10-2.828 2.828L9.05 19l-4.949-1.05a2 2 0 10-2.828 2.828L5 21.95l1.05-4.949a2 2 0 102.828-2.828L14.95 9l4.949-1.05a2 2 0 102.828-2.828L19 5.05l-4.949 1.05z" />
//   </svg>
// );

// // ... (HomeProps type and EmptyStateIcon component remain the same) ...

// export default Home;




import { Link } from "react-router-dom";
import { Product } from "../types";
import EmptyStateIcon from "./EmptyStateIcon";

type HomeProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const Home = ({ products, loading, error }: HomeProps) => {
  if (loading) {
    return <div className="text-center p-20 font-semibold text-neutral-500">Loading products...</div>;
  }
  if (error) {
    return <div className="text-center p-20 text-red-600 font-semibold">Could not connect to the backend. Please make sure it's running.</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-neutral-800 text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">The Student Marketplace</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-neutral-300">Buy and sell textbooks, electronics, and more, exclusively within your university community.</p>
        <Link to="/sell" className="mt-8 inline-block bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-transform hover:scale-105">
          Start Selling Today
        </Link>
      </div>

      {/* Main Content Area - Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center text-neutral-800 mb-8">Recently Added Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((data) => (
                <Link to={`/product/${data._id}`} key={data._id} className="group">
                  <div className="h-full flex flex-col border border-neutral-200 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden">
                    <div className="w-full h-48 overflow-hidden bg-neutral-100 flex items-center justify-center">
                      <img src={data.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={data.title} />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="font-bold text-lg truncate mb-1 text-neutral-800 group-hover:text-primary-dark transition-colors">{data.title}</h2>
                      <p className="text-sm text-neutral-500 mb-2">{data.category}</p>
                      <p className="text-xl font-semibold text-neutral-900 mb-4 group-hover:text-primary-dark transition-colors">₹{data.price.toLocaleString("en-IN")}</p>
                      <div className="flex-grow"></div>
                      <button className="w-full mt-2 bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors">View Details</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white mt-12 rounded-lg shadow-sm">
            <EmptyStateIcon />
            <h2 className="mt-6 text-2xl font-semibold text-neutral-900">The Marketplace is Empty</h2>
            <p className="mt-2 text-neutral-600 max-w-md mx-auto">Be the first to list an item and help build the campus community marketplace!</p>
          </div>
        )}
      </div>

      {/* --- NEW STORY & VALUES SECTION --- */}
      <div className="bg-neutral-100 pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          {/* The Spark of an Idea */}
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Our Story</h3>
          <h2 className="mt-2 text-3xl font-extrabold text-neutral-900">The Spark of an Idea</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Campus Kart was born from a simple need: finding affordable course materials. We realized that countless items on campus—books, notes, lab coats, calculators—were used for just a semester and then left to gather dust. What if there was a way to easily pass them on to other students who needed them? That spark became our mission.
          </p>
          
          <div className="mt-16">
            {/* Our Mission */}
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Our Mission</h3>
            <h2 className="mt-2 text-3xl font-extrabold text-neutral-900">Affordable, Sustainable, and Safe</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Our goal is to create a trusted, circular economy within our university. We empower students to save money, reduce waste, and connect with peers by making it simple and safe to buy and sell used goods.
            </p>
          </div>

        </div>
      </div>
      
      {/* Our Core Values / Philosophy */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Our Philosophy</h3>
                <h2 className="mt-2 text-3xl font-extrabold text-neutral-900">Our Core Values</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-light text-primary-dark mx-auto">
                        <ShieldIcon />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-neutral-900">Built on Trust</h3>
                    <p className="mt-2 text-base text-neutral-600">With university-only registration, you're always dealing with a fellow student. It's a community you can trust.</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-light text-primary-dark mx-auto">
                        <LeafIcon />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-neutral-900">Campus Sustainability</h3>
                    <p className="mt-2 text-base text-neutral-600">Every item bought and sold is one less item wasted. Join us in building a greener, more sustainable campus.</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-light text-primary-dark mx-auto">
                        <RupeeIcon />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-neutral-900">Student-Friendly Prices</h3>
                    <p className="mt-2 text-base text-neutral-600">We're all on a student budget. Campus Kart helps you find what you need without breaking the bank.</p>
                </div>
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
          <Link to="/sell" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark sm:w-auto">
            Sell an Item
          </Link>
        </div>
      </div>
    </>
  );
};

// --- SVG Icons for the Core Values Section ---
const ShieldIcon = () => ( <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0018 0 12.02 12.02 0 00-3.382-9.016z" /></svg> );
const LeafIcon = () => ( <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c2.236.447 5 2.236 5 4.472 0 2.236-1.789 4-4 4a8.028 8.028 0 01-5.445-2.083" /></svg> );
const RupeeIcon = () => ( <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m5 4H5.8a1 1 0 00-.9 1.4L9 21M15 3L9 21" /></svg> );

export default Home;