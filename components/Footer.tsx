export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-4 text-center text-zinc-500 select-none">
      <p>© {new Date().getFullYear()} Terminal Systems. All rights reserved.</p>
    </footer>
  );
}