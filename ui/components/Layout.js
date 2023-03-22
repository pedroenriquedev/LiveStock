import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Layout = ({ children }) => {
  return (
    <div>
      <motion.main
        key="main"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
