import Link from 'next/link';

const footerLinks = {
  product: [
    { label: 'Courses', href: '/companions' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/subscription' },
  ],
  company: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Journey', href: '/my-journey' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <Link href="/" className="font-bold text-xl text-foreground">
            Hayyu
          </Link>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Learn new skills anytime, anywhere with AI voice and chat.
          </p>
        </div>
        <div className="flex gap-12">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Account</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 py-4 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Hayyu. All rights reserved.
      </div>
    </footer>
  );
}
