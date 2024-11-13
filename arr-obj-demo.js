let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form.addEventListener("submit", (e) => {
    e.preventDefault();
  console.log("submit pressed");
  console.log("button-clicked");

  formValidation();
});

let formValidation = () => {
  console.log("getting in");
  if (input.value === "") {
    msg.innerText = "post cannot be empty";
    console.log("failure");
  } else {
    console.log("success");
    acceptData();
  }
};




let data={}

let acceptData =()=>{
    data["text"]= input.value
    console.log(data)
    
    createpost()
}

let createpost=()=>{
    posts.innerHTML +=`<div>
                    <p>${data.text}</p>
                    <span class="options">
                      <i onclick="editPost(this)" class="fas fa-edit"></i>
                      <i onclick="deletePost(this)" class="fas fa-trash-alt"></i>
                    </span>
                  </div>`;
                  input.value=''
}

let deletePost =(e)=>{
    e.parentElement.parentElement.remove();
}

let editPost =(e)=>{
    input.value= e.parentElement.previousElementSibling.innerHTML
    e.parentElement.parentElement.remove();
}