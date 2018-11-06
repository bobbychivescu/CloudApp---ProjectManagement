import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class ProjectListAndSearch extends Component{

    constructor(props) {
        super(props);

        // this.state = {
        //     isLoading: true,
        //     projects: []
        // };
    }

    render(){
        const projects = this.props.projects;
        return (
            <div className="ProjectList">
            <h2>My Projects</h2>
            <ListGroup>
                {projects.map(project => (
                    <ListGroupItem>
                        <h3>{project.ID}</h3>
                        <h4>Manager: {project.managerName}</h4>
                        <h4>Status: {project.status}</h4>
                    </ListGroupItem>
                ))}
            </ListGroup>
            </div>
        )
    }
}
