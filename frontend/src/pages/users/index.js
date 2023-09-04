import React, { useState, useEffect } from "react";
import { ALL_TEXT } from "../../common";
import {
  GenericTable,
  CustomizedSearch,
  GenericButton,
  AddNewUser,
} from "../../components";
import "./style.scss";
import { tableHeading } from "./table";
import Pagination from "@mui/material/Pagination";
import { getAllUsers } from "../../utils/rest-services";
import { useDispatch } from "react-redux";
import { getUserFilterAction, getUsersAction } from "../../utils/store/slices/userAuth/actions";
import { unwrapResult } from "@reduxjs/toolkit";
function Users() {
  const [addNewUser, setAddNewUser] = useState(false);
  const dispatch=useDispatch()
  //  {
  //     id: 1,
  //     name: "raza Subhani",
  //     email: "qasim@gmail.com",
  //     DOB: "12/02/23",
  //     gender: "male",
  //     isBlackListed: true,
  //     role: "User",
  //   },
  const [usersList, setUsersList] = useState([]);
  const [allUsersData, setAllUsersData] = useState([]);
//   const userFilterhandler =  () => {
//     const payload = {
//       modelName:'user',
//       name: 'major',
//       // email: '',
//       // gender:''
//     }
//     dispatch(getUserFilterAction(payload)).then(unwrapResult).then((result) => {
//       console.log('resulttt', result)
//       setAllUsersData(result)
// }).catch((error)=>{})

//   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getUsersAction()).then(unwrapResult).then((result) => {   
          setAllUsersData(result);
          setUsersList(result);
        })    
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const userFilterHandler = (name, email, gender) => {
  const payload = {
    modelName: 'user',
    name,
    // email,
    // gender
  };
console.log('resultt',payload)
  dispatch(getUserFilterAction(payload))
    .then(unwrapResult)
    .then((result) => {
      console.log('resultt',result)
      setUsersList(result);
    })
    .catch((error) => {
      // Handle error, if any
    });
};



  return (
    <div className="userlist-main-container">
      <div className="title-container-userlist">
        <span>{ALL_TEXT.USERS}</span>
        <GenericButton
          customStyle={"custom-register-btn"}
          buttonText={`+${ALL_TEXT.REGISTER_USER}`}
          onPress={() => {
            setAddNewUser(true);
          }}
        />
      </div>
      <div className="user-search-bar">
        <CustomizedSearch
          title={"Search User By"}
          firstLabel={"Name"}
          secondInput
          firstPlaceholder={"Enter Name"}
          secondLabel={"Email"}
          secondPlaceholder={"Enter Email"}
          firstDropdown
          firstDropdownLabel={"Gender"}
          firstDropdownList={["male", "female"]}
          onClearFilterHandler={() => {
            setUsersList(allUsersData);
          }}
        onSearchBtnPress={(name, email, dummy, gender) => {
  userFilterHandler(name, email, gender);
}}

        />
      </div>
      <div className="table-userlist-container">
        <GenericTable headings={tableHeading} data={usersList} />
      </div>
      {addNewUser && (
        <AddNewUser
          show={addNewUser}
          buttonText={"Add"}
          handleClose={() => setAddNewUser(false)}
        />
      )}
      {/* <div className="pagination-container">
        <div className="inner-pagination">
          <Pagination
            page={1}
            color={"secondary"}
            onChange={() => {}}
            count={10}
          />
        </div>
      </div> */}
    </div>
  );
}

export default Users;
