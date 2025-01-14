type TechStackItemProps = {
  icon: string;
  alt: string;
  isDark?: boolean;
};

export default function TechStackItem({
  icon,
  alt,
  isDark,
}: TechStackItemProps) {
  return (
    <div
      className="flex items-center justify-center p-2 bg-gray-800 rounded-lg cursor-pointer"
      title={alt}
    >
      <img width={50} height={50} src={icon} alt={alt} />
    </div>
  );
}
