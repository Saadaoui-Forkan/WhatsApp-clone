const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center text-sm text-gray-600 dark:text-gray-300 p-3 bg-gray-200 dark:bg-gray-600 backdrop-blur-sm">
      Made with{" "}
      <a
        href="https://personal-portfolio-six-pearl-25.vercel.app/en"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-emerald-700 dark:text-purple-300 hover:text-emerald-800 dark:hover:text-purple-200"
      >
        Mahmoud Saadaoui
      </a>{" "}
      © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
