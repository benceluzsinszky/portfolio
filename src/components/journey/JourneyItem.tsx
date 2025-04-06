import ShowCase from "../ShowCase";

type JourneyItemProps = {
  date: string;
  icon: string;
  title: string;
  description: string;
  swapped?: boolean;
  techStack?: string;
};

export default function JourneyItem({
  date,
  icon,
  title,
  description,
  swapped,
  techStack,
}: JourneyItemProps) {
  if (window.innerWidth < 768) {
    swapped = true;
  }

  const viewShowCase = () => {
    return (
      <ShowCase title={title} icon={icon}>
        <p>{description}</p>
        {window.innerWidth > 768 && techStack && (
          <div>
            <p className="mt-3 text-sm text-gray-300">{techStack}</p>
          </div>
        )}
      </ShowCase>
    );
  };

  const viewDate = () => {
    return (
      <h3
        className="ml-3 md:ml-0 text-gray-400"
        style={{ textAlign: swapped ? "right" : "left" }}
      >
        {date}
      </h3>
    );
  };

  return (
    <div className="relative my-10 flex flex-col md:flex-row items-start md:items-center min-w-full z-10">
      <div className="flex-1 pl-6 md:pl-0 md:mr-5">
        {swapped ? viewDate() : viewShowCase()}
      </div>
      <div className="hidden absolute left-1/2 transform -translate-x-1/2 md:block w-4 h-4 bg-gray-950 border-4 border-gray-200 rounded-full"></div>
      <div className="md:flex-1 pl-6 md:pl-0 w-full md:ml-5">
        {!swapped ? viewDate() : viewShowCase()}
      </div>
    </div>
  );
}
