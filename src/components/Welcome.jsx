import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to <span className="text-indigo-400">TheDevSpace</span>
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          A place where developers connect, collaborate, and grow together.
          Build meaningful connections with passionate tech minds.
        </p>

        <div className="flex justify-center gap-5">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-lg bg-indigo-600
              hover:bg-indigo-500 transition text-white font-semibold shadow-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-lg border border-indigo-500
              text-indigo-400 hover:bg-indigo-500/10 transition font-semibold"
          >
            Get Started
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-400">
          🚀 Connect • Learn • Build
        </p>
      </div>
    </div>
  );
};

export default Welcome;
