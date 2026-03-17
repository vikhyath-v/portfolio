import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = () => {
    if (!isHome) {
      navigate('/');
    } else {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between px-4 md:px-6 py-4 bg-custom-bg text-custom-text z-50">
      <button
        onClick={goHome}
        className="text-2xl md:text-4xl font-bold hover:text-gray-400 transition-colors duration-300">
        V
      </button>
      <ul className="flex gap-4 md:gap-6 text-sm">
        <li>
          <button
            onClick={() => scrollToSection('work')}
            className="text-sm md:text-xl text-gray-400 hover:text-custom-text transition-colors duration-300"
          >
            WORK
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm md:text-xl text-gray-400 hover:text-custom-text transition-colors duration-300"
          >
            CONTACT
          </button>
        </li>
      </ul>
    </nav>
  );
}