/* eslint-disable react/prop-types */

import UserForm from './UserForm';
import Plans from './CableNetworkProvider';

const Cable = ({utility,handleFormSubmit,selectedNetwork,setSelectedNetwork,loading,formData,setFormData,isFormValid,setIsFormValid}) => {


  return (
    <div className="w-full pt-10">
        <Plans selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
        <UserForm
          utility={utility}
          loading={loading}
            formData={formData}
          setFormData={setFormData}
          network={selectedNetwork}
            isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          onSubmitForm={handleFormSubmit}
        />
    </div>
  );
};

export default Cable;
