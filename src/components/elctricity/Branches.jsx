/* eslint-disable react/prop-types */

const Branches = ({selectedBranch,branch,setSelectedBranch}) => {
console.log(branch)
  return (
      <div
              className={`${
                branch.name == selectedBranch && "border-blue-500"
              } border rounded-lg cursor-pointer hover:shadow-lg`}
              onClick={() => setSelectedBranch(branch.name)}
            >
              <img
                src={branch.logo}
                alt={`${branch.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
  )
}

export default Branches