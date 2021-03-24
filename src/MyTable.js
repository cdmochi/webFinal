//React's stuff
import React from 'react';
import { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { Table } from 'react-bootstrap'

//firebase
import firebase from 'firebase/app'
import 'firebase/firestore'

//data fns
import { format } from 'date-fns'

initFirebase(firebase)
let db = firebase.firestore()
let parkingsRef = db.collection('parkings')

export default function MyTable() {

    //define UIState observered from the ListOfModels
    const [tableRowUIState, setRowUIState] = useState([])

    const query = parkingsRef.orderBy('createdAt', 'asc').limitToLast(100)
    // //push data from js to this
    let [dataCollection] = useCollectionData( query, { idField: `id` })

    useEffect( ()=> {
        if(dataCollection) {
            console.log(dataCollection)
            let uiData = dataCollection.map((item, index)=> {
                return (
                    <CreateRow 
                        data = {  item }
                        id = { dataCollection[index].id }
                    />
                )
            })
            setRowUIState(uiData)
        }

    }, [dataCollection])

    return (
        <div style={{marginLeft: 20+'%', marginRight: 20+'%'}  }>
            <Table striped bordered variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>phone</th>
                        <th>Reason</th>
                        <th>ArriveDate</th>
                        <th>DepartDate</th>
                    </tr>
                </thead>
                <tbody>
                    { tableRowUIState }
                </tbody>
            </Table>
        </div>
    )
}

//UI
function CreateRow(props) {
    let dataModel = props.data
    let id = props.id
    console.log(`props ${dataModel}`)
    return (
        <tr>
            <td>{dataModel.name}</td>
            <td>{dataModel.phone}</td>
            <dt>{dataModel.reason}</dt>
            <td>{format(dataModel.arriveDate.toDate(), "yyyy-MM-dd")}</td>
            <td>{format(dataModel.departDate.toDate(), "yyyy-MM-dd")}</td>
        </tr>
    )
}

function initFirebase(firebase) {
    if (firebase.apps.length === 0) {
        firebase.initializeApp({
            apiKey: process.env.REACT_APP_API_KEY,
            authDomain: process.env.REACT_APP_AUTH_DOMAIN,
            projectId: process.env.REACT_APP_PROJECT_ID,
            storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_APP_ID
        });
    }
}