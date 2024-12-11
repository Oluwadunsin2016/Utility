/* eslint-disable react/prop-types */

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { branches } from "../../lib/data";
import { useRef } from "react";

// <>
//           {/* <div key={branch.name} className={`${
//               branch.name == selectedBranch && "border-blue-500"
//             } border rounded-lg cursor-pointer hover:shadow-lg`}
//             onClick={() => setSelectedBranch(branch.name)}>
//           <div  className="w-[8rem] h-[6rem]" style={{backgroundImage: `url(${branch.logo })`}} >
//           </div>
//           </div> */}

//         </>
const PowerBranches = ({ setSelectedBranch, selectedBranch }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="flex flex-col p-6 md:px-12 ">
      {/* <img src={ikImg} alt="" /> */}
      <h1 className=" text-xl md:text-2xl font-semibold text-gray-700">
        Select your branch
      </h1>

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
          className="flex gap-4 w-full justify-start flex-nowrap overflow-x-auto mt-4 py-4 no-scrollbar"
        >
          {branches.map((branch) => (
            //  <img
            //  key={branch.name}
            //       src={branch.logo}
            //       alt={`${branch.name} logo`}
            //       className={`${
            //       branch.name == selectedBranch && "border-blue-500"
            //     } border rounded-lg h-[4rem] w-[6rem] md:w-[8rem] md:h-[6rem] flex-shrink-0 cursor-pointer hover:shadow-lg`}
            //     onClick={() => setSelectedBranch(branch.name)}
            //     />

            <div
              key={branch.name}
              className={`${
                branch.name === selectedBranch && "border-3 border-blue-500"
              } h-[4rem] w-[6rem] md:w-[8rem] md:h-[6rem] flex-shrink-0 rounded-lg p-4 flex items-center justify-center cursor-pointer shadow-lg`}
              onClick={() => setSelectedBranch(branch.name)}
            >
              <img
                src={branch.logo}
                alt={`${branch.name} logo`}
                className="w-8 h-8 md:w-[4rem] md:h-[3rem]"
              />
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

export default PowerBranches;
