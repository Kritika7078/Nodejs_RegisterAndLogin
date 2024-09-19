import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const AdminUpdate = ()=>{
    const [data,setData] = useState({
        username:"",email:"",phone:""
    });

    const params =useParams();
   // console.log("params",params)
    const {authorisationToken} = useAuth();

    const getSingleUserData = async ()=>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
                method:"GET",
                headers:{
                  Authorization:authorisationToken,
                } 
        })

       // console.log(response)
        const data = await response.json();
        console.log(`user single data ${data}`)
        setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    //const data = await response.json()
    useEffect(()=>{
        getSingleUserData();
    },[])

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setData({...data,[name]:value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
                method:"PATCH",
                headers:{
                  "Content-Type":"application/json",
                  Authorization:authorisationToken,
                } ,
                body:JSON.stringify(data)
        }
        
    )
    console.log("response",response)
    if(response.ok){
      toast.success("updated successfully");
    }
    else{
      toast.error(" not updated ");
    }

        } catch (error) {
            console.log(error)
        }
    }

    return(
    
    <section className="section-contact">
        <div className="contact-content container">
            <h1 className="main-heading">Update User Data</h1>
        </div>
        <div className="container grid grid-two-cols">
        <section className="section-form">
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleInput}
            // autoComplete="off"
            required
            placeholder="username"
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleInput}
            placeholder="email"
           // autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">phone</label>
          <input
            type="number"
            name="phone"
            value={data.phone}
            onChange={handleInput}
            //autoComplete="off"
            required
          />
        </div>
       
        <br />
        <button type="submit" className="btn btn-submit">
          update
        </button>
      </form>
    </section>
        </div>
    </section>
    )
    
    
   
}