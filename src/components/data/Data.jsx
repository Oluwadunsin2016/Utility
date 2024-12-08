/* eslint-disable react/prop-types */

import UserForm from './UserForm';
import NetworkProviderSelection from './NetworkProviderSelection';

const Data = ({utility,handleFormSubmit,selectedNetwork,setSelectedNetwork,loading,formData,setFormData,isFormValid,setIsFormValid}) => {


  return (
    <div className="w-full">
        <NetworkProviderSelection selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
        <UserForm
          utility={utility}
          loading={loading}
            formData={formData}
          setFormData={setFormData}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          network={selectedNetwork}
          onSubmitForm={handleFormSubmit}
        />
    </div>
  );
};

export default Data;
