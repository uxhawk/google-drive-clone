import React, { useRef, useState } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import {
  Card,
  Elevation,
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Callout,
  Icon,
  Colors,
  Divider,
} from "@blueprintjs/core";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import CenteredContainer from './CenteredContainer';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState(false);
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
          <div className="profile-edit">
            <div style={{ display: "inherit", alignItems: "center" }}>
              <Icon
                icon={"follower"}
                size={40}
                style={{ marginRight: "15px" }}
                color={Colors.DARK_GRAY5}
              />
              <h2 className="bp3-heading">Sign In</h2>
            </div>
          </div>
          {error && (
            <Callout intent={Intent.DANGER} style={{ marginBottom: "20px" }}>
              {error}
            </Callout>
          )}
          <FormGroup
            labelFor="email-input"
            labelInfo="(required)"
            label={"Email"}
          >
            {!error ? (
              <InputGroup
                id="email-input"
                placeholder="Enter email"
                inputRef={emailRef}
                leftIcon={"envelope"}
                disabled={loading}
                type={"email"}
              />
            ) : (
              <InputGroup
                id="email-input"
                placeholder="Enter email"
                inputRef={emailRef}
                leftIcon={"envelope"}
                disabled={loading}
                type={"email"}
                intent={Intent.DANGER}
              />
            )}
          </FormGroup>

          <FormGroup
            labelFor="password-input"
            labelInfo="(required)"
            label={"Password"}
          >
            {!error ? (
              <InputGroup
                id="password-input"
                placeholder="Enter password"
                inputRef={passwordRef}
                leftIcon={"lock"}
                disabled={loading}
              />
            ) : (
              <InputGroup
                id="password-input"
                placeholder="Enter password"
                inputRef={passwordRef}
                leftIcon={"lock"}
                disabled={loading}
                intent={Intent.DANGER}
              />
            )}
          </FormGroup>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
              <Button
                rightIcon={"help"}
                intent={Intent.WARNING}
                loading={loading}
              >
                Forgot Password?
              </Button>
            </Link>
          </div>
          <Divider style={{ marginTop: "20px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            Need an account?
            <Link to="/signup">
              <Button
                rightIcon={"new-person"}
                intent={Intent.PRIMARY}
                loading={loading}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </Card>
      </CenteredContainer>
    );
}
