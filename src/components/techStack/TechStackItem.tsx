type TechStackItemProps = {
  icon: string;
  alt: string;
};

export default function TechStackItem({ icon, alt }: TechStackItemProps) {
  return (
    <div
      className="flex items-center justify-center p-2 bg-gray-800 rounded-lg cursor-pointer"
      title={alt}
    >
      <img width={50} height={50} src={icon} alt={alt} />
    </div>
  );
}
