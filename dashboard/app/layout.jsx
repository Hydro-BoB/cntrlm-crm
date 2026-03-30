import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Cntrl M CRM',
  description: 'Customer Relationship Management Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
