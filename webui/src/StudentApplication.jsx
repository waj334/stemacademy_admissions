import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Segment, Container, Button, Header, Grid, Divider, Step, Icon, Form} from 'semantic-ui-react';

import FormStepGroup from './FormStepGroup.jsx';
import StudentInfoForm from './StudentInfoForm.jsx';
import ParentInfoForm from './ParentInfoForm.jsx';
import HighSchoolInfoForm from './HighSchoolInfoForm.jsx';
import StudentConfirmationForm from './StudentConfirmationForm.jsx';
import ApplicationSubmittedPage from './ApplicationSubmittedPage.jsx';

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 0,
            progress: 0,
            data: [
                {
                    fname: '',
                    lname: '',
                    age: '',
                    gender: '',
                    ethnicity: '',
                    citizenship: '',
                    email: '',
                    phone_no: '',
                    street_addr: '',
                    city: '',
                    state: '',
                    zip: '',
                },
                {
                    pg_fname: '',
                    pg_lname: '',
                    pg_phone_no: '',
                    pg_email: '',
                },
                {
                    hs_name: '',
                    hs_county: '',
                    hs_phone_no: '',
                    hs_street_addr: '',
                    hs_city: '',
                    hs_state: '',
                    hs_zip: '',
                }
            ]
        }

        this.onStepToggle = this.onStepToggle.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onCommit = this.onCommit.bind(this);
    }

    onCommit(id, data){
        var newState = this.state;

        newState.data[id] = data;
        this.setState(newState);
    }

    onStepToggle(id) {
        console.log(id, 'activated');
        this.setState(prev => ({
            current: id,
            progress: prev.progress,
            data: prev.data
        }))
    }

    onNext() {
        var newState = this.state;
        this.setState(prev => {

            newState.current = prev.current < (this.props.steps.length-1) ? prev.current+1:prev.current;
            newState.progress = prev.current == prev.progress ? ++prev.progress:prev.progress;

            return newState;
        });
    }

    render() {
        return (
        <div>
            <Segment basic padded>
                <Header textAlign='center' size='huge'>Student Application</Header>
            </Segment>
            <Segment basic>
                <FormStepGroup steps={this.props.steps} onStepToggle={this.onStepToggle} current={this.state.current} progress={this.state.progress}/>
            </Segment>
            <Segment basic>
                <Container>
                    {this.props.steps[this.state.current].page != null ? React.createElement(this.props.steps[this.state.current].page, 
                            {
                                data: this.state.data, 
                                onCommit:this.onCommit, 
                                id:this.state.current,
                                onNext:this.onNext
                                },
                                null):<div/>
                    }
                </Container>
            </Segment>
            <Segment basic padded>
                <Container textAlign='center'>
                    (C) Department of Computer Science, Tuskegee University.
                </Container>
            </Segment>
        </div>   
    )}
}

const steps = [
    {key: 0, icon:'user', title:'Contact Information', desc:'Please provide a valid contact.', page:StudentInfoForm},
    {key: 1, icon:'info', title:'Parent/Guardian Contact Information', desc:'Please provide your parent/guardian information.', page:ParentInfoForm},
    {key: 2, icon:'university', title:'High School Information', desc:'Where do you attend school?', page:HighSchoolInfoForm},
    {key: 3, icon:'help', title:'Confirm', desc:'Is this correct?', page:StudentConfirmationForm},
    {key: 4, icon:'checked calendar', title:'Submitted', desc:'Your application has been submitted', page:ApplicationSubmittedPage},
]

const StudentApplication = () => (
    <div>
        <Application steps={steps} />
    </div>
);

export default StudentApplication;