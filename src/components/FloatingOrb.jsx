import { motion } from 'framer-motion';

export default function FloatingOrb() {
  return (
    <motion.button whileHover={{ scale: 1.04 }} onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 shadow-2xl flex items-center justify-center text-black">
      <span className="text-sm font-semibold">AI</span>
    </motion.button>
  );
}
