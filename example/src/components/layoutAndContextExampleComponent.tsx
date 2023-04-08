import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import {
  AppliedTranslationProps,
  applyTranslation,
} from 'disa-framework/translators';
import { CellPaddings, ContentCell } from 'disa-framework/contentCell';
import { FirstExampleContext } from '../contexts/FirstExampleContext';
import { BasicContentbarWrapper } from 'disa-framework/basicContentbarWrapper';
import { CustomContentbarWrapper } from 'disa-framework/customContentbarWrapper';
import { TestComponent } from './testComponent';
import { ContentSelectionElement } from './Testcomponent2';

interface State {
  localState: string;
  selectedId: string;
  contentTabs: JSX.Element[];
}

class LayoutAndContextExampleComponentUnprocessed extends Component<
  AppliedTranslationProps,
  State
> {
  //declare context: React.ContextType<typeof FirstExampleContext>;

  constructor(props: AppliedTranslationProps) {
    super(props);
    this.state = {
      localState: 'default',
      selectedId: 'test123',
      contentTabs: [
        <div
          key="example_local1"
          style={{
            backgroundColor: '#5daedb',
            color: 'white',
            padding: '4px',
            marginRight: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>{this.props.t('Example_field_local', { count: 1 })}</span>
        </div>,
        <div
          key="example_local2"
          style={{
            backgroundColor: '#5daedb',
            color: 'white',
            padding: '4px',
            marginRight: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>{this.props.t('Example_field_local', { count: 2 })}</span>
        </div>,
      ],
    };
  }
  render() {
    return (
      <Content
        layoutBehaviour={LayoutBehaviour.GRID}
        contentElements={[
          new BasicContentbarWrapper(
            'test124',
            'car123',
            this.state.selectedId,
            (value: string) => this.setState({ selectedId: value }),
            true,
            () => {}
          ),
          // new BasicContentbarWrapper(
          //   'test123',
          //   'car124',
          //   this.state.selectedId,
          //   (value: string) => this.setState({ selectedId: value }),
          //   true,
          //   () => {}
          // ),
        ]}
      >
        <div className={'col-8 grid grid-nogutter'}>
          <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
            <span>First row left</span>

            <div className="mt-3">
              {this.props.t('Example_global_context')}:{' '}
              {this.context!.exampleData}
            </div>
            <div>
              {this.props.t('Example_local_context')}: {this.state.localState}
            </div>
            <Button
              className="m-3"
              onClick={function (
                this: LayoutAndContextExampleComponentUnprocessed
              ) {
                this.context?.updateExampleData(
                  this.props.t('changed_with_local_element')
                );
              }.bind(this)}
            >
              <span>{this.props.t('Change_global_context')}</span>
            </Button>
            <Button
              className="m-3"
              onClick={function (
                this: LayoutAndContextExampleComponentUnprocessed
              ) {
                this.setState({
                  localState: this.props.t('changed_local_state'),
                });
              }.bind(this)}
            >
              <span>{this.props.t('Change_local_data')}</span>
            </Button>
          </ContentCell>
          <ContentCell colWidth={6} paddings={CellPaddings.VERT_RIGHT}>
            <span>First row center</span>
          </ContentCell>
          <ContentCell paddings={CellPaddings.BOT_HOR}>
            <span>Second row left</span>
          </ContentCell>
          <ContentCell paddings={CellPaddings.BOT_RIGHT}>
            <span>Second row center left</span>
          </ContentCell>
          <ContentCell paddings={CellPaddings.BOT_RIGHT}>
            <span>Second row center</span>
          </ContentCell>
          <ContentCell paddings={CellPaddings.BOT_RIGHT}>
            <span>Second row center right</span>
          </ContentCell>
          <ContentCell paddings={CellPaddings.BOT_RIGHT}>
            <span>Second row right</span>
          </ContentCell>
          <ContentCell colWidth={12} paddings={CellPaddings.BOT_HOR}>
            <span>Third row</span>
          </ContentCell>
        </div>
        <ContentCell
          paddings={CellPaddings.VERT_RIGHT}
          colWidth={4}
          clearStyle={true}
        >
          <span>Right with cleared style</span>
        </ContentCell>
      </Content>
    );
  }
}

LayoutAndContextExampleComponentUnprocessed.contextType = FirstExampleContext;

export const LayoutAndContextExampleComponent = applyTranslation(
  LayoutAndContextExampleComponentUnprocessed
);
