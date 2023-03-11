submit_button = document.getElementById("submit_button")

apikey = localStorage.getItem("apikey")
if(apikey){
    $("#apikey").val(apikey);
}
hfurl = localStorage.getItem("hfurl")
if(hfurl){
    $("#hfurl").val(hfurl);
}
async function update_response(){
    apikey = $("#apikey").val();
    hfurl = $("#hfurl").val();
    if(!apikey || !hfurl){
        alert("Please enter API key and HF Url");
        return;
    }
    localStorage.setItem("apikey",apikey);
    localStorage.setItem("hfurl",hfurl);

    $(".model").each(async (i,modeldiv) => {
        let model_name = $(modeldiv).find("h3").text();
        let prompt_text = $("#prompt_area").val();
        let temperature = Number($(modeldiv).find(".tempslider").val());
        let max_tokens = Number($(modeldiv).find(".tokensslider").val());
        model_response = await runModel(prompt_text,model_name,temperature,max_tokens);
        $(modeldiv).find("pre").html(`<pre><b>${prompt_text}</b>${model_response}</pre>`);
    });
}

$("input[type='range']").on("input",(e)=>{
    $(e.target).parent().find(".temp").text($(e.target).val())
});

submit_button.onclick = (e) => {
    update_response()
    .catch((error) => {
      alert(("Error:"+ error));
    });
}