import { Component } from 'react';
import axios from "../../axios";

class CallbackPage extends Component {
  componentDidMount() {
    this.getLongUrl(this.props.match.params.id);
  }

  getLongUrl = async (id) => {
    this.setState({ loading: true }, () => {
      axios({
        method: 'get',
        url: `api/${id}`,
      })
      .then((response) => {
        window.location.replace(decodeURIComponent(response.data));
      })
      .catch((error) => {
        console.log(error)
        alert(error);
      });
    });
  };
  render() {
    return (
      null
    )
  }
}

export default CallbackPage;
