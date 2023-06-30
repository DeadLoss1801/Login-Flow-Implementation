// this code is for login details

let btn = document.querySelector("button");

btn.addEventListener("click", function (e) {
    e.preventDefault();

    let email = document.querySelector("input[type ='email']").value;
    let password = document.querySelector("input[type ='password']").value;
    let resp = fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((res) => {
            //   console.log(res);
            return res.json();
        })
        .then((data) => {
            if (data.status == "success") {
                window.location.href = "http://localhost:3000/";
            } else {
                let msg = document.getElementById("msg");
                msg.innerHTML = data.message;
            }
        });
});