import React, { useState } from "react";
import userContext from "./userContext";

const UserState = ({children}) => {
    // let navigate = useNavigate();

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userStateLoaded, setUserStateLoaded] = useState(false);
    const url = "https://62398c5863fdd477ac146911.mockapi.io/api/users/users/";
    const getData = () => {
        fetch(url)
          .then((response) => {
            if (response.ok) {
              console.log("resp", response);
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            setUsers(data);
            console.log(data);
          })
          .catch((error) => {
            console.log("Error fetching data " + error);
            setError(error);
          })
          .finally(() => {
            setLoading(false);
            setUserStateLoaded(true)
          });
      }

      const handleSave = (formData) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(() => {
          alert("Data Saved Successfully");
          document.getElementById("editSave").disabled = false;
        //   navigate("/");
        })
        .catch((err) => console.log(err));
      }

      const handleEdit = (formData, id) => {
        fetch(
            "https://62398c5863fdd477ac146911.mockapi.io/api/users/users/" + id,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          )
            .then((data) => data.json())
            .then(() => {
              alert("Data Updated Successfully");
            //   navigate("/");
            })
            .catch((err) => console.log(err));
      }

      const handleDelete = (id) => {
        fetch(url+id, {
            method: 'DELETE'
        })
        .then(() => {
          getData();
          }).then(() => {
            alert("Data Deleted Successfully");
          })
          .catch((err) => console.log(err));
      };
    const state = {
        users,
        error,
        loading,
        userStateLoaded,
        getData,
        handleDelete,
        handleSave,
        handleEdit
    }
    return (
        <userContext.Provider value={state}>
            {children}
        </userContext.Provider>
    )
}

export default UserState;