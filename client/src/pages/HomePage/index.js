import React, { Component } from 'react';
import axios from "../../axios";
import ClipboardJS from 'clipboard/dist/clipboard.min';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl : '',
      shortUrl : 'Get your link here',
    };
    this.clip = new ClipboardJS('#copyBtn');
    this.clip.on('success', e => e.clearSelection());
  }

  getShortUrl = async () => {
    this.setState({ loading: true }, () => {
      axios({
        method: 'post',
        url: `api/add/${encodeURIComponent(this.state.longUrl)}`,
      })
      .then((response) => {
        this.setState({
          shortUrl: `${window.location.origin}/${response.data}`
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
    });
  };

  setLongURL(url) {
    this.setState({
      longUrl: url
    });
  }
  render() {
    return (
      <div className="App">
        <div>
            <textarea
              name="urlInput"
              rows="4"
              onChange={e => this.setLongURL(e.target.value)}
              value={this.state.longUrl}
              placeholder="Paste your link here"
            />
          <input id="foo" value={this.state.shortUrl} />
          <button
            id="copyBtn"
            data-clipboard-target="#foo"
          >
            Copy To Clipboard
          </button>
          <button
            className="more"
            onClick={this.getShortUrl}>
            Tiny me !!!
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
