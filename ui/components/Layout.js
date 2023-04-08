import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
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
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
