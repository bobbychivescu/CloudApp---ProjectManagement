import React, {Component} from 'react';
import {API} from 'aws-amplify';

import ProjectListAndSearch from './projectListAndSearch'

class ProjectList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }

    async componentDidMount() {
        const response = await API.get('projectsCRUD', '/projects');
        if (response !== {})
            this.setState({projects: response});
    }

    render(){
        return (
            <div>
                <div>
                    {/*add a search bar*/}
                    <ProjectListAndSearch projects = {this.state.projects}/>
                </div>
            </div>
        )
    }

}

export default ProjectList;