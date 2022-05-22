import type { NextPage } from "next";
import { PropsWithChildren, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ResizableContainer from "../../components/ResizableContainer";

const EditorPage: NextPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-fuchsia-500 to-purple-600">
      <div className="pt-[120px] pl-[120px]">
        <ResizableContainer>hello</ResizableContainer>
      </div>
    </div>
  );
};

export default EditorPage;
