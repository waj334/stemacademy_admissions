import React from 'react';
import AdminLogin from './AdminLogin.jsx';

import {Container, Header, Segment} from 'semantic-ui-react';

const LoginPage = () => (
    <div>
        <Segment padded basic>
            <Header textAlign='center'>Admin Interface</Header>
        </Segment>

        <Container>
            <AdminLogin />
        </Container>
    </div>
)

export default LoginPage;