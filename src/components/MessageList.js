import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Api from "../api";
//components
import ErrorCard from "./ErrorCard";
//styles
import "../styles/layout.scss";

const StyledButton = styled(Button)`
  background-color: #88fca3 !important;
  color: #000 !important;
`;
const ClearButton = styled(Button)`
  background-color: #88fca3 !important;
  color: #000 !important;
  margin: 0 0 0 10px !important;
`;

class MessageList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: [],
      warning: [],
      info: [],
    };
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message);
    },
  });

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    this.setState(
      {
        error:
          message.priority === 1
            ? [message, ...this.state.error]
            : this.state.error,
        warning:
          message.priority === 2
            ? [message, ...this.state.warning]
            : this.state.warning,
        info:
          message.priority === 3
            ? [message, ...this.state.info]
            : this.state.info,
      },
      () => {
        // Included to support initial direction. Please remove upon completion
        console.log(this.state);
      }
    );
  }

  handleClearAll() {
    this.setState({ error: [], warning: [], info: [] });
  }

  renderButton() {
    const isApiStarted = this.api.isStarted();
    return (
      <>
        <StyledButton
          variant="contained"
          onClick={() => {
            if (isApiStarted) {
              this.api.stop();
            } else {
              this.api.start();
            }
            this.forceUpdate();
          }}
          //color="primary"
        >
          {isApiStarted ? "Stop" : "Start"}
        </StyledButton>
        <ClearButton
          variant="contained"
          onClick={() => this.handleClearAll()}
          //color="primary"
        >
          {"Clear"}
        </ClearButton>
      </>
    );
  }

  handleClear = (id, item) => {
    if (item.priority === 1) {
      const data = [...this.state.error];
      data.splice(id, 1);
      this.setState({ error: data });
    } else if (item.priority === 2) {
      const data = [...this.state.warning];
      data.splice(id, 1);
      this.setState({ warning: data });
    } else {
      const data = [...this.state.info];
      data.splice(id, 1);
      this.setState({ info: data });
    }
  };

  render() {
    const { error, warning, info } = this.state;
    return (
      <div className="container">
        <div className="header">{this.renderButton()}</div>
        <div className="content">
          <ErrorCard
            data={error}
            handleClear={this.handleClear}
            message="Error"
          />
          <ErrorCard
            data={warning}
            handleClear={this.handleClear}
            message="Warning"
          />
          <ErrorCard
            data={info}
            handleClear={this.handleClear}
            message="Info"
          />
        </div>
      </div>
    );
  }
}

export default MessageList;
