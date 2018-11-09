import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Divider, List} from 'semantic-ui-react'

class ProjectSingleOther extends Component{

    render(){
        const project = this.props.project;
        const devs = this.props.project.developers;
        return (
            <div style={{padding:'15px'}} align="left">
                <h1>Project Details</h1>
                <Divider/>
                <h2>Title: {project.title}</h2>
                <h2>Manager: <Link to={'/users/' + project.managerID}>{project.managerName}</Link></h2>
                <h2>Status: {project.status}</h2>
                <h2>Developers: </h2>
                <Divider/>
                {(Array.isArray(devs) && devs.length > 0) ?
                    <div>
                        <List bulleted>
                        {devs.map(dev => (
                            <List.Item><h3><Link to={'/users/' + dev}>{dev}</Link></h3></List.Item>
                        ))}
                        </List>
                    </div> :

                    <h3>No devs yet!</h3>
                }
            </div>
        )
    }
}

export default ProjectSingleOther;