import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'TaskFlow USA – Daily Tasks, Productivity & Life Tools',
  description: 'Your go-to hub for daily productivity tasks, life hacks, financial tools, and resources built for Americans. Stay organized, save money, and get more done.',
  keywords: 'productivity, tasks, daily planner, American lifestyle, financial tools, to-do list, life hacks USA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="7091fd85dda71e1175a3595237936c71" />
        <script dangerouslySetInnerHTML={{ __html: `(function(s){s.dataset.zone='10731054',s.src='https://gizokraijaw.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(s){s.dataset.zone='10731075',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))` }} />
        <script src="https://quge5.com/88/tag.min.js" data-zone="223621" async data-cfasync="false"></script>
      </head>
      <body className={inter.variable}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
