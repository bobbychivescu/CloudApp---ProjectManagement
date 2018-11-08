import React, {Component} from 'react';
import './App.css';
import Amplify, {API, Auth} from 'aws-amplify';
import aws_exports from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Route, Switch, Link} from 'react-router-dom'
import Home from './components/Home'
import ProjectList from './components/ProjectList'
import ProjectSingle from './components/ProjectSingle'
import UserList from './components/UserList'
import UserSingle from './components/UserSingle'

Amplify.configure(aws_exports);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }

    async componentDidMount() {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userFromDB = await API.get('usersCRUD', '/users/' + userInfo.username);
        //first login
        console.log(JSON.stringify(userFromDB));
        if (!userFromDB.hasOwnProperty('username')){
            while(!this.state.user.hasOwnProperty('username')){
                const name = prompt('This is your first login. Please provide your full name to complete registration');
                if(name !== null)
                    this.setState({
                        user: {
                            username: userInfo.username,
                            email: userInfo.attributes.email,
                            phone: userInfo.attributes.phone_number,
                            fullName: name
                        }
                    });
            }
            const resp = await API.post('usersCRUD', '/users', {
                body: this.state.user
            });
            console.log('after posting user:' + JSON.stringify(resp));
        }else{
            this.setState({
                user: userFromDB
            });
        }

        console.log('Current user: ' + JSON.stringify(this.state.user));
    }

    signOut = () => {
        Auth.signOut().then(() => {
            this.props.onStateChange('SignedOut');
        });
    }

    render() {
        const profile = "/users/" + this.state.user.username;
        const Projects = () => (
            <Switch>
                <Route exact path='/projects' component={ProjectList}/>
                <Route path='/projects/:id' render={(props) => <ProjectSingle {...props} user={this.state.user.username}/>}/>
            </Switch>
        )
        const Users = () => (
            <Switch>
                <Route exact path='/users' component={UserList}/>
                <Route path='/users/:id' render={(props) => <UserSingle {...props} user={this.state.user.username}/>}/>
            </Switch>
        )
        return (
            <div className="App">
                <Navbar fluid collapseOnSelect>
                    <Nav>
                        <NavItem><Link to="/">Home</Link></NavItem>
                        <NavItem><Link to={profile}>Profile</Link></NavItem>
                        <NavItem><Link to="/projects">Projects</Link></NavItem>
                        <NavItem><Link to="/users">Developers</Link></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={this.signOut}>Log out</NavItem>
                    </Nav>
                </Navbar>

                <Switch>
                    <Route exact path='/' render={() => <Home {...this.props} user={this.state.user}/>}/>
                    <Route path='/projects' component={Projects}/>
                    <Route path='/users' component={Users}/>
                    <Route path='*' component={() => <div><h1>404 Not Found!</h1></div>}/>
                </Switch>

            </div>
        );
    }
}

export default withAuthenticator(App);
