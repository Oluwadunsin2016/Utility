/* eslint-disable react/prop-types */

import UserForm from './UserForm';
import NetworkProviderSelection from './NetworkProviderSelection';

const Airtime = ({utility,handleFormSubmit,selectedNetwork,setSelectedNetwork,loading,formData,setFormData,isFormValid,setIsFormValid}) => {


  return (
    <div className="w-full">
        <NetworkProviderSelection selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
        <UserForm
          utility={utility}
          formData={formData}
          setFormData={setFormData}
          network={selectedNetwork}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          loading={loading}
          onSubmitForm={handleFormSubmit}
        />
    </div>
  );
};

export default Airtime;
