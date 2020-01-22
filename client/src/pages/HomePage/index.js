import React, { Component } from 'react';
import axios from '../../axios';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import ClipboardJS from 'clipboard/dist/clipboard.min';
import TinyButton from '../../components/TinyButton';
import styles from './HomePage.module.css';
import LinkInput from "../../components/LinkInput";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: '',
      shortUrl: 'Get your link here',
    };
    this.clip = new ClipboardJS('#copyBtn');
    this.clip.on('success', e => {
      e.clearSelection();
      message.success('Copied');
    });
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
      <div className={styles.background}>
        <LinkInput
          name="urlInput"
          onChange={e => this.setLongURL(e.target.value)}
          value={this.state.longUrl}
          placeholder="Paste your link here"
          className="inputLong"
        />
        <TinyButton
          onClick={this.getShortUrl}
          text="Tiny me"
        />
        <Input
          id="foo"
          value={this.state.shortUrl}
          className="inputLong"
        />
        <button
          id="copyBtn"
          data-clipboard-target="#foo"
          className="tinyMeBtn"
        >
          COPY
                </button>
      </div>
    );
  }
}

export default HomePage;
