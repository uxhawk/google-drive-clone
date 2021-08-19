import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';
import "@blueprintjs/core/lib/css/blueprint.css";

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

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage(`Check ${emailRef.current.value} for password reset instructions`);
        } catch {
            setError(`No account found for ${emailRef.current.value}`);
        }
        setLoading(false);
    }
    
    return (
      <CenteredContainer>
        <Card elevation={Elevation.THREE}>
          <div className="profile-edit">
            <div style={{ display: "inherit", alignItems: "center" }}>
              <Icon
                icon={"lock"}
                size={40}
                style={{ marginRight: "15px" }}
                color={Colors.DARK_GRAY5}
              />
              <h2 className="bp3-heading">Reset Password</h2>
            </div>
          </div>
          {error && (
            <Callout intent={Intent.DANGER} style={{ marginBottom: "20px" }}>
              {error}
            </Callout>
          )}
          {message && (
            <Callout intent={Intent.SUCCESS} style={{ marginBottom: "20px" }}>
              {message}
            </Callout>
          )}

          <FormGroup
            labelFor="email-input"
            labelInfo="(required)"
            label={"Email"}
          >
            <InputGroup
              id="email-input"
              placeholder="Enter email"
              inputRef={emailRef}
              leftIcon={"envelope"}
              disabled={loading}
              type={"email"}
            />
          </FormGroup>
          <Button
            intent={Intent.WARNING}
            rightIcon={"lock"}
            onClick={handleSubmit}
            loading={loading}
          >
            Reset Password
          </Button>

          <Divider style={{ marginTop: "20px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Link to="/login">
              <Button
                rightIcon={"log-in"}
                intent={Intent.SUCCESS}
                loading={loading}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/login">
              <Button
                rightIcon={"new-person"}
                intent={Intent.SUCCESS}
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
