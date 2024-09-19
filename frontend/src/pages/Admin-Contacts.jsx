import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const AdminContacts = () => {
  const [contactData,setContactData]=useState([])
  const {authorisationToken} = useAuth();

  const getContactsData= async ()=>{
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`,{
          method:"GET",
          headers:{
            Authorization:authorisationToken,
          } 
  })

  
 // console.log(response)
  const data = await response.json();
    if(response.ok){
      setContactData(data);
    }


  } catch (error) {
      console.log(error)
  }
  }

  const deleteContact= async(id)=>{
   
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
        method:"DELETE",
        headers:{
          Authorization:authorisationToken,
        }
      });
  
      const data = await response.json();
        console.log("user after delete",data)
        if(response.ok){
          getContactsData();
          toast.success("deleted successfully")
        }
        else{
          toast.error("not deleted")
        }
      }
    catch (error) {
      console.log(error)
     
    }}
  

  useEffect(()=>{
    getContactsData();
  },[]);



  return (

    <div >
    <section className='admin-users-section'>
      <div className='container'>
        <h1>Admin Contacts data</h1>
      </div>
      <div className='container admin-users'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {contactData.map((curUser,index)=>{
    return(
      <tr key={index}>
        <td>{curUser.username}</td>
        <td>{curUser.email}</td>
        <td>{curUser.message}</td>
        <td><button onClick={()=>deleteContact(curUser._id)}>Delete</button></td>
      </tr>
    )
  })}
          </tbody>
        </table>
     
      </div>
    </section>
  </div>
  )
}



export default AdminContacts;
