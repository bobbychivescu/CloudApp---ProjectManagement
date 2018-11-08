import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {FormControl} from 'react-bootstrap';
import ProjectListAndSearch from './projectListAndSearch';
import {v1} from 'uuid';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            newProject: ''
        };
    }

    async componentDidMount() {
        const response = await API.get('projectsCRUD', '/projects');
        if (response !== {})
            this.setState({projects: response});
    }

    handleChange = (e) => {
        this.setState({ newProject: e.target.value });
    }

    create = async () => {
        if(this.state.newProject !== ''){
            const response = await API.post('projectsCRUD', '/projects', {
                body: {
                    ID: v1(),
                    status: 'new',
                    developers: [],
                    title: this.state.newProject,
                    managerName: this.props.user.fullName,
                    managerID: this.props.user.username
                }
            });

        }else{
            alert('Name can\'t be empty!');
        }
    }

    render(){
        return (
            <div>
                <div className="col-md-6">
                    <ProjectListAndSearch projects = {this.state.projects}/>
                    <FormControl
                        type='text'
                        value={this.state.newProject}
                        placeholder='Enter new project name'
                        onChange={this.handleChange}
                    />
                    <button onClick={this.create}>Create New Project</button>
                </div>
                <div className="col-md-6">
                    <button onClick={this.list}>LIST</button>
                </div>
            </div>
        )
    }

}

export default Home;