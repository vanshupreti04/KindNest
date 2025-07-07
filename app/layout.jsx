import './globals.css'; // Add this import

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        {/* Add this if you're still having issues */}
        <link
          href="https://fonts.googleapis.com/css2?family=Merienda:wght@700&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans"> {/* Ensures Poppins is default */}
        {children}
      </body>
    </html>
  )
}