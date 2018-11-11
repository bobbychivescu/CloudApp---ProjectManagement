import React, {Component} from 'react';
import {API} from 'aws-amplify';
import ProjectSingleSelf from './ProjectSingleSelf'
import ProjectSingleOther from './ProjectSingleOther'

class ProjectSingle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            project: {}
        };
    }

    async componentDidMount() {
        const response = await API.get('projectsCRUD', '/projects/' + this.props.match.params.id);
        if (response.hasOwnProperty('managerID')) {
            this.setState({project: response});
        }
    }

    render(){
        return (
            <div>
                {Object.keys(this.state.project).length === 0 ?

                    <h3>The project you are looking for doesn't exist!</h3> :

                    <div>
                        {this.state.project.managerID === this.props.user ?

                            <ProjectSingleSelf project={this.state.project}/> :

                            <ProjectSingleOther project={this.state.project} user={this.props.user}/>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ProjectSingle;