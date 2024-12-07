import { useState } from "react";
import HeroSection from "./components/HeroSection";
import Airtime from "./components/airtime/Airtime";
import Data from "./components/data/Data";
// import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import Electricity from "./components/elctricity/Electricity";
import Utilities from "./components/Utilities";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import PaymentModal from "./components/PaymentModal";
import Cable from "./components/cable/Cable";
import { usePurchase, useVerifyPayment } from "./lib/api";
import { Toaster } from "react-hot-toast";
import { Tab, Tabs } from "@nextui-org/react";
import { FaSimCard, FaWifi } from "react-icons/fa";

const App = () => {
  const [step, setStep] = useState(1);
  const [selectedUtility, setSelectedUtility] = useState("VTU");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    vendType: "PREPAID",
    meter: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const {
    mutateAsync: purchaseUtility,
    data: result,
    isPending: loading,
  } = usePurchase();
  const {
    mutateAsync: verifyPayment,
    isPending: verifying,
  } = useVerifyPayment();
  console.log(result);

  const handleFormSubmit = async (formData) => {

      await purchaseUtility(formData,{onSuccess:()=>{
        setModalOpen(true);
      }});
    // if (selectedUtility == "ELECTRICITY") {
    // console.log({ ...formData,
    //     disco: selectedBranch,
    //   });
    
    // } else {
    //   console.log({ ...formData,
    //     disco: selectedNetwork,
    //   });
      // await purchaseUtility({
      //   ...formData,
      //   disco: selectedNetwork,
      // });
    // }

    // Electricity
    // setUserInfo({...formData,disco:selectedBranch,meter:formData?.phone,orderId:'',narration:'Purchase power'});
    // console.log({...formData,disco:selectedBranch,meter:formData?.phone,orderId:'',narration:'Purchase power'})
  };

  const complete = async(id) => {
await verifyPayment(id,{onSuccess:(data)=>{
console.log(data);

    // setSelectedNetwork("");
    // setModalOpen(false);
}})
  };

  // const accountDetails = {
  //   accountNumber: "1234567890",
  //   bankName: "GT Bank",
  // };

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

  const handleSelectUtility = (utility) => {
    setSelectedUtility(utility);
    setStep(2);
  };
  const handleNavigateAirtimeAndDate = (utility) => {
  setSelectedNetwork("");
  setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
      vendType: "PREPAID",
    meter: "",
    });
    setSelectedUtility(utility);
  };

  const goBack = () => {
    setSelectedNetwork("");
    setSelectedBranch("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
      vendType: "PREPAID",
    meter: "",
    });
    setStep(1);
  };

  const utilities = [
    { name: "Airtime", value: "VTU", icon: FaSimCard },
    { name: "Data", value: "DATA", icon: FaWifi },
  ];
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
    <div className="bg-gray-100">
      <HeroSection
        title="Utilities"
        description="Make money offline and online, buy airtime and sort out your bills with 440"
        imageUrl="https://cjdataservices.com.ng/fundamental-img/hero.png"
      />
      <div className="relative md:w-1/2 mx-auto min-h-screen bg-white overflow-hidden">
        <div
          className={`absolute w-full h-full bg-white transition-transform duration-500 ${
            step === 1 ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Utilities handleSelectUtility={handleSelectUtility} />
        </div>
        <div
          className={`w-full bg-white transition-transform duration-500 ${
            step === 2 ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={goBack}
            className="absolute top-5 left-5 md:left-10 text-blue-500 z-30"
          >
            <IoArrowBackCircleOutline className="text-[20px] md:text-[35px]" />
          </button>
          {(selectedUtility == "VTU" ||
            selectedUtility == "DATA") && (
              <div className="pt-16">
                {utilities && (
                  <Tabs
                    onSelectionChange={(name) => handleNavigateAirtimeAndDate(name)}
                    className="rounded mx-4"
                    aria-label="Tabs"
                    size="lg"
                   selectedKey={selectedUtility}
                    classNames={{
                      cursor:
                        "w-full bg-white rounded px-4 py-1 bg-blue-400 text-white outline-none border-none shadow",
                      base: "bg-gray-200",
                      tabContent: "text-gray-700 font-medium",
                    }}
                  >
                    {utilities?.map((tab) => (
                      <Tab
                        key={tab.value}
                        title={
                          <div className="flex items-center space-x-1">
                            <tab.icon />
                            <span>{tab.name}</span>
                          </div>
                        }
      className="text-medium px-4 py-2"
                      />
                    ))}
                  </Tabs>
                )}
                {selectedUtility == "VTU" && (
                  <Airtime
                    handleFormSubmit={handleFormSubmit}
                    loading={loading}
                    selectedNetwork={selectedNetwork}
                    setSelectedNetwork={setSelectedNetwork}
                    utility={selectedUtility}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
                {selectedUtility == "DATA" && (
                  <Data
                    handleFormSubmit={handleFormSubmit}
                    loading={loading}
                    selectedNetwork={selectedNetwork}
                    setSelectedNetwork={setSelectedNetwork}
                    utility={selectedUtility}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )}
              </div>
            )}
          {selectedUtility == "ELECTRICITY" && (
            <Electricity
              handleFormSubmit={handleFormSubmit}
              loading={loading}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              utility={selectedUtility}
              setFormData={setFormData}
              formData={formData}
            />
          )}
          {selectedUtility == "TV" && (
            <Cable
              handleFormSubmit={handleFormSubmit}
              loading={loading}
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              utility={selectedUtility}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
      <PaymentModal
        isOpen={modalOpen}
        loading={verifying}
        details={result?.saveTrans}
        complete={complete}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default App;
