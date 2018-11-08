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
        if (response !== {}) {
            this.setState({project: response});
        }
    }

    render(){
        return (
            <div>
                {this.state.project === '{}' ?

                    <h3>The project you are looking for doesn't exist!</h3> :

                    <div>
                        {this.state.project.managerID === this.props.user ?

                            <ProjectSingleSelf project={this.state.project}/> :

                            <ProjectSingleOther project={this.state.project}/>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ProjectSingle;