import './globals.css';
export const metadata = { title: 'Performance Dashboard' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
