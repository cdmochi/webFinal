import React, { Component } from 'react'
import Select from 'react-select'
import { Button, Form, Col, Row } from 'react-bootstrap';

//form
import { format } from 'date-fns'
import { useForm } from "react-hook-form"

//firebase 
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//react hooks

initFirebaseSetting(firebase)
let db = firebase.firestore()

let parkingsRef = db.collection('parkings')
let query = parkingsRef.orderBy('createdAt')

export default function ParkingRequest() {
    // const { formSubmit, handleSubmit } = useForm()
    const { register, handleSubmit } = useForm()

    return (

        <div style={{ marginLeft: 5 + '%', marginTop: 5 + '%' }}>
            <form onSubmit = {handleSubmit(onParkingFormUploadListener)}>

                <Row>
                    <Col>
                        <label style={{marginRight: 10}} htmlFor="arrivalTime">Arrival Time</label>
                        <input
                            type="date"
                            placeholder="Date"
                            name="arrivalDate"
                            id="arrivalDate"
                            ref={register({ required: true })}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label style={{marginRight: 10}} htmlFor="departTime">Departure Time</label>
                        <input
                            ref={register({ required: true })}
                            type="date"
                            placeholder="Date"
                            name="departDate"
                            id="departDate"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label style={{marginRight: 10}} htmlFor="name">Name</label>
                        <input
                            id="name"
                            ref={register({ required: true })}
                            name="name"
                            placeholder="Name"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label style={{marginRight: 10}} htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            ref={register({ required: true })}
                            placeholder="Phone Number"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <label style={{marginRight: 10}} htmlFor="phoneNumber">Reason</label>
                        <input
                            id="reason"
                            name="reason"
                            ref={register({ required: true })}
                            placeholder="Your Reason..."
                        />
                    </Col>
                </Row>

                <Row>
                    <Button onClick={onModalFormSubmit(handleSubmit, onParkingFormUploadListener)} variant={"primary"} type="submit">
                        Submit
                </Button>
                </Row>

            </form>
        </div>
    )
}

//called from submitClicked
function onFormSubmit() {
    console.log("form submit is called")
}

const onParkingFormUploadListener = async (data) => {
    console.log("onParkingRequestListner running")
    let preparedData = {
        name: data.name,
        phone: data.phoneNumber,
        reason: data.reason,
        arriveDate: new Date(data.arrivalDate),
        departDate: new Date(data.departDate),
        createdAt: new Date()
    }
    console.log(JSON.stringify(preparedData))
    if (data.name != undefined && data.phone != undefined || data.reason != undefined) {
        console.log("start")
        await parkingsRef
            .add(preparedData).then(() => console.log("data is added to firestore"))
            .catch((error) => {
                console.error("Errror:", error)
                alert(error)
            })
        alert("Your request sucessfully sented")
    }
}

function onModalFormSubmit(handleSubmit, onParkingFormUploadListener) {
    handleSubmit(onParkingFormUploadListener)
}

function initFirebaseSetting(firebase) {
    if (firebase.apps.length === 0) {
    var firebaseConfig = {
        apiKey: "AIzaSyCCPHKLJ9bmtKjiDc6tPxXceikCIzViFJ4",
        authDomain: "reactfinal-5258d.firebaseapp.com",
        projectId: "reactfinal-5258d",
        storageBucket: "reactfinal-5258d.appspot.com",
        messagingSenderId: "462072312042",
        appId: "1:462072312042:web:83f8b316edbda3061a6793"
    }
    firebase.initializeApp(firebaseConfig)
    }
}
