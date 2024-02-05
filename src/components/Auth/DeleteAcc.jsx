import React, { useContext } from 'react'
import firebaseContext from '../App'  
function DeleteAcc() {
  const firebase = useContext( firebaseContext );
    console.log(firebase);
  return (
    <div>{} DeleteAcc</div>
  )
}

export default DeleteAcc