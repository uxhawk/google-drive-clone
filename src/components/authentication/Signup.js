import React, { useRef, useState } from 'react';
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
} from '@blueprintjs/core';
import "@blueprintjs/core/lib/css/blueprint.css";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef = useRef();
  const { signup, updateDisplayName } = useAuth();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const history = useHistory();


    function handleChange() {
      if (
        emailRef.current.value !== "" &&
        displayNameRef.current.value !== "" &&
        passwordRef.current.value !== "" &&
        passwordConfirmRef.current.value !== ""
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        //check if passwords match
        if (
          passwordRef.current.value !== passwordConfirmRef.current.value
        ) {
          return setError("Passwords do not match");
        } else if (passwordRef.current.value === '' ) {
          return setError("Please set a password");
        }
          try {
            setError("");
            setLoading(true);
            signup(emailRef.current.value, passwordRef.current.value).then(
              () => {
                updateDisplayName(displayNameRef.current.value)
                  .then(() => {
                    history.push("/");
                  })
              }
            ).catch((e) => {
              console.log(e.code);

              if (e.code === 'auth/invalid-email') {
                console.log('same same')
              }
              (e.code ==='auth/invalid-email' ?
              setError("Please enter a valid email address")
              : setError("Failed to create an account"))
              
              setLoading(false);
            });
          } catch {
            //setError("Failed to create an account");
          }
  }

  return (
    <CenteredContainer>
      <Card elevation={Elevation.THREE}>
        <div className="profile-edit">
          <div style={{ display: "inherit", alignItems: "center" }}>
            <Icon
              icon={"new-person"}
              size={40}
              style={{ marginRight: "15px" }}
              color={Colors.DARK_GRAY5}
            />
            <h2 className="bp3-heading">Sign Up</h2>
          </div>
        </div>
        {error && (
          <Callout intent={Intent.DANGER} style={{ marginBottom: "20px" }}>
            {error}
          </Callout>
        )}
        <FormGroup
          labelFor="user-name"
          labelInfo="(required)"
          label={"Username"}
        >
          <InputGroup
            id="user-name"
            placeholder="Enter username"
            inputRef={displayNameRef}
            leftIcon={"mugshot"}
            disabled={loading}
            type={"text"}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup labelFor="email" labelInfo="(required)" label={"Email"}>
          <InputGroup
            id="email-input"
            placeholder="Enter email address"
            inputRef={emailRef}
            leftIcon={"envelope"}
            disabled={loading}
            type={"text"}
            onChange={handleChange}
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
            inputRef={passwordRef}
            leftIcon={"lock"}
            disabled={loading}
            type={"password"}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup
          labelFor="password-confirm-input"
          labelInfo="(required)"
          label={"Confirm Password"}
        >
          <InputGroup
            id="password-confirm-input"
            placeholder="Re-enter password"
            inputRef={passwordConfirmRef}
            leftIcon={"lock"}
            disabled={loading}
            type={"password"}
            onChange={handleChange}
          />
        </FormGroup>

        <Button
          intent={Intent.SUCCESS}
          rightIcon={"new-person"}
          onClick={handleSubmit}
          loading={loading}
          disabled={disabled}
        >
          Sign Up
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
          Already have an account?
          <Link to="/login">
            <Button
              rightIcon={"log-in"}
              intent={Intent.PRIMARY}
              loading={loading}
            >
              Sign In
            </Button>
          </Link>
        </div>
      </Card>
    </CenteredContainer>
  );
}
