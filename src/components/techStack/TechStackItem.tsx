type TechStackItemProps = {
  icon: string;
  alt: string;
};

export default function TechStackItem({ icon, alt }: TechStackItemProps) {
  return (
    <div
      className="flex items-center justify-center mx-1 p-2 bg-gray-900 rounded-xl max-w-none min-w-16 min-h-16"
      title={alt}
    >
      <img width={50} height={50} src={icon} alt={alt} />
    </div>
  );
}
