async function getdonors() {
    const res=await fetch("http://localhost:3000/getdonors");
    const data=await res.json();
    str=``;
    data.map((dt)=>{
        str+=`
        <div class="content" >
            <input type="text" value=${dt.name} disabled=true name="name" id="name" placeholder="Name">
            <input type="email" value=${dt.email}  disabled=true name="email" id="email" placeholder="Email">
            <input type="text" value=${dt.phone}  disabled=true name="pnp" id="pno" placeholder="Phone no.">
            <input type="text"  value=${dt.bgrop}  disabled=true name="bgrp" id="bgrp" placeholder="Blood Group">
            <input type="text" value=${dt.gender}  disabled=true name="gender" id="gender" placeholder="Gender">
            <div class="butn">
                <button class="edit" > Edit</button>
                <button class="save" >Save</button>
                <button class="delete" onclick="handleDelete('${dt._id}')" >Delete</button>
            </div>
        </div>    
        `
    });
    document.getElementById("main").innerHTML=str
}

getdonors();

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