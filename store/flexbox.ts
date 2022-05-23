import { CSSProperties } from "@stitches/react";
import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { createContext, useContext } from "react";

const makeFlexItem = (): ItemConfig => ({
  id: nanoid(),
});

class ContanerConfig {
  horizontal = true;
  justifyContent: CSSProperties["justifyContent"] = "flex-start";
  alignItems: CSSProperties["alignItems"] = "stretch";
  gap: CSSProperties["gap"] = "8px";
  wrap = false;

  constructor() {
    makeAutoObservable(this);
  }
}

class ItemConfig {
  id: string;

  constructor() {
    this.id = nanoid();
    makeAutoObservable(this, {
      id: false,
    });
  }
}

export default class FlexBoxStore {
  items = [makeFlexItem(), makeFlexItem()];
  selection?: "root" | string;
  containerConfig = new ContanerConfig();

  constructor() {
    makeAutoObservable(this);
  }

  pushItem = () => {
    this.items.push(makeFlexItem());
  };

  select = (val: "root" | string) => {
    this.selection = val;
  };

  activeItemConfig = () => {
    return this.items.find((item) => item.id === this.selection);
  };
}

const CTX = createContext(new FlexBoxStore());

export const FlexBoxStoreProvider = CTX.Provider;

export const useFlexBoxStore = () => {
  return useContext(CTX);
};
