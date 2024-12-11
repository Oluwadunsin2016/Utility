/* eslint-disable react/prop-types */
import { networks } from "../../lib/data";


const NetworkProviderSelection = ({ setSelectedNetwork,selectedNetwork }) => {

  return (
    <div className="flex flex-col p-6 md:px-12 ">
     <h1 className="text-xl md:text-2xl font-semibold text-gray-700">Select your network</h1>
     <div className="flex items-center justify-center gap-4 w-full mt-4">
        {networks.map((network) => (
           <img
           key={network.name} 
                src={network.logo}
                alt={`${network.name} logo`}
                className={`${
                network.name == selectedNetwork && "border-blue-500"
              } border rounded-lg h-[4rem] w-[6rem] md:w-[8rem] md:h-[6rem] cursor-pointer hover:shadow-lg`}
              onClick={() => setSelectedNetwork(network.name)}
              />
        ))}
      </div>
    </div>
  );
};

export default NetworkProviderSelection;
