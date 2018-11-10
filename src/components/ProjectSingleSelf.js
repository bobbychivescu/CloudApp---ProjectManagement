import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Divider, List, Input} from "semantic-ui-react";

class ProjectSingleSelf extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newStatus: '',
            devs: [],
            newDev: ''
        };
    }

    componentDidMount() {
        if(this.props.project.hasOwnProperty('developers'))
            this.setState({devs: this.props.project.developers});
        this.setState({newStatus: this.props.project.status});
    }

    changeStatus = (e) => {
        if(e.target.value === '')
            this.setState({newStatus: this.props.project.status});
        else
            this.setState({ newStatus: e.target.value});
    }

    changeDev = (e) => {
        this.setState({ newDev: e.target.value });
    }

    addDev = async () => {
        if(this.state.newDev === ''){
            alert('Please type something in the textbox before adding');
        } else if(this.state.devs.includes(this.state.newDev)){
            alert('User already added!')
        } else {
            const user = await API.get('usersCRUD', '/users/' + this.state.newDev);
            if(user.hasOwnProperty('username')){ // a valid user
                this.setState({
                    devs: [...this.state.devs, this.state.newDev]
                })
            } else {
                alert('Not a valid user!')
            }
        }
    }

    notifyDevs = async () => {
        this.state.devs.map(async (dev) => {
           const user = await API.get('usersCRUD', '/users/' + dev);
           const text = 'The status of the project "' + this.props.project.title +
               '" has been updated to "' + this.state.newStatus + '"';
           const response = await API.post('email', '/email', {
                body: {
                    to: user.email,
                    subject: 'Project status updated',
                    text: text
                }
            });
           console.log(response);
        });
    }

    validateStatus = () => {
        if(this.state.newStatus !== this.props.project.status){
            this.notifyDevs();
            return true;
        }
        else
            return false;
    }

    notifyNewDevs = async (devs) => {
        devs.map(async (dev) => {
            const user = await API.get('usersCRUD', '/users/' + dev);
            const text = 'You have been added to the project "' + this.props.project.title +
                '" by ' + this.props.project.managerName;
            const response = await API.post('email', '/email', {
                body: {
                    to: user.email,
                    subject: 'You have been added to a project',
                    text: text
                }
            });
            console.log(response);
        })
    }


    validateDevs = () => {
        if(this.props.project.hasOwnProperty('developers')){
            if(this.props.project.developers.length < this.state.devs.length){
                this.notifyNewDevs(this.state.devs.filter(user => {
                    return !this.props.project.developers.includes(user);
                }));
                return true;
            }
            else return false;
        } else {
            if(this.state.devs.length > 0){
                this.notifyNewDevs(this.state.devs);
                return true;
            }

            else
                return false;
        }
    }

    save = async () => {
        if(this.validateStatus() || this.validateDevs()){
            const response = API.put('projectsCRUD', '/projects', {
                body: {
                    ID: this.props.project.ID,
                    status: this.state.newStatus,
                    developers: this.state.devs,
                    title: this.props.project.title,
                    managerName: this.props.project.managerName,
                    managerID: this.props.project.managerID
                }})
            console.log(response);
            alert('Changes persisted!');
        } else {
            alert('You made no changes');
        }
    }

    render(){
        const project = this.props.project;
        const devs = this.state.devs;
        return (
            <div style={{padding:'15px'}} align="left">
                <h1>Project Details</h1>
                <Divider/>
                <h2>Title: {project.title}</h2>
                <h2>Manager: <Link to={'/users/' + project.managerID}>{project.managerName}</Link></h2>
                <h2>Status: <Input size='mini' placeholder={project.status} onChange={this.changeStatus}/></h2>
                <h2>Developers: </h2>
                <Divider/>
                {(devs.length > 0) ?
                    <div>
                        <List bulleted>
                            {devs.map(dev => (
                                <List.Item><h3><Link to={'/users/' + dev}>{dev}</Link></h3></List.Item>
                            ))}
                        </List>
                    </div> :

                    <h3>No devs yet!</h3>
                }
                <Input
                    placeholder='Add by username...'
                    onChange={this.changeDev}
                />
                <Button onClick={this.addDev}>Add Developer</Button>
                <Divider/>
                <Button onClick={this.save}>Save Changes</Button>
            </div>
        )
    }

}

export default ProjectSingleSelf;