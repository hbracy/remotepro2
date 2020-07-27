import * as React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { TrademarkText, MonoText, TrademarkBigHeaderText } from './StyledText';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Container from './Container.js';


function LandingScroll(props) {
const markdownText = '# Remote Pro\n\n**There exists no full work from home suite.** Instead, businesses typically combine a patchwork of software (Slack, Jira, Google Drive, Zoom) to run their now remote business. The cost of such a suite for a small business is a prohibitive $7500 a month. Businesses that are new to work from home are looking for a better way to run.\n\n**Remote Pro is the first full work from home suite.** We include messaging, calling, ticketing, calendar, emails, and file storage and editing, all from the browser. While competitors have focused on specific niches, it is too confusing and expensive to run a distributed team with distributed tools.\n\n**Remote Pro is the best place to work from home.** While we are first targeting businesses that are new to remote work, we will expand our market to be the most convenient, inexpensive, and healthy way to work from home. Excellent customer service when there is frustration, and world class engineering to make sure it doesn\'t happen again. It is from this position that we will expand our market to the high rolling software industry.\n\n**Remote Pro is not for businesses that were mostly remote before the pandemic.** We are looking to become the best in the industry, not the most popular. The best way for us to understand the needs of the now remote economy is to address the needs of businesses with 3 - 20 employees that had never before been remote. After we address this market, our position will be strong enough to dominant the larger work from home market.\n\nIn 2020, [42%](https://www.cnbc.com/2020/04/09/heres-what-we-know-about-how-remote-work-changes-us.html) of workers who were not working from home, began to work from home, with [90%](https://buffer.com/state-of-remote-work-2019) saying that they hoped to work from home for the rest of their lives. # Remote Pro\n\n## Executive Summary\n\n**There exists no full work from home suite.** Instead, businesses typically combine a patchwork of software (Slack, Jira, Google Drive, Zoom) to run their now remote business. The cost of such a suite for a small business is a prohibitive $7500 a month. Businesses that are new to work from home are looking for a better way to run.\n\n**Remote Pro is the first full work from home suite.** We include messaging, calling, ticketing, calendar, emails, and file storage and editing, all from the browser. While competitors have focused on specific niches, it is too confusing and expensive to run a distributed team with distributed tools.\n\n**Remote Pro is the best place to work from home.** While we are first targeting businesses that are new to remote work, we will expand our market to be the most convenient, inexpensive, and healthy way to work from home. Excellent customer service when there is frustration, and world class engineering to make sure it doesn\'t happen again. It is from this position that we will expand our market to the high rolling software industry.\n\n**Remote Pro is not for businesses that were mostly remote before the pandemic.** We are looking to become the best in the industry, not the most popular. The best way for us to understand the needs of the now remote economy is to address the needs of businesses with 3 - 20 employees that had never before been remote. After we address this market, our position will be strong enough to dominant the larger work from home market.\n\nIn 2020, [42%](https://www.cnbc.com/2020/04/09/heres-what-we-know-about-how-remote-work-changes-us.html) of workers who were not working from home, began to work from home, with [90%](https://buffer.com/state-of-remote-work-2019) saying that they hoped to work from home for the rest of their lives.'


  return (
    <Container className={''}>
      <Container className={'opaque slightlyCurvedTransparentBorder whiteText wrap scroll padding'}>
        <ReactMarkdown source={markdownText} />
      </Container>
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(LandingScroll);



