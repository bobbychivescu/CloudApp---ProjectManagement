import React, {Component} from 'react';
import {API} from 'aws-amplify';
import {Button} from 'react-bootstrap';
import ProjectListDisplay from './ProjectListDisplay';
import {v1} from 'uuid';
import {Input} from "semantic-ui-react";

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
            const id = v1();
            const response = await API.post('projectsCRUD', '/projects', {
                body: {
                    ID: id,
                    status: 'new',
                    developers: [],
                    title: this.state.newProject,
                    managerName: this.props.user.fullName,
                    managerID: this.props.user.username
                }
            });
            console.log(response);
            this.props.history.push('/projects/' + id);
        }else{
            alert('Name can\'t be empty!');
        }
    }

    sendMail = async () => {
        const resp = API.post('email', '/email', {
            body: {
                to: 'bobbychivescu@yahoo.com',
                subject: 'mare subiect de-i tituie',
                text: 'n-am facut numic sefu'
            }
        });
        console.log(resp)
    }

    render(){
        return (
            <div>
                <div className="col-md-6">
                    <ProjectListDisplay listTitle='My Projects' projects={
                        this.state.projects.filter(proj => {
                            return proj.managerID === this.props.user.username;
                        })}/>
                    <Input
                        placeholder='Enter new project name'
                        onChange={this.handleChange}
                    />
                    <Button onClick={this.create}>Create New Project</Button>
                </div>
                <div className="col-md-6">
                    <ProjectListDisplay listTitle='Other Projects' projects={
                        this.state.projects.filter(proj => {
                            return proj.developers.includes(this.props.user.username);
                        })}/>
                    <Button onClick={this.sendMail}>SendMail</Button>
                </div>
            </div>
        )
    }

}

export default Home;