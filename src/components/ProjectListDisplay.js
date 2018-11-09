import React, {Component} from 'react';
import {Container, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class ProjectListDisplay extends Component{

    render(){

        return (
            <div>
                <Container style={{padding: 10}}>
                    <h2>{this.props.listTitle}</h2>
                    <Card.Group>
                        {this.props.projects.map(project => (
                            <Card key={project.ID}>
                                <Card.Content textAlign='left'>
                                    <Card.Header><Link to={'/projects/' + project.ID}>{project.title}</Link></Card.Header>
                                    <Card.Meta>{project.status}</Card.Meta>
                                    <Card.Description><Link to={'/users/' + project.managerID}>{project.managerName}</Link></Card.Description>

                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Container>
            </div>
        )
    }
}
