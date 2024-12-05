/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import { useGetPriceLists } from '../../lib/api';
import { ImSpinner2 } from 'react-icons/im';
import { notifier } from '../../lib/utils';
// import { formatCurrency, notifier } from '../../lib/utils';

const UserForm = ({ utility, network, onSubmitForm,loading,formData,setFormData }) => {
    const [isFormValid, setFormValid] = useState(false);


  
  const {mutateAsync:getPriceLists,data:priceLists}=useGetPriceLists()

  //  useEffect(() => {
  // setFormData({ ...formData, smart_card_number: '' });
  // }, [])

    useEffect(() => {
        // Check if all fields are filled
           if( formData.name !=='' && formData.email!=='' &&formData.phone!=='' &&formData.amount!=='' &&formData.network!==''){  
        setFormValid(true);
            }
    }, [formData]);


const handleSelectPlan = (e) => {
  if(network!==''){
    setFormData({ ...formData, amount: e.target.value });
  }else{
  alert('Select your network first');
  }
  };

  const handleChange = (e) => {
  if(network!==''){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }else{
  notifier({ message: 'Select your network first', type: 'error' });
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm({ ...formData,vertical:utility,vendType:network });
  };


useEffect(() => {
if (network&&utility) {
getPlans()
}
}, [network,utility])


const getPlans = async()=>{
await getPriceLists({vertical:utility,provider:network})
}

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold text-gray-700 text-center mt-6">{`Recharge ${type} for ${network}`}</h1> */}
      <form
        className="w-full bg-white px-6 md:px-12  py-6"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="mb-4">
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
        </div>

        {/* Email */}
        <div className="mb-4">
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
        </div>

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

       
        {/* card number */}
        <div className="mb-4">
          <label htmlFor="smart_card_number" className="block text-gray-700 font-semibold mb-2">
            Smart Card Number
          <span className='text-red-600'> *</span>
          </label>
          <input
            type="number"
            id="smart_card_number"
            name="smart_card_number"
            value={formData.smart_card_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter meter number"
            required
          />
        </div>

{/* Select plan */}
           <div className="mb-4">
       <h1 className="text-lg font-semibold text-gray-700 mb-2">Select your data plan</h1>
        <select onChange={handleSelectPlan} name="plan" placeholder='select a plan' className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" id="">
    <option value=""></option>
      {priceLists?.data?.map((list,i) => (
        <option key={i} value={list.price}>{list.desc}</option>
      ))}
    </select>
        </div>


        {/* Amount */}
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
