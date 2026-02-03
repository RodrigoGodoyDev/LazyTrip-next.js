import { Navbar } from '@/components/layout/navbar';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

export const metadata = {
  title: 'LazyTrip - Smart Travel Assistant',
  description: 'Descubre destinos por presupuesto y automatiza tu logística de viaje.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          {/* <Footer /> si aplica */}
        </ThemeProvider>
      </body>
    </html>
  );
}
