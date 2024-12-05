/* eslint-disable react/prop-types */

import UserForm from './UserForm';
import Plans from './CableNetworkProvider';

const Cable = ({utility,handleFormSubmit,selectedNetwork,setSelectedNetwork,loading,formData,setFormData}) => {


  return (
    <div className="w-full pt-10">
        <Plans selectedNetwork={selectedNetwork} setSelectedNetwork={setSelectedNetwork} />
        <UserForm
          utility={utility}
          loading={loading}
            formData={formData}
          setFormData={setFormData}
          network={selectedNetwork}
          onSubmitForm={handleFormSubmit}
        />
    </div>
  );
};

export default Cable;
