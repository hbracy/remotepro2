import * as React from 'react';

export function CooperBlackText(props) {
  return <div className={'cooperBlackText ' + props.className}>{props.children}</div>;
}

export function TrademarkText(props) {
  return <div className={'trademarkText base1Text ' + props.className}>{props.children}</div>;
}

export function TrademarkBigHeaderText(props) {
  return <div className={'trademarkText base2Text boldText largeFont ' + props.className}>{props.children}</div>;

}