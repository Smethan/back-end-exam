document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
};

document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
        .then((response) => {
            alert(response.data);
        })
};

document.getElementById("addComplimentButton").onclick = function() {
    let compliment = {
        "compliment": document.getElementById("addComplimentField").value
    }

    if (compliment) {
        axios.post("http://localhost:4000/api/compliment/", compliment)
            .then((response) => {
                alert("Nice compliment")
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        alert("Please enter a compliment...")
    }
    document.getElementById("addComplimentField").value = ""
}

document.getElementById("inspirationButton").onclick = function () {
    // Have to do an axios request from our server instead of directly to the api to get around cors, otherwise I would need to register for a key
    axios.get("http://localhost:4000/api/getQuotes")
        .then((response) => {
            
            if (document.getElementById("quoteDiv") === null) {
                
                console.log("creating div...")

                const quoteDiv = document.createElement("div")

                quoteDiv.id = 'quoteDiv'
                quoteDiv.innerHTML = response.data
                document.querySelector("body").appendChild(quoteDiv)
            } else {
                document.getElementById("quoteDiv").innerHTML = response.data
            }
        })
}

document.getElementById("addFortuneButton").onclick = function () {
    let fortune = {
        "fortune": document.getElementById("addFortuneField").value
    }

    if (fortune) {
        axios.post("http://localhost:4000/api/fortune/", fortune)
            .then((response) => {
                console.log("Success!")
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        alert("Please enter a fortune...")
    }
    document.getElementById("addFortuneField").value = ""
}