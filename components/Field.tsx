import React, { useRef } from "react";
import { useMemo } from "react";
import { get, set } from "lodash-es";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

const useConnectedField = ({ store }: { store: Record<string, any> }) => {
  const ref = useRef(store);
  ref.current = store;

  const Field = useMemo(() => {
    return observer(
      (props: { children: React.ReactElement; field: string }) => {
        const { children, field } = props;
        const value = get(ref.current, field);
        const onChange = (val: any) => {
          //   console.log(v);
          runInAction(() => {
            set(ref.current, field, val);
          });
        };
        return React.cloneElement(children, {
          value,
          onChange,
        });
      }
    );
  }, []);

  return {
    Field,
  };
};

export default useConnectedField;
