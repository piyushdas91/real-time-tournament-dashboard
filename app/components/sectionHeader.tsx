const SectionHeader = ({ header }) => {
    return (
        <h2 className="text-lg  font-semibold text-white border-l-4 border-white pl-2 mb-2 mt-4">
    {header.toUpperCase()}
  </h2>
    );
  
};

export default SectionHeader;
