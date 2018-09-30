import React, { Component } from 'react';
import Layout from 'antd/lib/layout';
import axios from '../../axios';
import Input from 'antd/lib/input';
import message from 'antd/lib/message';
import ClipboardJS from 'clipboard/dist/clipboard.min';
import Button from '../../components/Button';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const { Header, Footer, Content } = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl : '',
      shortUrl : 'Get your link here',
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
      <Layout>
        <Header>
          <SiteHeader/>
        </Header>
        <Content className="content">
          <div className="shorten">
            <div className="constrain">
              <h1>Transform your long link into tiny one :)</h1>
              <div>
                <Input
                  name="urlInput"
                  onChange={e => this.setLongURL(e.target.value)}
                  value={this.state.longUrl}
                  placeholder="Paste your link here"
                  className="inputLong"
                />
                <Button
                  className="tinyMeBtn"
                  onClick={this.getShortUrl}
                  text="Tiny me !!!"
                />
              </div>
              <div className="tagline">
                All tiny.me URLs are public and can be accessed by anyone
              </div>
            </div>
          </div>
          <div className="shortenResult">
            <div className="constrain">
              <h1>Your Tiny URL: </h1>
              <div>
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
            </div>
          </div>
        </Content>
        <Footer>
          <SiteFooter />
        </Footer>
      </Layout>
    );
  }
}

export default HomePage;
