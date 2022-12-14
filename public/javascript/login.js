async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (email && password) {
      console.log("INSIDE THE EMAIL AND PASSWORD");
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        alert("You're now logged in!")
        document.location.replace("/dashboard/");
        console.log('dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("You're now signed-up. Let's get started!")
        document.location.replace("/dashboard/");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
  
  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
  