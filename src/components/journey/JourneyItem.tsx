import ShowCase from "../ShowCase";

type JourneyItemProps = {
  date: string;
  icon: string;
  title: string;
  description: string;
  swapped?: boolean;
};

export default function JourneyItem({
  date,
  icon,
  title,
  description,
  swapped,
}: JourneyItemProps) {
  const viewShowCase = () => {
    return (
      <ShowCase title={title} icon={icon}>
        <p>{description}</p>
      </ShowCase>
    );
  };

  const viewDate = () => {
    return (
      <h3 className={`text-${swapped ? "right" : "left"} text-gray-400`}>
        {date}
      </h3>
    );
  };

  return (
    <div className="my-10 flex items-center w-full z-10">
      <div className="flex-1">{swapped ? viewDate() : viewShowCase()}</div>
      <div className="w-5 h-5 bg-gray-950 border-4 border-gray-200 rounded-full mx-5"></div>
      <div className="flex-1">{!swapped ? viewDate() : viewShowCase()}</div>
    </div>
  );
}
