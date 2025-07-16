const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} gamecore.co.kr All rights reserved.
        </p>
        <p>
          <a href="#" className="text-gray-400 hover:text-white">
            Privacy Policy 2025
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
