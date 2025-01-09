type ContactButtonProps = {
  href: string;
  icon: string;
  alt: string;
};

export default function ContactButton({ href, icon, alt }: ContactButtonProps) {
  return (
    <a
      href={href}
      className="border-2 rounded-md border-gray-800 dark:border-gray-200 hover:opacity-75"
    >
      <img src={icon} alt={alt} className="w-10 h-10" />
    </a>
  );
}
