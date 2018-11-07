import React, {Component} from 'react';
import {API} from 'aws-amplify';

import ProjectListAndSearch from './projectListAndSearch'

class Home extends Component{
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


    ID = 1;
    post = async () => {
        console.log('calling api');
        const response = await API.post('projectsCRUD', '/projects', {
            body: {
                ID: String(this.ID++),
                status: 'newer',
                developers: ['john', 'bob'],
                title: 'test proj',
                managerName: this.state.user.username //will be name
            }
        });
        alert(JSON.stringify(response, null, 2));
    }
    get = async () => {
        console.log('calling api');
        const response = await API.get('projectsCRUD', '/projects/1');
        alert(JSON.stringify(response, null, 2));
    }
    list = async () => {
        console.log('calling api');
        const response = await API.get('projectsCRUD', '/projects');
        alert(JSON.stringify(response, null, 2));
    }
    del = async () => {
        console.log('calling api');
        const response = await API.del('projectsCRUD', '/projects/1');
        alert(JSON.stringify(response, null, 2));
    }



    render(){
        return (
            <div>
                <div className="col-md-6">
                    <ProjectListAndSearch projects = {this.state.projects}/>

                    <button onClick={this.post}>POST</button>
                    <button onClick={this.get}>GET</button>
                </div>
                <div className="col-md-6">
                    <button onClick={this.list}>LIST</button>
                </div>
            </div>
        )
    }

}

export default Home;