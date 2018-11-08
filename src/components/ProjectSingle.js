import React, {Component} from 'react';
import {API, Auth} from 'aws-amplify';
import {Link} from "react-router-dom";
import {FormControl, ListGroupItem} from "react-bootstrap";

class ProjectSingle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            newStatus: '',
            devs: [],
            newDev: '',
            changed: false
        };
    }

    async componentDidMount() {
        const response = await API.get('projectsCRUD', '/projects/' + this.props.match.params.id);
        if (response !== {}) {
            this.setState({project: response});
            this.setState({devs: response.developers})
        }
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
                    ID: this.state.project.ID,
                    status: this.state.newStatus,
                    developers: this.state.devs,
                    title: this.state.project.title,
                    managerName: this.state.project.managerName,
                    managerID: this.state.project.managerID
                }})
            console.log(response);
            alert('Changes persisted!');
        } else {
            alert('You made no changes');
        }
    }

    render(){
        const project = this.state.project;
        const devs = this.state.devs;
        return (
            <div>
                {project === '{}' ?

                    <h3>The project you are looking for doesn't exist!</h3> :

                    <div>
                        <h3>{project.title}</h3>
                        <h4>Manager: <Link to={'/users/' + project.managerID}>{project.managerName}</Link></h4>

                        {project.managerID === this.props.user ?

                            <div>
                                <h5>Status: </h5>
                                <FormControl
                                    type = 'text'
                                    value={this.state.newStatus}
                                    placeholder={this.state.project.status}
                                    onChange={this.changeStatus}
                                />
                            </div>:

                            <h5>Status: {this.state.project.status}</h5>

                        }

                        <h5>Devs: </h5>
                        {(Array.isArray(devs) && devs.length > 0) ?
                            <div>
                                {devs.map(dev => (
                                    <h5><Link to={'/users/' + dev}>{dev}</Link></h5>
                                ))}
                            </div> :

                            <h5>No devs yet!</h5>
                        }

                        {project.managerID === this.props.user ?

                            <div>
                                <FormControl
                                    type = 'text'
                                    value={this.state.newDev}
                                    placeholder={'Add by username...'}
                                    onChange={this.changeDev}
                                />
                                <button onClick={this.addDev}>Add Developer</button>
                                <button onClick={this.save}>Save</button>
                            </div> :

                            <div></div>
                        }



                    </div>
                }
            </div>
        )
    }

}

export default ProjectSingle;