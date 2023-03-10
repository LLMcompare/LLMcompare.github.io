async function GPT3_request(prompt,temperature,max_tokens) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+apikey
      },
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": prompt,
        "temperature": temperature,
        "max_tokens": max_tokens
        }),
    });
    const json_response = await response.json();
    return json_response["choices"][0]["text"];
  }

async function chatGPT_request(prompt,temperature,max_tokens) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+apikey
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role":"user","content":prompt}
        ],
        "temperature":temperature,
        "max_tokens":max_tokens,
        }),
    });
    const json_response = await response.json();
    return json_response["choices"][0].message.content;
  }
  
async function GPT2_request(prompt,temperature,max_tokens) {
    const response = await fetch(hfurl, {
        method: 'POST',
        body: JSON.stringify({
          "inputs": prompt,
          "parameters":{
            "temperature": temperature,
            "max_length": max_tokens,
            "use_cache":false
          }
          }),
    });
    const json_response = await response.json();
    return json_response[0]["generated_text"].substr(prompt.length);
}

async function runModel(prompt, model,temperature,max_tokens){
    if(model=="GPT3"){
        response = await GPT3_request(prompt,temperature,max_tokens);
        return response
    }
    if(model=="ChatGPT"){
        response = await chatGPT_request(prompt,temperature,max_tokens);
        return response
    }
    if(model=="GPT2"){
        response = await GPT2_request(prompt,temperature,max_tokens);
        return response
    }
}
