/* eslint-disable react/prop-types */
import {useEffect } from 'react'
import { formatCurrency, notifier } from '../../lib/utils';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from '@nextui-org/react';

const UserForm = ({ utility, network, onSubmitForm,loading,formData,setFormData,isFormValid, setIsFormValid }) => {
  

    useEffect(() => {
        // Check if all fields are filled
           if(network!==''&&formData.meter!=='' && formData.amount!==''){  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm({ ...formData,vertical:utility,disco:network,narration: "Purchase airtime", });
  };

  const suggestedAmount=[100,200,500,1000,1500,2000]

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold text-gray-700 text-center mt-6">{`Recharge ${type} for ${network}`}</h1> */}
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
            htmlFor="meter"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number
          <span className='text-red-600'> *</span>
          </label>
          <input
            type="tel"
            id="meter"
            name="meter"
            value={formData.meter}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Amount */}
           <div className="my-8">
       <h1 className="text-xl font-semibold text-gray-700 mb-2">Select Amount</h1>
       <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
         {suggestedAmount.map((amount,i) => (
          <div
            key={i}
            className={`${amount==formData.amount&&' bg-gray-100'} border rounded-lg p-4 flex justify-center cursor-pointer`}
            onClick={() => setFormData({ ...formData, amount})}
          >
            <h2 className="text-lg text-gray-700 font-semibold">{formatCurrency(amount)}</h2>
          </div>
        ))}
       </div>
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
          <Button
          disabled={!isFormValid || loading}
            type="submit"
            className={` ${
                    isFormValid && !loading
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-200 cursor-not-allowed"
                } w-full text-white font-semibold mt-8 py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400`}
          >
           {loading? <p className='flex items-center justify-center gap-2'><ImSpinner2 size={20} className='animate-spin' /> Loading</p>: "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
