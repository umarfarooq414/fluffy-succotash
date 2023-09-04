import React from "react";
import "./style.scss";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { acceptEventAction, cancelRequestEventAction } from "../../utils/store/slices/userAuth/actions";
import { toast } from "react-toastify";

export const GenericTable = ({ headings, data }) => {
  const dispatch=useDispatch()
  function handleCancel(payload) {
    dispatch(cancelRequestEventAction(payload)).then(unwrapResult).then(() => {
            toast.success('Invitation Rejected',{position:toast.POSITION.TOP_RIGHT})

    })
    .catch((error)=>{toast.error(error?.response?.data?.error,{position:toast.POSITION.TOP_RIGHT})})
  }

   function handleAccept(payload) {
    dispatch(acceptEventAction(payload)).then(unwrapResult).then(() => {
      toast.success('Invitation accepted',{position:toast.POSITION.TOP_RIGHT})
    })
    .catch((error)=>{toast.error(error?.response?.data?.error,{position:toast.POSITION.TOP_RIGHT})})
  }
  return (
    <BootstrapTable trClassName="table-row" data={data} bordered={false}>
      {headings.map((i, index) => (
        <TableHeaderColumn
          key={index}
          width={"20%"}
          dataField={i.fieldName}
          dataFormat={i.dataformat}
          isKey={index == 0 && true}
        >
          {console.log(data)}
          {i.title}
          
        </TableHeaderColumn>
      ))}
    </BootstrapTable>
  );
};
