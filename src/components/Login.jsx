import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Buy/Sell Image Component
function BuySellImage({ hovered, onPriceUpdate }) {
  const [currentPrice, setCurrentPrice] = useState(43250);
  const [priceChange, setPriceChange] = useState(1250);

  // Update price data periodically
  useEffect(() => {
    const updatePrice = () => {
      // Update price with small realistic changes
      const priceVariation = (Math.random() - 0.5) * 200;
      const newPrice = Math.max(42000, Math.min(45000, currentPrice + priceVariation));
      const newChange = newPrice - 43250;
      
      setCurrentPrice(Math.round(newPrice));
      setPriceChange(Math.round(newChange));
      
      // Send price data to parent component
      if (onPriceUpdate) {
        onPriceUpdate({
          currentPrice: Math.round(newPrice),
          priceChange: Math.round(newChange)
        });
      }
    };

    updatePrice();
    const interval = setInterval(updatePrice, 5000);
    return () => clearInterval(interval);
  }, [currentPrice, onPriceUpdate]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Buy/Sell Image */}
      <motion.div
        animate={{
          scale: hovered ? 1.05 : 1,
          rotateY: hovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl"
      >
        <img
          src="/buy sell.png"
          alt="Trading Buy/Sell Interface"
          className="w-full h-full object-cover rounded-2xl"
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-orange-500/20 rounded-2xl" />
      </motion.div>

      {/* Floating trading indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-orange-500/60 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Loading Screen Component
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
    >
      <div className="relative">



        {/* Loading text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Trading Solutions
        </motion.h1>

        {/* Progress bar container */}
        <div className="w-80 h-3 bg-[#2a2a2a] rounded-full overflow-hidden shadow-lg">
          <motion.div
            className="h-full bg-orange-600 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress percentage */}
        <motion.p
          className="text-orange-400 text-center mt-4 text-xl font-semibold"
        >
          {progress}%
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-orange-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Main Login Component
export default function Login({ onLogin }) {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hovered, setHovered] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPrice, setCurrentPrice] = useState(43250);
  const [priceChange, setPriceChange] = useState(1250);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleNext = () => {
    if (!name.trim()) {
      setErrors({ name: 'Please enter your name' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleLogin = () => {
    if (!email.trim()) {
      setErrors({ email: 'Please enter your email' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }
    setErrors({});
    // Store user info in localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    onLogin();
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const handlePriceUpdate = (priceData) => {
    setCurrentPrice(priceData.currentPrice);
    setPriceChange(priceData.priceChange);
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-8"
        >
          <div className="w-full max-w-7xl h-auto sm:h-[700px] bg-[#1e1e1e] backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left Side - Buy/Sell Image */}
            <div
              className="hidden lg:flex w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full relative items-center justify-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
     
              
              <BuySellImage hovered={hovered} onPriceUpdate={handlePriceUpdate} />

             
             
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-tl from-[#252525]/30 to-transparent" />

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-md relative z-10"
              >
                {/* Header */}
                <div className="mb-6 sm:mb-8 lg:mb-10">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-orange-500">
                    Welcome
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                    {step === 1 ? 'Enter your details to get started' : 'Almost there! Just one more step'}
                  </p>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all text-sm sm:text-base ${
                    step >= 1 ? 'bg-orange-600 text-white' : 'bg-[#2a2a2a] text-gray-500'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 sm:mx-3 transition-all ${
                    step >= 2 ? 'bg-orange-600' : 'bg-[#2a2a2a]'
                  }`} />
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all text-sm sm:text-base ${
                    step >= 2 ? 'bg-orange-600 text-white' : 'bg-[#2a2a2a] text-gray-500'
                  }`}>
                    2
                  </div>
                </div>

                {/* Form */}
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2 text-sm font-medium">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, handleNext)}
                          placeholder="Enter your name"
                          className={`w-full px-5 py-4 bg-[#2a2a2a] border ${
                            errors.name ? 'border-red-500' : 'border-gray-600'
                          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all focus:ring-2 focus:ring-orange-500/50`}
                          autoFocus
                        />
                        {errors.name && (
                          <p className="mt-2 text-red-400 text-sm">{errors.name}</p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNext}
                        className="w-full py-4 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-all"
                      >
                        Next →
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <label className="block text-gray-300 mb-2 text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                          placeholder="Enter your email"
                          className={`w-full px-5 py-4 bg-[#2a2a2a] border ${
                            errors.email ? 'border-red-500' : 'border-gray-600'
                          } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all focus:ring-2 focus:ring-orange-500/50`}
                          autoFocus
                        />
                        {errors.email && (
                          <p className="mt-2 text-red-400 text-sm">{errors.email}</p>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(1)}
                          className="px-6 py-4 bg-[#2a2a2a] text-white font-semibold rounded-xl hover:bg-[#333] transition-all"
                        >
                          ← Back
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogin}
                          className="flex-1 py-4 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-all"
                        >
                          Login →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer text */}
                <p className="text-gray-500 text-sm text-center mt-8">
                  By continuing, you agree to our Terms of Service
                </p>
              </motion.div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-600/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

