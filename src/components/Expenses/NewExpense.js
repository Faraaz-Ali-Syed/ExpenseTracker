import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense-slice";
import axios from "axios";

const NewExpense = (props) => {

  const expenses=useSelector(state=>state.expense.expenses)
  const dispatch=useDispatch();

  const editHandler=()=>{
    props.onClick(props)
  }

  const deleteHandler=async()=>{
    const id=props.id
    console.log(expenses)
    const email=localStorage.getItem('email')
    const newEmail=email.replace('@','').replace('.','').replace('.','')
    try{
      await axios.delete(`https://crudcrud.com/api/b8d1e263d8be4663b421fc3329d19a44/${newEmail}/${id}`)
        const updatedexpenses=expenses.filter((ele)=>ele.id!==id)
        dispatch(expenseActions.removeExpense({expenses:updatedexpenses,amount:props.amount}))
      console.log('Expense Successfully Deleted')
    }catch(error){
      console.log(error)
    }

  }
  return (
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start expenseList"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{props.category}</div>
          {props.description}
        </div>
        <div>
        <div className="fw-bold">Amount: &#8377;{props.amount}</div>
        {/* <Button variant="outline-dark" size="sm" className="me-3" onClick={editHandler} >Edit</Button> */}
        <Button variant="outline-danger" size="sm" onClick={deleteHandler}>Delete</Button>
        </div>
      </ListGroup.Item>
  );
};

export default NewExpense;