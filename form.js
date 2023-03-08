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
    models =  ["GPT2","GPT3","ChatGPT"];
    for(var i = 0; i<3;i++){
        model_name=models[i];
        prompt_text = prompt_area.value;
        model_response = await runModel(prompt_text,model_name);
        document.getElementById("response"+i).innerHTML = `<h3>${model_name}</h3><pre><b>${prompt_text}</b>${model_response}</pre>`
    }
}

submit_button.onclick = (e) => {
    update_response()
    .catch((error) => {
      alert(("Error:"+ error));
    });
}