import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import userContext from "../../context/user/userContext";

const CreateUser = () => {
  let navigate = useNavigate();
  const contextApi = useContext(userContext);
  const users = contextApi.users;
const [formData,setFormData] = useState({
    username:'',
    emailid:'',
    mobileNumber:'',
    age:''
});
const {id} = useParams();
const handleChange = (e) => {
    e.preventDefault();
    setFormData({...formData , [e.target.name]: e.target.value});
}
const {username, emailid, mobileNumber, age} = formData;
  const url = "https://62398c5863fdd477ac146911.mockapi.io/api/users/users";

  const postData = (e) => {
    document.getElementById("editSave").disabled = true;

    e.preventDefault();
    console.log(formData);
    contextApi.userStateLoaded = false;
    if (id) {
        contextApi.handleEdit(formData, id);
      } else {
        contextApi.handleSave(formData);
      }
      
  };

  useEffect(() => {
    if (id) {
      if(users) {
        const dataItem = users.filter((item)=> {
          return item.id === id;
        });
        setFormData(dataItem[0])
        console.log('Create', dataItem);
      } else {
        navigate("/");
      }
      
    }
  }, [id, users, navigate]);

  return (
    <> 
      <div id="profile-edit-save">
        {id ?<h1>Edit User</h1> : <h1>Create User</h1>}
        <div className="create">
          <Link to="/" className="button-33">
            Home
          </Link>
        </div>
      </div>
      <div id="profile-edit-area">
        <form>
          <div id="edit-area-left">
            <table>
              <tbody>
                <tr>
                  <td className="edit-title">User Name:</td>
                  <td>
                    <input type="text" className="profileInputBox" name="username" value={username} onChange={handleChange}/>
                  </td>
                </tr>

                <tr>
                  <td className="edit-title">Mobile Number :</td>
                  <td>
                    <input type="text" className="profileInputBox"  name="mobileNumber" value={mobileNumber} onChange={handleChange}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="edit-area-right">
            <table>
              <tbody>
                <tr>
                  <td className="edit-title">Email Id:</td>
                  <td>
                    <input type="text" className="profileInputBox" name="emailid" value={emailid} onChange={handleChange}/>
                  </td>
                </tr>
                <tr>
                  <td className="edit-title">Age:</td>
                  <td>
                    <input type="number" className="profileInputBox" name="age" value={age} onChange={handleChange}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button id="editSave"  onClick={postData}>Save</button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
