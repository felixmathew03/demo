async function getdonors() {
    const res=await fetch("http://localhost:3000/getdonors");
    const data=await res.json();
    str=``;
    data.map((dt)=>{
        str+=`
        <div class="content" >
            <input type="text" value=${dt.name} disabled=true name="name" id="name-${dt._id}" placeholder="Name">
            <input type="email" value=${dt.email}  disabled=true name="email" id="email-${dt._id}" placeholder="Email">
            <input type="text" value=${dt.phone}  disabled=true name="pnp" id="pno-${dt._id}" placeholder="Phone no.">
            <input type="text"  value=${dt.bgrop}  disabled=true name="bgrp" id="bgrp-${dt._id}" placeholder="Blood Group">
            <input type="text" value=${dt.gender}  disabled=true name="gender" id="gender-${dt._id}" placeholder="Gender">
            <div class="butn">
                <button class="edit" onclick="handleEdit('${dt._id}')" > Edit</button>
                <button class="save" onclick="handleSave('${dt._id}')" >Save</button>
                <button class="delete" onclick="handleDelete('${dt._id}')" >Delete</button>
            </div>
        </div>    
        `
    });
    document.getElementById("main").innerHTML=str
}

getdonors();

async function handleEdit(id) {
    let name =document.getElementById(`name-${id}`);
    name.disabled=false;
    let email =document.getElementById(`email-${id}`);
    email.disabled=false;
    let pno =document.getElementById(`pno-${id}`);
    pno.disabled=false;
    let bgrp =document.getElementById(`bgrp-${id}`);
    bgrp.disabled=false;
    let gender =document.getElementById(`gender-${id}`);
    gender.disabled=false;
}

async function handleSave(id) {
    let name =document.getElementById(`name-${id}`).value;
    let email =document.getElementById(`email-${id}`).value;
    let pno =document.getElementById(`pno-${id}`).value;
    let bgrp =document.getElementById(`bgrp-${id}`).value;
    let gender=document.getElementById(`gender-${id}`).value;
    console.log(name,email,pno,bgrp,gender);
    let data={id,name,email,pno,bgrp,gender};
    console.log(data);
    const jsonData=JSON.stringify(data);
    const res=await fetch("http://localhost:3000/update",{
        "method":"PUT",
        "Content-Type":"text/json",
        "body":jsonData
    });
    console.log(res);
    const result=await res.text();
    console.log(result);
    if(result=="success"){
        alert("Updated Successfully!!");
        getdonors();
    }
    else{
        alert("Updation Failed")
    }
}

async function handleDelete(id){
    const res=await fetch("http://localhost:3000/delete",{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        "body":id
    });
    console.log(res);
    const data= await res.text();
    if(data=="success"){
        alert("successfully deleted")
        getdonors();
    }
    else{
        alert("Deletion Failed")
    }
}