type ShowCaseProps = {
  title: string;
  children: React.ReactNode;
  icon: string;
};

export default function ShowCase({ title, children, icon }: ShowCaseProps) {
  return (
    <div className="flex flex-col min-h-full overflow-hidden flex-1 border p-3 md:p-5 rounded-3xl bg-zinc-950">
      <div>
        <div className="inline-flex items-center mb-3 border rounded-full py-1 md:py-2 px-2 md:px-4 w-auto bg-gray-950">
          <img src={icon} alt={title} className="w-5 md:w-6 rounded-md" />
          <p className="mx-2 text-2xs md:text-sm text-nowrap">{title}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
