prompt_area = document.getElementById("prompt_area")
submit_button = document.getElementById("submit_button")
response_area = document.getElementById("response")

apikey_input = document.getElementById("apikey")

apikey = localStorage.getItem("apikey")
if(apikey){
    apikey_input.value = apikey;
}
async function update_response(){
    apikey = apikey_input.value;
    if(!apikey){
        alert("Please enter API key");
        return;
    }
    localStorage.setItem("apikey",apikey);
    response_area.innerHTML = ""
    models =  ["GPT2","GPT3","ChatGPT"];
    for(var i = 0; i<3;i++){
        model_name=models[i];
        model_response = await runModel(prompt_area.value,model_name);
        response_area.innerHTML += `<h5>${model_name}</h5><pre>${model_response}</pre>`
    }
}

submit_button.onclick = (e) => {
    update_response()
    .catch((error) => {
      alert(("Error:"+ error));
    });
}