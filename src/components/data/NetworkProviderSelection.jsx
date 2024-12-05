/* eslint-disable react/prop-types */

import { useRef } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { networks } from "../../lib/data";


const NetworkProviderSelection = ({ setSelectedNetwork,selectedNetwork }) => {
 const scrollRef = useRef(null);

   const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col p-6 md:px-12 ">
     <h1 className="text-xl md:text-2xl font-semibold text-gray-700">Select your network</h1>
      <div className="relative w-full">
      {/* Chevron for scrolling left */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
      >
        <IoChevronBackOutline />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-4 w-full justify-start flex-nowrap overflow-x-auto mt-4 no-scrollbar"
      >
        {networks.map((network) => (
          <div
            key={network.name}
            className={`${
              network.name === selectedNetwork && "border-blue-500"
            } border h-[6rem] w-[8rem] md:w-[10rem] md:h-[8rem] flex-shrink-0 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg`}
            onClick={() => setSelectedNetwork(network.name)}
          >
            <img
              src={network.logo}
              alt={`${network.name} logo`}
              className="w-8 h-8 md:w-12 md:h-12 mb-4"
            />
            <h2 className="text-lg text-gray-700 font-semibold">
              {network.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Chevron for scrolling right */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600"
      >
       <IoChevronForwardOutline />
      </button>
    </div>
    </div>
  );
};

export default NetworkProviderSelection;
