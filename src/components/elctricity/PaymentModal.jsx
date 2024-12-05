/* eslint-disable react/prop-types */

import { IoIosCloseCircle } from 'react-icons/io'
import { IoCopyOutline } from 'react-icons/io5'
import { copy, formatCurrency } from '../../lib/utils'

const PaymentModal = ({isOpen,onClose,accountNumber, bankName, userInfo,complete}) => {
  return (
       <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center`}>
      <div onClick={onClose} className="absolute inset-0 bg-black opacity-50"></div>
      <div className="min-h-[80%] w-full mx-6 md:w-2/6 bg-white p-10 relative rounded">
      <button onClick={onClose} className="absolute top-4 right-4 text-red-500 z-30">
        <IoIosCloseCircle size="40px" />
      </button>
          <h2 className="text-xl font-semibold text-gray-800">Payment Details</h2>

        {/* Payment Information */}
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">Transfer to</h3>
          <div className="mt-2 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between gap-6 items-center mb-2">
              <span className="text-sm text-gray-500">Account Number:</span>
              <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {accountNumber || "1234567890"}
                <IoCopyOutline onClick={copy} className='cursor-pointer'/>
              </span>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <span className="text-sm text-gray-500">Bank Name:</span>
              <span className="text-lg font-bold text-gray-900">
                {bankName || "Example Bank"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700">service</h3>
          <div className=" bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between gap-6 items-center">
              <span className="text-sm text-gray-500">Electricity:</span>
              <span className="text-sm text-gray-800 line-clamp-1">
                {userInfo?.provider}
              </span>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Your Details</h3>
          <div className="mt-2 bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between gap-6 items-center">
              <span className="text-sm text-gray-500">Name:</span>
              <span className="text-sm text-gray-800 line-clamp-1">
                {userInfo?.full_name || "John Doe"}
              </span>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <span className="text-sm text-gray-500">Email:</span>
              <span className="text-sm text-gray-800 line-clamp-1">
                {userInfo?.email || "johndoe@example.com"}
              </span>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <span className="text-sm text-gray-500">Phone:</span>
              <span className="text-sm text-gray-800 line-clamp-1">
                {userInfo?.phoneNumber || "+1234567890"}
              </span>
            </div>
            <div className="flex justify-between gap-6 items-center">
              <span className="text-sm text-gray-500">Amount:</span>
              <span className="font-semibold text-gray-800 line-clamp-1">
                {formatCurrency(userInfo?.amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-700">
          <p className="mb-2">
            Please make a transfer to the account details above. Once payment is
            confirmed, your recharge will be processed immediately.
          </p>
        </div>

        {/* Close Button */}
          <button
            onClick={complete}
            className="bg-blue-500 w-full mt-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Confirmed
          </button>
      </div>
    </div>
  )
}

export default PaymentModal