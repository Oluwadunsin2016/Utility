import { useState } from "react";
import HeroSection from "./components/HeroSection"
import Airtime from "./components/airtime/Airtime"
import Data from "./components/data/Data"
// import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import Electricity from "./components/elctricity/Electricity";
import Utilities from "./components/Utilities";
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import PaymentModal from './components/PaymentModal';
import Cable from "./components/cable/Cable";
import { useCheckMeter, usePurchase } from "./lib/api";
import { Toaster } from "react-hot-toast";

const App = () => {
    const [step, setStep] = useState(1);
    const [selectedUtility, setSelectedUtility] = useState('vtu');
      const [selectedNetwork, setSelectedNetwork] = useState('');
      const [selectedBranch, setSelectedBranch] = useState('');
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const {mutateAsync:purchaseUtility,data:result,isPending:loading}=usePurchase()
  const {mutateAsync:checkMeter,}=useCheckMeter()
  console.log(result);



  const handleFormSubmit = async(formData) => {
  // airtime and data
    // setUserInfo({...formData,vertical:selectedUtility,vendType:selectedNetwork,disco:selectedNetwork,meter:formData?.phone});
    console.log({...formData,disco:selectedNetwork,meter:formData?.phone})

if (selectedUtility=='electricity') {
await checkMeter({disco:selectedBranch,meter:formData?.phone,vendType:formData.vendType,vertical:formData.vertical},{onSuccess:async(data)=>{
console.log(data);

await purchaseUtility({...formData,disco:selectedBranch,meter:formData?.phone,orderId:data.orderId,narration:'Purchase power'})
}})
} else {
await purchaseUtility({...formData,disco:selectedNetwork,meter:formData?.phone}) 
}

  // Electricity
    // setUserInfo({...formData,disco:selectedBranch,meter:formData?.phone,orderId:'',narration:'Purchase power'});
    // console.log({...formData,disco:selectedBranch,meter:formData?.phone,orderId:'',narration:'Purchase power'})

    setModalOpen(true);
  };


    const complete = () => {
    setSelectedNetwork('');
    setModalOpen(false)
  };

  const accountDetails = {
    accountNumber: '1234567890',
    bankName: 'GT Bank',
  };

  // let tabs = [
  // {title:'Airtime/Data', key: 'airtime&data'},
  // {title:'Electricity', key: 'electricity'},
  // {title:'Cable Subcription', key: 'cable_sub'},
  // {title:'Water', key: 'water'},
  // ];


  //   const handleSelect = (chosen)=>{
  // console.log(chosen);
  // setSelectedTab(chosen)
  // }

  const handleSelectUtility=(utility)=>{
  setSelectedUtility(utility)
  setStep(2)
  }

      const goBack = () => {
      setSelectedNetwork('');
      setSelectedBranch('');
      setFormData({
    name: '',
    email: '',
    phone: '',
    amount: '',
  });
    setStep(1);
  };
  //  {tabs && <Tabs
  //             onSelectionChange={handleSelect}
  //             className="rounded my-4"
  //             aria-label="Tabs"
  //             size="lg"
  //             classNames={{cursor: "w-full bg-white rounded px-4 py-1 bg-blue-400 text-white outline-none border-none shadow", base:'bg-gray-200',tabContent:'text-gray-700 font-medium',}}
  //           >
  //           {tabs?.map((tab)=>(
  //             <Tab key={tab.key} title={tab.title} className='text-medium' />
  //           ))}
  //           </Tabs>}

  // https://munhayevtudata.com.ng/myassets/img/bg/home.jpg
  // https://dtunes.ng/blog/wp-content/uploads/2023/08/Artboard-3-copy-4.jpg
  // https://cjdataservices.com.ng/fundamental-img/feature.png
  // https://cjdataservices.com.ng/fundamental-img/hero.png

  return (
     <div className='bg-gray-100'>
   <HeroSection title='Utilities' description='Make money offline and online, buy airtime and sort out your bills with 440' imageUrl='https://cjdataservices.com.ng/fundamental-img/hero.png' />
   <div className='relative md:w-1/2 mx-auto min-h-screen bg-white overflow-hidden'>

              <div
        className={`absolute w-full h-full bg-white transition-transform duration-500 ${
          step === 1 ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
            <Utilities handleSelectUtility={handleSelectUtility}/>
      </div>
         <div
        className={`w-full bg-white transition-transform duration-500 ${
          step === 2 ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
         <button onClick={goBack} className="absolute top-5 left-5 md:left-10 text-blue-500 z-30">
        <IoArrowBackCircleOutline className='text-[20px] md:text-[35px]' />
      </button>
            {selectedUtility=='vtu' && <Airtime handleFormSubmit={handleFormSubmit} loading={loading} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} utility={selectedUtility} setFormData={setFormData} formData={formData}  />}
            {selectedUtility=='data' && <Data handleFormSubmit={handleFormSubmit} loading={loading} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} utility={selectedUtility} setFormData={setFormData} formData={formData} />}
            {selectedUtility=='electricity' && <Electricity handleFormSubmit={handleFormSubmit} loading={loading} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} utility={selectedUtility} setFormData={setFormData} formData={formData} />}
            {selectedUtility=='tv' && <Cable handleFormSubmit={handleFormSubmit} loading={loading} selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} utility={selectedUtility} setFormData={setFormData} formData={formData}  />}
      </div>


   </div>
   <Toaster position="top-right" reverseOrder={false} />
     <PaymentModal
      utility={selectedUtility}
      selectedNetwork={selectedNetwork}
        isOpen={modalOpen}
        accountDetails={accountDetails}
        complete={complete}
        onClose={() => setModalOpen(false)}
      />
    </div>
  )
}

export default App