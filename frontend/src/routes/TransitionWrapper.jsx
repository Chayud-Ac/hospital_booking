import { useTransition, animated } from "@react-spring/web";
import { useLocation } from "react-router-dom";

const TransitionWrapper = ({ children }) => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
  });

  return (
    <>
      {transitions((style, item) => (
        <animated.div style={style}>{children}</animated.div>
      ))}
    </>
  );
};

export default TransitionWrapper;
