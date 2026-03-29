import './globals.css'

export const metadata = {
  title: 'Cntrl M CRM',
  description: 'Lead management dashboard for lawyers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
