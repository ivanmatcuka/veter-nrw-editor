import theme from '@/src/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Ubuntu } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from './SettingsContext';

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Veter NRW Editor',
  description: 'Veter NRW Editor',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${ubuntu.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <NextIntlClientProvider messages={messages}>
            <AppRouterCacheProvider>
              <SettingsProvider>{children}</SettingsProvider>
            </AppRouterCacheProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
