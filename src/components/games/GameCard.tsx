import { Link } from "react-router-dom";

export default function GameCard({
  title,
  description,
  icon,
  link,
  deactivated = false,
}: {
  title: string;
  description: string;
  icon: string;
  link: string;
  deactivated?: boolean;
}) {
  const cardClasses = `flex flex-col border rounded-2xl w-40 h-64 overflow-hidden bg-zinc-950 transition-transform duration-300 ease-in-out ${
    deactivated ? "brightness-50 opacity-90 cursor-default" : "hover:scale-105"
  }`;

  const cardContent = (
    <div className={cardClasses}>
      <img
        src={icon}
        alt={title}
        className="min-w-full min-h-32 max-h-32 object-cover object-center mb-1 border-b bg-gray-950"
      />
      <h2 className="text-xl mx-2 my-1 text-left m-0  font-bold">{title}</h2>
      <p className="text-xs mx-2 mb-5 mt-0 text-left text-gray-400">
        {deactivated ? "Under Construction" : description}
      </p>
    </div>
  );

  return deactivated ? cardContent : <Link to={link}>{cardContent}</Link>;
}
