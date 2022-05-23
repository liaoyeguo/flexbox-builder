import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useFlexBoxStore } from "../store/flexbox";
import Button from "./Button";
import useConnectedField from "./Field";
import Input from "./Input";
import Panel, { Item } from "./Panel";
import Switch from "./Switch";

const FlexItemPanel = () => {
  const store = useFlexBoxStore();
  const config = store.activeItemConfig;
  const { Field } = useConnectedField({ store: config });

  if (!config) return null;

  const isFixedSize = config.isFixedSize;

  return (
    <Panel>
      <Item label="Fixed size">
        <Field field="isFixedSize">
          <Switch />
        </Field>
      </Item>

      {isFixedSize ? (
        <>
          <Item label="Width">
            <Field field="width">
              <Input className="w-16" />
            </Field>
          </Item>
          <Item label="Height">
            <Field field="height">
              <Input className="w-16" />
            </Field>
          </Item>
        </>
      ) : (
        <>
          <Item label="Grow">
            <Field field="grow">
              <Input className="w-16" />
            </Field>
          </Item>
          <Item label="Shrink">
            <Field field="shrink">
              <Input className="w-16" />
            </Field>
          </Item>
          <Item label="Basis">
            <Field field="basis">
              <Input className="w-16" />
            </Field>
          </Item>
        </>
      )}
      <div className="text-center">
        <Button
          className="mt-4 mb-2"
          type="gray"
          onClick={() => {
            store.delete(config.id);
          }}
        >
          Delete
        </Button>
      </div>
    </Panel>
  );
};

export default observer(FlexItemPanel);
