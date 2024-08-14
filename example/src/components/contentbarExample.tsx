import { WHITE } from "iav-frontend-framework/constants";
import { Button } from "primereact/button";

export interface Props {
  exampleText: string;
  onAddTab: () => void;
}

export const ContentbarExample = (props: Props) => {
  return (
    <div className="w-full" style={{ backgroundColor: WHITE }}>
      <h2>{props.exampleText}</h2>
      <h3>Normal useCase Contentbar</h3>
      <Button onClick={props.onAddTab}>Add Tab</Button>
    </div>
  );
};
