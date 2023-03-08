async function GPT3_request(prompt) {
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
        "temperature": 0,
        "max_tokens": 30
        }),
    });
    const json_response = await response.json();
    return json_response["choices"][0]["text"];
  }

async function chatGPT_request(prompt) {
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
        }),
    });
    const json_response = await response.json();
    return json_response["choices"][0].message.content;
  }
  
async function GPT2_request(prompt) {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
        method: "POST",
        mode: "cors",
        // headers: {
        // "Content-Type": "application/json",
        // "Authorization": "Bearer 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"
        // },
        body: JSON.stringify({
        "inputs": prompt
        }),
    });
    const json_response = await response.json();
    return json_response[0]["generated_text"].substr(prompt.length);
}

async function runModel(prompt, model){
    if(model=="GPT3"){
        response = await GPT3_request(prompt);
        return response
    }
    if(model=="ChatGPT"){
        response = await chatGPT_request(prompt);
        return response
    }
    if(model=="GPT2"){
        response = await GPT2_request(prompt);
        return response
    }
}
