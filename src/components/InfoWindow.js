import React, { Component } from "react";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <h2>
            This is an info window
          </h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae finibus dui. Curabitur facilisis consectetur eros sit amet pharetra. Ut vitae lacinia leo. Vestibulum quis aliquam erat. Sed et interdum nibh. Sed dignissim luctus risus quis molestie. Praesent sit amet feugiat orci. Pellentesque vulputate dictum magna, a hendrerit elit sollicitudin.
          </p>
        </div>
      </div>
    );
  }
}