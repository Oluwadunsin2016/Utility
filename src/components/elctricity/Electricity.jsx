/* eslint-disable react/prop-types */

import UserForm from './UserForm';
import PowerBranches from './PowerBranches';

const Electricity = ({utility,handleFormSubmit,selectedBranch,setSelectedBranch,loading,formData,setFormData,isFormValid,setIsFormValid}) => {


  return (
    <div className="w-full pt-10">
        <PowerBranches selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />
        <UserForm
          utility={utility}
          loading={loading}
             formData={formData}
          setFormData={setFormData}
          branch={selectedBranch}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          onSubmitForm={handleFormSubmit}
        />
    </div>
  );
};

export default Electricity;
