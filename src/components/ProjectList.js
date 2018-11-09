import React, {Component} from 'react';
import {API} from 'aws-amplify';
import ProjectListDisplay from './ProjectListDisplay'
import {Input} from "semantic-ui-react";

class ProjectList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            filtered: [],
            filter: ''
        };
    }

    async componentDidMount() {
        const response = await API.get('projectsCRUD', '/projects');
        if (response !== {})
            this.setState({projects: response, filtered: response});
    }

    filterList = (e) => {
        this.setState({
            filter: e.target.value
        });
        this.setState({
            filtered: this.state.projects.filter( proj => {
                return proj.managerID.includes(e.target.value) ||
                    proj.managerName.includes(e.target.value) ||
                    proj.title.includes(e.target.value) ||
                    proj.status.includes(e.target.value);
            })
        });
    }

    render(){
        return (
            <div>
                <Input
                    style={{width: '50%'}}
                    icon='search'
                    placeholder='search by project title, manager name/username, status...'
                    onChange={this.filterList}
                />
                <ProjectListDisplay listTitle='All projects' projects = {this.state.filtered}/>
            </div>
        )
    }

}

export default ProjectList;