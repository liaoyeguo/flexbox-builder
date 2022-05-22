import { useMotionValue, useTransform, motion } from "framer-motion";
import { PropsWithChildren } from "react";

const CONTAINER_WIDTH = 640;
const ResizableContainer = (props: PropsWithChildren<{ width?: number }>) => {
  const { children, width: defaultWidth = CONTAINER_WIDTH } = props;

  const x = useMotionValue(0);
  const width = useTransform(x, (x) => defaultWidth + x);

  console.log(x.get());

  return (
    <div className={`relative w-[${defaultWidth}px]`}>
      <motion.div
        className={`p-4 bg-white shadow-md rounded`}
        style={{ width }}
      >
        {children}
      </motion.div>
      <motion.div
        style={{ x }}
        drag="x"
        className="cursor-col-resize absolute top-1/2 -mt-4 -right-3"
        dragElastic={0}
        dragMomentum={false}
        whileHover={{ scale: 1.2 }}
        whileDrag={{ scale: 1.2 }}
      >
        <div className="w-[6px] h-8 grow-0 shrink-0 bg-gray-700 rounded"></div>
      </motion.div>
    </div>
  );
};

export default ResizableContainer;
