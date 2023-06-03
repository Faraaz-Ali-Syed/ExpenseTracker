import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

const UpdatProfilePage = () => {
  const token=useSelector(state=>state.auth.idToken);

 const [fullName,setFullName]=useState('');
 const [photoUrl,setPhotoUrl]=useState('')
  
  
  const nameInputRef=useRef();
  const photoInputRef=useRef();

  useEffect(()=>{
    async function getData(){
      try{
        const response=await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyChWUSHd-NX-mtmFai1XcEx55r4eWuhDZ4',{
            idToken:token
        })
       setFullName(response.data.users[0].displayName)
       setPhotoUrl(response.data.users[0].photoUrl)
    }catch(error){
        console.log(error.response.data.error.message)
    }
    }
    getData()
  },[token])
  
  
  const updateProfileHandler=async(event)=>{
    event.preventDefault()
    const enteredName=nameInputRef.current.value
    const enteredPhoto=photoInputRef.current.value
    // const token=localStorage.getItem('token')
    
    try{
      const response= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyChWUSHd-NX-mtmFai1XcEx55r4eWuhDZ4',{
                idToken:token,
                displayName:enteredName,
                photoUrl:enteredPhoto,
                returnSecureToken:true
              })
              console.log(response)
              alert('Done')
            }catch(error){
              console.log(error)
            }
          }
          return (
            <Container className="mt-5">
      <Form onSubmit={updateProfileHandler}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Full Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" ref={nameInputRef} defaultValue={fullName} required/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Profile Photo URL
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" ref={photoInputRef}  defaultValue={photoUrl} required />
          </Col>
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default UpdatProfilePage;