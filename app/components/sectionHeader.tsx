const SectionHeader = ({ header }) => {
    return (
        <h2 className="text-lg font-semibold text-gray-700 border-l-4 border-indigo-500 pl-2 mb-2 mt-4">
    {header.toUpperCase()}
  </h2>
    );
  
};

export default SectionHeader;
