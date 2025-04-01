import React from "react";
import {post} from "axios"; 
import { response } from "express";

class CustomerAdd extends React.Component{
  
    constructor(props){
        super(props) ; 
        this.state = {
            file :null , 
            name:'',
            birthday:'',
            gender:'',
            job:'',
            filename:''
            
        }
    }

    handleFormSubmit=() =>{

        e.preventDefault();
        this.addCustomer().then((response)=>{
              console.log(response.data) ; 
        })


        this.setState({
            file :null , 
            name:'',
            birthday:'',
            gender:'',
            job:'',
            filename:''
        })

        window.location.reload() ; 

    }

    handleFileChange =(e) => {
        this.setState({
            file : e.target.file[0],filename: e.target.value
        })
    }

    handleValueChange =(e) => {
       let nextState = {} ; 
       nextState[e.target.name] = e.target.value ; 
       this.setState(nextState) ; 
    }

    addCustomer =() =>{

        const url='/api/customer' ; 
        const formData = new FormData();
        
        formData.append('method'  , 'add') ; 
        formData.append('image'  , this.state.file) ; 
        formData.append('name'  , this.state.name) ; 
        formData.append('birthday'  , this.state.birthday) ; 
        formData.append('gender'  , this.state.gender) ; 
        formData.append('job'  , this.state.job) ; 

        const config ={
            Headers : {
                'content-type' : 'multipart/form-data'
            }
        }

        return post(url, formData , config) ; 
    }
    
    render(){
        return(
            <form onSubmit={this.handleFormSubmit} >
                <h1>추가</h1>
                프로필이미지:
               
                이미지 :  <input type="file" name="file" file={this.state.file} value="this.state.fileName" onChange={this.handleFileChange} ></input><br/>
                이름 : <imput type="text" name="name" value="this.state.userName" onChange={this.handleValueChange} ></imput><br/>
                생일 : <imput type="text" name="birthday" value="this.state.birthday" onChange={this.handleValueChange} ></imput><br/>
                성별 : <imput type="text" name="gender" value="this.state.gender" onChange={this.handleValueChange} ></imput><br/>
                직업 : <imput type="text" name="job" value="this.state.job" onChange={this.handleValueChange} ></imput><br/>
                
                <button type="submit"> 추가 </button>
            </form>
        )
    }

} 

export default CustomerAdd ; 