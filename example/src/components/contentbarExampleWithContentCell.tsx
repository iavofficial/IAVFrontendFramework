import { CellPaddings, ContentCell } from "iav-frontend-framework/contentCell";
import { Button } from "primereact/button";

export interface Props {
  exampleText: string;
  onAddTab: () => void;
}

export const ContentbarExampleWithContentCell = (props: Props) => {
  return (
    <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
      <h2>{props.exampleText}</h2>
      <h3>Normal useCase Contentbar</h3>
      <Button onClick={props.onAddTab}>Add Tab</Button>
    </ContentCell>
  );
};
