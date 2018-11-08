import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Link} from "react-router-dom";
import {FormControl} from "react-bootstrap";

class ProjectSingleSelf extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newStatus: '',
            devs: [],
            newDev: '',
            changed: false
        };
    }

    componentDidMount() {
        this.setState({devs: this.props.project.developers})
    }

    changeStatus = (e) => {
        this.setState({ newStatus: e.target.value, changed: true });
    }

    changeDev = (e) => {
        this.setState({ newDev: e.target.value });
    }

    addDev = async () => {
        if(this.state.devs.includes(this.state.newDev)){
            alert('User already added!')
        } else {
            const user = await API.get('usersCRUD', '/users/' + this.state.newDev);
            if(user.hasOwnProperty('username')){ // a valid user
                this.setState({
                    devs: [...this.state.devs, this.state.newDev],
                    changed: true
                })
            } else {
                alert('Not a valid user!')
            }
        }
    }

    save = async () => {
        if(this.state.changed){
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
            <div>
                <h3>{project.title}</h3>
                <h4>Manager: <Link to={'/users/' + project.managerID}>{project.managerName}</Link></h4>

                <h5>Status: {project.status}</h5>
                <FormControl
                    type = 'text'
                    value={this.state.newStatus}
                    placeholder='new status...'
                    onChange={this.changeStatus}
                />

                <h5>Devs: </h5>
                {(Array.isArray(devs) && devs.length > 0) ?
                    <div>
                        {devs.map(dev => (
                            <h5><Link to={'/users/' + dev}>{dev}</Link></h5>
                        ))}
                    </div> :

                    <h5>No devs yet!</h5>
                }
                <FormControl
                    type = 'text'
                    value={this.state.newDev}
                    placeholder={'Add by username...'}
                    onChange={this.changeDev}
                />
                <button onClick={this.addDev}>Add Developer</button>

                <button onClick={this.save}>Save</button>
            </div>
        )
    }

}

export default ProjectSingleSelf;