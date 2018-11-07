import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class ProjectListAndSearch extends Component{

    render(){
        return (
            <div>
            <h2>My Projects</h2>
            <ListGroup>
                {this.props.projects.map(project => (
                    <ListGroupItem>
                        <h3>{project.title}</h3>
                        <h4>Manager: {project.managerName}</h4>
                        <h4>Status: {project.status}</h4>
                    </ListGroupItem>
                ))}
            </ListGroup>
            </div>
        )
    }
}
