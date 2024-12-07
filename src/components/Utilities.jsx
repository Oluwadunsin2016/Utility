/* eslint-disable react/prop-types */
// import { Tab, Tabs } from "@nextui-org/react";
import { FaSimCard, FaWifi } from "react-icons/fa";
import { MdCable } from "react-icons/md";
import illustrator from '../assets/images/payment-utility-bills.webp'
import { TbSunElectricity } from "react-icons/tb";
// import image from '../assets/images/twitter.png'

const Utilities = ({handleSelectUtility}) => {

 const utilities = [
    { name: 'Airtime', value: 'VTU', icon: FaSimCard },
    { name: 'Data', value: 'DATA', icon: FaWifi },
    { name: 'Electricity', value: 'ELECTRICITY', icon: TbSunElectricity },
    { name: 'Cable', value: 'TV', icon: MdCable },
  ];


  return (
    <div className="px-8 py-6 flex flex-col h-full justify-between items-center">
    <div className='flex items-center justify-center w-full mt-8'>
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4 px-5">
        {utilities.map((utility) => (
          <div
            key={utility.name}
            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg"
            onClick={() => handleSelectUtility(utility.value)}
          >
           <utility.icon size={30} />
            <h2 className="text-lg text-gray-700 font-semibold">{utility.name}</h2>
          </div>
        ))}
      </div>
    </div>

    <img src={illustrator} alt="illustrator" className='w-[20rem] h-[20rem] md:w-[40rem] md:h-[35rem]' />

      {/* {utilities && <Tabs
      size="lg"
              onSelectionChange={(name) => handleSelectUtility(name)}
              className="rounded"
              classNames={{cursor: "w-full bg-blue-400 rounded px-4 py-4 shadow", base:'bg-gray-100' }}
            >
            {utilities?.map((tab)=>(
              <Tab key={tab.value} title={tab.name} className='text-medium' />
            ))}
            </Tabs>} */}

      {/* <Tabs  className="rounded w-full flex justify-between items-center"
              aria-label="Tabs"
              classNames={{cursor: "w-full bg-white rounded px-4 py-1 shadow bg-blue-400",base
              :'bg-gray-100'}}
              >
      {utilities?.map((tab)=>(
              <Tab key={tab.value} title={
            <div className="flex items-center space-x-1">
              <tab.icon/>
              <span>{tab.name}</span>
            </div>
          } className='text-medium' />
            ))}
        </Tabs> */}
    </div>
  )
}

export default Utilities