import React from 'react';
import { Query } from 'react-apollo';
import { USER_LOGIN } from '../../queries/Users';

const Session = Component => props => (
    <Query query={USER_LOGIN}>
        {({loading, error, data, refetch }) => {
            if(loading) return null;
            return <Component {...props } refetch={refetch} session={data} />
        }}
    </Query>
);

export default Session;