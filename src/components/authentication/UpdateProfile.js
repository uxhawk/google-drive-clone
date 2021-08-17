import React, { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from './CenteredContainer';
import Navbar from '../google-drive/Navbar';
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

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const displayNameRef =  useRef();
    const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

  

    function handleSubmit(e) {
        e.preventDefault();

        //check if passwords match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = [];
        setLoading(true);
        setError('');

        if (displayNameRef.current.value !== currentUser.displayName) {
            promises.push(updateDisplayName(displayNameRef.current.value));
        }
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
                history.push('/user');
            }).catch(() => {
                setError('Failed to update your account');
            }).finally(() => {
                setLoading(false);
            })
    }
    
    return (
      <>
        <Navbar />
        <CenteredContainer>
          <Card elevation={Elevation.THREE}>
            <div className="profile-edit">
              <div style={{ display: "inherit", alignItems: "center" }}>
                <Icon
                  icon={"edit"}
                  size={40}
                  style={{ marginRight: "15px" }}
                  color={Colors.DARK_GRAY5}
                />
                <h2 className="bp3-heading">Edit Profile</h2>
              </div>
            </div>
            {error && <Callout intent={Intent.DANGER}>{error}</Callout>}

            <FormGroup labelFor="user-name" label={"Username"}>
              <InputGroup
                id="user-name"
                placeholder="Enter username"
                inputRef={displayNameRef}
                leftIcon={"mugshot"}
                disabled={loading}
                type={"text"}
                defaultValue={currentUser.displayName}
              />
            </FormGroup>

            <FormGroup labelFor="email" label={"Email"}>
              <InputGroup
                id="email-input"
                placeholder="Enter email address"
                inputRef={emailRef}
                leftIcon={"envelope"}
                disabled={loading}
                type={"text"}
                defaultValue={currentUser.email}
              />
            </FormGroup>

            <FormGroup labelFor="password-input" label={"Password"}>
              <InputGroup
                id="password-input"
                placeholder="Leave blank to keep your current password"
                inputRef={passwordRef}
                leftIcon={"lock"}
                disabled={loading}
                type={"password"}
              />
            </FormGroup>

            <FormGroup labelFor="password-input" label={"Password"}>
              <InputGroup
                id="password-input"
                placeholder="Leave blank to keep your current password"
                inputRef={passwordConfirmRef}
                leftIcon={"lock"}
                disabled={loading}
                type={"password"}
              />
            </FormGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                rightIcon={"person"}
                intent={Intent.SUCCESS}
                loading={loading}
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
              <Link to="/user">
                <Button
                  rightIcon={"disable"}
                  intent={Intent.MINIMAL}
                  loading={loading}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </Card>
        </CenteredContainer>
      </>
    );
}
