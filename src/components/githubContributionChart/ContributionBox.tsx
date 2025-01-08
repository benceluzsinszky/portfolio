type ContributionBoxProps = {
  date: string;
  count: number;
  level: number;
};

export default function ContributionBox({
  count,
  date,
  level,
}: ContributionBoxProps) {
  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-900";
      case 2:
        return "bg-emerald-600";
      case 3:
        return "bg-emerald-300";
      case 4:
        return "bg-emerald-200";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div
      className={`h-4 w-4 m-0.5 rounded-sm cursor-pointer ${getColor(
        level
      )} hover:brightness-125`}
      title={`${count} contributions on ${date}`}
    ></div>
  );
}
