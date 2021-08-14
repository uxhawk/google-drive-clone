import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
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
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        //check if passwords match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('');
            setLoading(true);
            signup(emailRef.current.value, passwordRef.current.value).then(() => {
                updateDisplayName(displayNameRef.current.value).then(() => {
                    history.push('/');
                }).catch(e => {
                    console.error(e);
                })
            });
        } catch {
            setError('Failed to create an account')
        }
        setLoading(false);
    }
    
    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit} >
                    <Form.Group id='display-name' className='mb-4'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' ref={displayNameRef} required />
                    </Form.Group>
                    <Form.Group id='email' className='mb-4'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password' className='mb-4'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password-confirm' className='mb-4'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Sign Up</Button>
                </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </div>  
        </CenteredContainer>
    )
}
