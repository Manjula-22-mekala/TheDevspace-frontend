const Navbar = () => {
  return (
    <header className="h-20 bg-[#0b0f1a] border-b border-gray-800">
      <div className="flex items-center h-full">

        {/* LEFT SPACE = SIDEBAR WIDTH */}
        <div className="w-64"></div>

        {/* CENTER CONTENT (same width as main area) */}
        <div className="flex-1 flex justify-center">
          <h1
            className="
              text-2xl md:text-3xl
              font-semibold tracking-wide
              bg-gradient-to-r from-indigo-400 to-purple-400
              bg-clip-text text-transparent
              whitespace-nowrap
            "
          >
            Welcome To The Developer Networking Platform
          </h1>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
