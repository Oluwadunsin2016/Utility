/* eslint-disable react/prop-types */
import { useEffect, useCallback } from 'react'
import { notifier } from '../../lib/utils';
import { useGetPriceLists } from '../../lib/api';
import { ImSpinner2 } from 'react-icons/im';

const UserForm = ({ utility, network, onSubmitForm,loading,formData,setFormData,isFormValid, setIsFormValid }) => {
  const {mutateAsync:getPriceLists,data:priceLists}=useGetPriceLists()
  

      useEffect(() => {
        // Check if all fields are filled
           if(network!==''&&formData.phone!=='' && formData.amount!==''){  
        setIsFormValid(true);
            }
    }, [formData,setIsFormValid]);


  const handleChange = (e) => {
  if(network!==''){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }else{
  notifier({ message: 'Select your network first', type: 'error' });
  }
  };


  const handleSelectPlan = (e) => {
  if(network!==''){
    setFormData({ ...formData, amount: e.target.value });
  }else{
  notifier({ message: 'Select your network first', type: 'error' });
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm({ ...formData,vertical:utility,disco:network,meter: formData?.phone,narration: "Purchase data", });
  };



useEffect(() => {
if (network&&utility) {
getPlans()
}
}, [network,utility])


const getPlans = useCallback(async()=>{
await getPriceLists({vertical:utility,provider:network})
},[network,utility,getPriceLists])


// useEffect(() => {
// if (network&&utility) {
// getPlans()
// }
// }, [network,utility])


// const getPlans = async()=>{
// await getPriceLists({vertical:utility,provider:network})
// }

  return (
    <div className="flex flex-col items-center">
      <form
        className="w-full bg-white px-6 md:px-12  py-6"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        {/* <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name
            <span className='text-red-600'> *</span>
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
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          <span className='text-red-600'> *</span>
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
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number
          <span className='text-red-600'> *</span>
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
        </div>

        {/* Amount */}
           <div className="my-8">
       <h1 className="text-lg font-semibold text-gray-700 mb-2">Select your data plan</h1>
        <select onChange={handleSelectPlan} name="plan" placeholder='select a plan' className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" id="">
    <option value=""></option>
      {priceLists?.data?.map((list,i) => (
        <option key={i} value={list.price}>{list.desc}</option>
      ))}
    </select>
        </div>

        
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
            Amount
          <span className='text-red-600'> *</span>
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
           {loading? <p className='flex items-center justify-center gap-2'><ImSpinner2 size={20} className='animate-spin' /> Loading</p>: "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
