import { ClerkProvider } from '@clerk/nextjs';
import { RootLayout } from '@/components/layout/root-layout';
import './globals.css';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <RootLayout>{children}</RootLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}