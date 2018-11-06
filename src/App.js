import React, {Component} from 'react';
import './App.css';
import Amplify, {API, Auth} from 'aws-amplify';
import aws_exports from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import {Navbar, Nav, NavItem} from "react-bootstrap";
import ProjectListAndSearch from './components/projectListAndSearch'

Amplify.configure(aws_exports);

class App extends Component {

    constructor() {
        super();
        this.state = {
            projects: [],
            user: {}
        };
    }

    async componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(user => console.log(user))
            .catch(err => console.log(err));
        const response = await API.get('projectsCRUD', '/projects');
        if (response != {})
            this.setState({ projects: response});
        const userInfo = await Auth.currentAuthenticatedUser();
        this.setState({
            user: {
                username: userInfo.username, //useless, will use cognito identiti and name
                email: userInfo.attributes.email,
                phone: userInfo.attributes.phone_number
            }
        });
    }


    ID = 1;
    post = async () => {
        console.log('calling api');
        const response = await API.post('projectsCRUD', '/projects', {
            body: {
                ID: String(this.ID++),
                status: 'newer',
                developers: ['john', 'bob'],
                title: 'test proj',
                managerName: this.state.user.username //will be name
            }
        });
        alert(JSON.stringify(response, null, 2));
    }
    get = async () => {
        console.log('calling api');
        const response = await API.get('projectsCRUD', '/projects/1');
        alert(JSON.stringify(response, null, 2));
    }
    list = async () => {
        console.log('calling api');
        const response = await API.get('projectsCRUD', '/projects');
        alert(JSON.stringify(response, null, 2));
    }
    del = async () => {
        console.log('calling api');
        const response = await API.del('projectsCRUD', '/projects/1');
        alert(JSON.stringify(response, null, 2));
    }


    render() {
        return (
            <div className="App">
                <Navbar fluid collapseOnSelect>
                    <Nav>
                        <NavItem>Home</NavItem>
                        <NavItem>Profile</NavItem>
                        <NavItem>Projects</NavItem>
                        <NavItem>Developers</NavItem>
                    </Nav>
                </Navbar>

                <div className="col-md-6">
                    <ProjectListAndSearch projects = {this.state.projects}/>

                    <button onClick={this.post}>POST</button>
                    <button onClick={this.get}>GET</button>
                </div>
                <div  className="col-md-6">
                    <button onClick={this.list}>LIST</button>
                </div>
            </div>
        );
    }
}

export default withAuthenticator(App, true);
