import { CSSProperties } from "@stitches/react";
import { merge } from "lodash-es";
import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { createContext, useContext } from "react";

const makeFlexItem = (): ItemConfig => new ItemConfig();

export class ContanerConfig {
  horizontal = true;
  justifyContent: CSSProperties["justifyContent"] = "flex-start";
  alignItems: CSSProperties["alignItems"] = "stretch";
  gap: CSSProperties["gap"] = "8px";
  wrap = false;

  constructor(
    horizontal?: boolean,
    justifyContent?: CSSProperties["justifyContent"],
    alignItems?: CSSProperties["alignItems"],
    gap?: CSSProperties["gap"],
    wrap?: boolean
  ) {
    merge(this, {
      horizontal,
      justifyContent,
      alignItems,
      gap,
      wrap,
    });

    makeAutoObservable(this);
  }
}

export class ItemConfig {
  id: string;
  isFixedSize = false;
  width = "80px";
  height = "64px";
  grow = 0;
  shrink = 1;
  basis = "auto";

  constructor(
    isFixedSize?: boolean,
    width?: string,
    height?: string,
    grow?: number,
    shrink?: number,
    basis?: string
  ) {
    this.id = nanoid();
    merge(this, {
      isFixedSize,
      width,
      height,
      grow,
      shrink,
      basis,
    });
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
    this.selection = this.items[0].id;
    makeAutoObservable(this);
  }

  pushItem = () => {
    this.items.push(makeFlexItem());
  };

  select = (val: "root" | string) => {
    this.selection = val;
  };

  delete = (id: string) => {
    const idx = this.items.findIndex((item) => item.id === id);
    if (idx > -1) this.items.splice(idx, 1);
    this.selection = "root";
  };
  get activeItemConfig() {
    const res = this.items.find((item) => item.id === this.selection);
    return res;
  }
}

const CTX = createContext(new FlexBoxStore());

export const FlexBoxStoreProvider = CTX.Provider;

export const useFlexBoxStore = () => {
  return useContext(CTX);
};
