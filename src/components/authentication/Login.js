import React, { useRef, useState } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Card, Elevation, Button, FormGroup, InputGroup, Intent, Callout } from "@blueprintjs/core";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to sign in')
        }
        setLoading(false);
    }
    
    return (
      <CenteredContainer>
        <Card elevation={Elevation.THREE}>
          <h2 className="bp3-heading">Sign In</h2>
          {error && <Callout intent={Intent.DANGER}>{error}</Callout>}
          <FormGroup
            labelFor="email-input"
            labelInfo="(required)"
            label={"Email"}
          >
            <InputGroup
              id="email-input"
              placeholder="Enter email"
              ref={emailRef}
              leftIcon={"envelope"}
            />
          </FormGroup>

          <FormGroup
            labelFor="password-input"
            labelInfo="(required)"
            label={"Password"}
          >
            <InputGroup
              id="password-input"
              placeholder="Enter password"
              ref={passwordRef}
              leftIcon={"lock"}
              type={'password'}
            />
          </FormGroup>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Button
              intent={Intent.SUCCESS}
              rightIcon={"log-in"}
              onClick={handleSubmit}
            //   disabled={loading}
              loading={loading}
            >
              Sign In
            </Button>
            <Link to="/forgot-password">
              <Button rightIcon={"help"} intent={Intent.WARNING}>
                Forgot Password?
              </Button>
            </Link>
          </div>
        </Card>
        <div className="w-100 text-center my-2 mx-2">
          Need an account?
          <Link to="/signup">
            <Button rightIcon={"new-person"} intent={Intent.PRIMARY}>
              Sign Up
            </Button>
          </Link>
        </div>
      </CenteredContainer>
    );
}
