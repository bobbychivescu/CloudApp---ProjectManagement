import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProjectSingleOther extends Component{

    render(){
        const project = this.props.project;
        const devs = this.props.project.developers;
        return (
            <div>
                <h3>{project.title}</h3>
                <h4>Manager: <Link to={'/users/' + project.managerID}>{project.managerName}</Link></h4>
                <h5>Status: {project.status}</h5>
                <h5>Devs: </h5>
                {(Array.isArray(devs) && devs.length > 0) ?
                    <div>
                        {devs.map(dev => (
                            <h5><Link to={'/users/' + dev}>{dev}</Link></h5>
                        ))}
                    </div> :

                    <h5>No devs yet!</h5>
                }
            </div>
        )
    }
}

export default ProjectSingleOther;