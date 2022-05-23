import { useFlexBoxStore } from "../store/flexbox";
import CrossAxisAlign from "./CrossAxisAlign";
import useConnectedField from "./Field";
import Input from "./Input";
import MainAxisAlign from "./MainAxisAlign";
import Panel, { Item } from "./Panel";
import Switch from "./Switch";

const ContainerPanel = () => {
  const store = useFlexBoxStore();
  const config = store.containerConfig;

  const { Field } = useConnectedField({ store: config });
  return (
    <Panel>
      <Item label="Horizontal">
        <Field field="horizontal">
          <Switch />
        </Field>
      </Item>

      <Item label="Justify content">
        <Field field="justifyContent">
          <MainAxisAlign />
        </Field>
      </Item>

      <Item label="Align items">
        <Field field="alignItems">
          <CrossAxisAlign />
        </Field>
      </Item>

      <Item label="Wrap">
        <Field field="wrap">
          <Switch />
        </Field>
      </Item>

      <Item label="Gap">
        <Field field="gap">
          <Input className="w-16" />
        </Field>
      </Item>
    </Panel>
  );
};

export default ContainerPanel;
