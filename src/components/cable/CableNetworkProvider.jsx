/* eslint-disable react/prop-types */

import {tvNetworks } from "../../lib/data";
const CableNetworkProvider = ({ setSelectedNetwork, selectedNetwork }) => {
  return (
    <div className="flex flex-col p-6 md:px-12 ">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
        Select your network
      </h1>
      <div className="flex items-center justify-center gap-4 md:gap-6 w-full mt-4">
        {tvNetworks.map((network) => (
              <div
            key={network.name}
            className={`${
              network.name === selectedNetwork && "border-3 border-blue-500"
            } h-[4rem] w-[6rem] md:w-[8rem] md:h-[6rem] flex-shrink-0 rounded-lg p-4 flex items-center justify-center cursor-pointer shadow-lg`}
            onClick={() => setSelectedNetwork(network.name)}
          >
            <img
              src={network.logo}
              alt={`${network.name} logo`}
              className="w-8 h-8 md:w-[4rem] md:h-[3rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CableNetworkProvider;
