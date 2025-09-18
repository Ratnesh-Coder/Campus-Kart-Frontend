import { useState } from 'react';

type MenuProp = {
  setMenu: (category: string) => void;
};

const Menubar = (props: MenuProp) => {
  const [activeCategory, setActiveCategory] = useState<string>("");

  const categories = [
    "All",
    "Books",
    "Electronics",
    "Lab Equipment",
    "Stationery",
    "Furniture",
    "Cycle",
    "Accessories",
  ];

  const handleCategoryClick = (category: string) => {
    const newCategory = category === "All" ? "" : category;
    setActiveCategory(category);
    props.setMenu(newCategory);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-6 overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap
                ${activeCategory === cat
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-200'
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