import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, {API} from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(aws_exports);

class App extends Component {

    post = async () => {
        console.log('calling api');
        const response = await API.post('lambdas', '/items', {
            body: {
                ID: '1',
                status: 'new'
            }
        });
        alert(JSON.stringify(response, null, 2));
    }
    get = async () => {
        console.log('calling api');
        const response = await API.get('lambdas', '/items/object/1');
        alert(JSON.stringify(response, null, 2));
    }
    list = async () => {
        console.log('calling api');
        const response = await API.get('lambdas', '/items/1');
        alert(JSON.stringify(response, null, 2));
    }


    render() {
    return (
      <div className="App">
        <header className="App-header">
            <button onClick={this.post}>POST</button>
            <button onClick={this.get}>GET</button>
            <button onClick={this.list}>LIST</button>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
