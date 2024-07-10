import Link from 'next/link';

interface RegisterFooterProps {
  text: string;
  href: string;
  pushText: string;
}

export default function RegisterFooter({ text, href, pushText }: RegisterFooterProps) {
  return (
    <h3 className="font-semibold">
      {text}
      <Link href={href} className="text-blue-800 hover:underline">
        {pushText}
      </Link>
    </h3>
  );
}
