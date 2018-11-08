import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default class ProjectListDisplay extends Component{

    render(){
        return (
            <div>
            <h2>{this.props.listTitle}</h2>
            <ListGroup>
                {this.props.projects.map(project => (
                    <ListGroupItem>
                        <h3><Link to={'/projects/' + project.ID}>{project.title}</Link></h3>
                        <h4>Manager: <Link to={'/users/' + project.managerID}>{project.managerName}</Link></h4>
                        <h4>Status: {project.status}</h4>
                    </ListGroupItem>
                ))}
            </ListGroup>
            </div>
        )
    }
}
