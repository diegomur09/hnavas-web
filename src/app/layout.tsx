// Pass-through root layout. The real locale-aware <html>/<body> live in
// [locale]/layout.tsx; this wrapper exists only so the root "/" redirect page
// has a layout to sit under, without nesting a second <html>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
