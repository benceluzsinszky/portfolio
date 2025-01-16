import ShowCase from "../ShowCase";

type JourneyItemProps = {
  color: string;
  logo: string;
  year: string;
  title: string;
  description: string;
  swapped?: boolean;
};

export default function JourneyItem({
  color,
  logo,
  year,
  title,
  description,
  swapped,
}: JourneyItemProps) {
  return (
    <div className="my-10 flex items-center">
      <div className="flex-1">
        {swapped ? (
          <ShowCase title={title}>
            <p>{description}</p>
          </ShowCase>
        ) : (
          <h3 className="text-right text-gray-400">{year}</h3>
        )}
      </div>
      <div className="w-5 h-5 bg-gray-200 rounded-full mx-5"></div>
      <div className="flex-1">
        {!swapped ? (
          <ShowCase title={title}>
            <p>{description}</p>
          </ShowCase>
        ) : (
          <h3 className="text-left text-gray-400">{year}</h3>
        )}
      </div>
    </div>
  );
}
