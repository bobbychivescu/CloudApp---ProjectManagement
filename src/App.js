import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Amplify, {API} from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(aws_exports);

class App extends Component {

    ID = 1;
    post = async () => {
        console.log('calling api');
        const response = await API.post('projectsCRUD', '/projects', {
            body: {
                ID: String(this.ID++),
                status: 'new',
                manager: 'someone',
                developers: ['john', 'bob']
            }
        });
        alert(JSON.stringify(response, null, 2));
    }
    get = async () => {
        console.log('calling api');
        const response = await API.get('projectsCRUD', '/projects/object/1');
        alert(JSON.stringify(response, null, 2));
    }
    list = async () => {
        console.log('calling api');
        const response = await API.get('projectsCRUD', '/projects');
        alert(JSON.stringify(response, null, 2));
    }
    del = async (ID) => {
        console.log('calling api');
        const response = await API.del('projectsCRUD', '/projects/object/1');
        alert(JSON.stringify(response, null, 2));
    }


    render() {
    return (
      <div className="App">
        <header className="App-header">
            <button onClick={this.post}>POST</button>
            <button onClick={this.get}>GET</button>
            <button onClick={this.list}>LIST</button>
            <button onClick={this.del}>LIST</button>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
