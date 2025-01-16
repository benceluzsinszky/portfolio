type ShowCaseProps = {
  title: string;
  children: React.ReactNode;
  icon?: string;
};

export default function ShowCase({ title, children, icon }: ShowCaseProps) {
  return (
    <div className="flex flex-col min-h-full overflow-hidden flex-1 border p-5 rounded-3xl bg-zinc-950">
      <div>
        <div className="inline-flex items-center mb-3 border rounded-full py-1 px-3 w-auto bg-gray-950">
          {icon && <img src={icon} alt={title} className="w-6" />}
          <p className="mx-2 text-sm">{title}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
