import { CellPaddings, ContentCell } from 'disa-framework/contentCell';

export interface Props {
  exampleText: string;
}

export const ContentbarExampleWithContentCell = (props: Props) => {
  return (
    <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
      <h2>{props.exampleText}</h2>
      <h3>Normal useCase</h3>
    </ContentCell>
  );
};
