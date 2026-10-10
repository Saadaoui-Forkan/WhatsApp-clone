const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center text-xs text-gray-500 dark:text-gray-400 p-3 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm border-t border-surface-border dark:border-surface-borderDark">
      Made with{" "}
      <a
        href="https://personal-portfolio-six-pearl-25.vercel.app/en"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        Mahmoud Saadaoui
      </a>{" "}
      © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;