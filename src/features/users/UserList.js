import React, { useContext, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import userContext from "../../context/user/userContext";

const UserList = () => {
  let navigate = useNavigate();
  const contextApi = useContext(userContext);
    
  useEffect(() => {
    if(!contextApi.userStateLoaded) {
      contextApi.getData();
    }
  }, [contextApi]);

  return (
    <div className="container">
     
      <h1>Users</h1>
      <div className="create">
        <Link to="/create" className="button-33">
          Create New User
        </Link>
      </div>
      {(() => {
        if (contextApi.loading) {
          return (
            <div className="middle">
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
              <div className="bar bar4"></div>
              <div className="bar bar5"></div>
              <div className="bar bar6"></div>
              <div className="bar bar7"></div>
              <div className="bar bar8"></div>
            </div>
          );
        } else {
          if (contextApi.users) {
            return (
              <>
                <div>
                  {
                    <table className="rwd-table">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <th>User Name</th>
                          <th>Email</th>
                          <th>Age</th>
                          <th>Action</th>
                        </tr>

                        {contextApi.users.map((user, i) => (
                          <tr key={i}>
                            <td data-th="ID">{user.id}</td>
                            <td data-th="User Name">{user.username}</td>
                            <td data-th="Email">{user.emailid}</td>
                            <td data-th="Age">{user.age}</td>
                            <td data-th="Action">
                              <FaEdit role="button" tabIndex="0" onClick={() => {
                                    navigate(`/edit/${user.id}`, { replace: true });
                                }}/>

                              <span className="btn-span">
                                <FaTrashAlt
                                  role="button"
                                  tabIndex="0"
                                  onClick={() => contextApi.handleDelete(user.id)}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </div>
              </>
            );
          }

          return <>No User {contextApi.error}</>;
        }
      })()}
    </div>
  );
};

export default UserList;
