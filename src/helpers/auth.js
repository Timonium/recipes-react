'use strict';
import { connect } from 'react-redux';
import { push } from 'redux-router';

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    componentWillMount () {
      this.checkAuth(this.props.isAuthenticated);
    }
    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth (isAuthenticated) {
      if (!isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props
          .dispatch(push({
            pathname: '/login',
            query: {
              next: redirectAfterLogin
            },
          }));
      }
    }

    render () {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    email: state.auth.email,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}

export function authHeaders(token) {
  return {
    credentials: 'include',
    headers: {
      'jwt': token
    }
  }
}
