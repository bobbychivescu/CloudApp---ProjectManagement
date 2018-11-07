import React, {Component} from 'react';
import {API} from 'aws-amplify';

class ProjectSingle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            project: {},
        };
    }

    async componentDidMount() {
        const response = await API.get('projectsCRUD', '/projects/' + this.props.match.params.id);
        if (response !== {})
            this.setState({project: response});
    }

    render(){
        const project = JSON.stringify(this.state.project);
        return (
            <div>
                {project === '{}' ?

                    <h3>The project you are looking for doesn't exist!</h3> :

                    <h3>{project}</h3>
                }
            </div>
        )
    }

}

export default ProjectSingle;