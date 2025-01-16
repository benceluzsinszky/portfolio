import JourneyItem from "./JourneyItem";

export default function Journey() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="h-10 w-1 bg-gradient-to-t from-gray-200 to-gray-950"></div>
      <div className="relative flex flex-col items-center ">
        <JourneyItem
          color="gray-200"
          logo="https://via.placeholder.com/150"
          year="2024"
          description="Full Stack Developer Student Assistant"
          title="IT University of Copenhagen"
        />
        <JourneyItem
          color="gray-200"
          logo="https://via.placeholder.com/150"
          year="2023"
          description="Full Stack Developer & Quality Assurance Student Assistant"
          title="Oktogrid"
          swapped
        />
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
      </div>

      <div className="h-10 w-1 bg-gradient-to-b from-gray-200 to-gray-950"></div>
    </div>
  );
}
