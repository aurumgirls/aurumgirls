import Link from 'next/link';

export function CheckoutFooter() {
  return (
    <footer className="border-t border-sand bg-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate">
        <p>© {new Date().getFullYear()} Painterland Sisters. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-terracotta transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-terracotta transition-colors">Privacy</Link>
          <Link href="/contact" className="hover:text-terracotta transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
