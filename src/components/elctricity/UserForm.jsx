/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { debounce, notifier } from "../../lib/utils";
import { ImSpinner2 } from "react-icons/im";
import { useCheckMeter } from "../../lib/api";

const UserForm = ({
  utility,
  branch,
  onSubmitForm,
  loading,
  formData,
  setFormData,
  isFormValid, 
  setIsFormValid 
}) => {
  const [validationResult, setValidationResult] = useState(null);
    const {mutateAsync:checkMeter,}=useCheckMeter()

  // useEffect(() => {
  // setFormData({ ...formData, meter: "", vendType: "" });
  // }, [])
  

  useEffect(() => {
    // Check if all fields are filled
    if (
      formData.amount !== "" &&
      formData.vendType !== ""
    ) {
    setIsFormValid(true);
            }
    }, [formData,setIsFormValid]);
  

  const handleChange = (e) => { 
  const {value,name} = e.target;
    if (branch !== "") {
    
      setFormData({ ...formData, [name]: value });
         if (e.target.name=='meter'&&value.trim()) {
      debouncedValidateMeterNumber({ ...formData,disco:branch, [name]: value }); // Call the debounced function
    }
    } else {
      notifier({ message: 'Select your branch first', type: 'error' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm({ ...formData, vertical: utility,narration: "Purchase power", });
  };

 const validateMeterNumber = async (data) => {
 const {disco,vendType,meter}=data
 
 console.log({disco,vendType,vertical:utility,meter});
 
  await checkMeter({disco,vendType,vertical:utility,meter},{onSuccess:async(data)=>{
console.log(data);
setFormData({...formData,orderId:data.orderId,})
setValidationResult({ message: data.name, type: 'success' });
},
onError:(err)=>{
setValidationResult({ message: err.response.data.message??'An error occurred', type: 'error' });
}})
 setFormData(data)
 console.log({branch,vendType,meter});
  };

 const debouncedValidateMeterNumber = useCallback(
    debounce((number) => {
      validateMeterNumber(number);
    }, 500), // 500ms delay
    []
  );


  useEffect(() => {
  return () => {
    debouncedValidateMeterNumber.cancel();
  };
}, [debouncedValidateMeterNumber]);

  const plans = [
    { key: "PREPAID", label: "PREPAID" },
    { key: "POSTPAID", label: "POSTPAID" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold text-gray-700 text-center mt-6">{`Recharge ${type} for ${network}`}</h1> */}
      <form
        className="w-full bg-white px-6 md:px-12  py-6"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        {/* <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
            <span className="text-red-600"> *</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div> */}

        {/* Email */}
        {/* <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
            <span className="text-red-600"> *</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div> */}

        {/* Phone Number */}
        {/* <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number
            <span className="text-red-600"> *</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div> */}

        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-700 mb-2">
            Select your plan <span className="text-red-600"> *</span>
          </h1>
          <select
            onChange={handleChange}
            name="vendType"
            placeholder="select a provider"
            required
            value={formData.vendType}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            id=""
          >
            <option value=""></option>
            {plans.map((plan) => (
              <option key={plan.key}>{plan.label}</option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label
            htmlFor="meter"
            className="block text-gray-700 font-semibold mb-2"
          >
            Meter Number
            <span className="text-red-600"> *</span>
          </label>
          <input
            type="number"
            id="meter"
            name="meter"
            disabled={!branch||!utility||!formData.vendType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter meter number"
            required
          />
          {validationResult&&<p className={`${validationResult.type=='error'?'text-red-600':'text-orange-500'} text-sm font-semibold mt-1`}>{validationResult?.message}</p>}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-semibold mb-2"
          >
            Amount
            <span className="text-red-600"> *</span>
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter amount to recharge"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
           disabled={!isFormValid || loading}
            type="submit"
            className={` ${
                    isFormValid && !loading
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-200 cursor-not-allowed"
            } w-full text-white font-semibold mt-8 py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400`}
          >
            {loading ? (
              <p className="flex items-center justify-center gap-2">
                <ImSpinner2 size={20} className="animate-spin" /> Loading
              </p>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
