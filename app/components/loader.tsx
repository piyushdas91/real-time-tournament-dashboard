const SkeletonLoader = ({ width = "w-full", height = "h-4", rounded = "rounded-md" }) => {
    return (
      <div className={`bg-gray-200 animate-pulse ${width} ${height} ${rounded}`}></div>
    );
  };

export default SkeletonLoader;