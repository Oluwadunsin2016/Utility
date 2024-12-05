/* eslint-disable react/prop-types */

import UserForm from './UserForm';
import PowerBranches from './PowerBranches';

const Electricity = ({utility,handleFormSubmit,selectedBranch,setSelectedBranch,loading,formData,setFormData}) => {


  return (
    <div className="w-full pt-10">
        <PowerBranches selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />
        <UserForm
          utility={utility}
          loading={loading}
             formData={formData}
          setFormData={setFormData}
          branch={selectedBranch}
          onSubmitForm={handleFormSubmit}
        />
    </div>
  );
};

export default Electricity;
