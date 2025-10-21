import { useState } from 'react';

type MenuProp = {
  setMenu: (category: string) => void;
};

const Menubar = (props: MenuProp) => {
  const [activeCategory, setActiveCategory] = useState<string>("All"); // Default to "All"

  const categories = [
    "All", "Books", "Electronics", "Lab Equipment", 
    "Stationery", "Furniture", "Cycle", "Accessories",
  ];

  const handleCategoryClick = (category: string) => {
    // If the user clicks "All", we set the filter to an empty string for the backend
    const newCategory = category === "All" ? "" : category;
    setActiveCategory(category);
    props.setMenu(newCategory);
  };

  return (
    <div className="bg-white shadow-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap
                ${activeCategory === cat
                  ? 'bg-primary-dark text-white shadow-md' // Style for the active button
                  : 'text-neutral-600 hover:bg-neutral-200' // Style for inactive buttons
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menubar;