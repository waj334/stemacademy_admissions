import React from 'react';
import AdminLogin from './AdminLogin.jsx';

import {Container, Header, Segment} from 'semantic-ui-react';

const LoginPage = (history) => (
    <div>
        <Segment padded basic>
            <Header textAlign='center'>Admin Interface</Header>
        </Segment>

        <Container>
            <AdminLogin history={history} />
        </Container>
    </div>
)

export default LoginPage;