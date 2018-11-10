import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Divider, List} from 'semantic-ui-react';
import {Button} from 'react-bootstrap';
import {API} from 'aws-amplify';

class ProjectSingleOther extends Component{


    requestJoin = async () => {
        const manager = await API.get('usersCRUD', '/users/' + this.props.project.managerID);
        const text = 'The developer with username "' + this.props.user + '" has requested to join your project, "' +
            this.props.project.title + '". If you accept this request, please add them to your project.'
        const resp = await API.post('email', '/email', {
            body: {
                to: manager.email,
                subject: 'Request to join project',
                text: text
            }
        });
        console.log(resp)
        alert('An email with your request has been sent to the manager of this project!');
    }

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
                {(!Array.isArray(devs) || !devs.includes(this.props.user)) ?
                    <div>
                        <Divider/>
                        <Button onClick={this.requestJoin}>Request to join this project</Button>
                    </div> :

                    <div></div>
                }
            </div>
        )
    }
}

export default ProjectSingleOther;