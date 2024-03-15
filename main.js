async function getUserData(username) {
    const res = await fetch(`https://api.github.com/users/${username}`);
  
    if (!res.ok) {
      const errorMessage = `Error: ${response.status}`;
      console.error("Error fetching user data:", errorMessage);
      throw new Error(errorMessage); 
    }
  
    return await res.json();
  }
  
  
  function printUserData(data) {
    if (!data) return; 
  
    document.getElementById("user-img").src = data.avatar_url;
    document.getElementById("user-img-mobile").src = data.avatar_url;
    document.getElementById("user-name").textContent = data.name || "Name";
    document.getElementById("user-joined-time").textContent = `Joined ${new Date(data.created_at).toLocaleDateString()}`;
    document.getElementById("user-username").textContent = `@${data.login}`;
    document.getElementById("user-bio").textContent = data.bio || "User bio...";
    document.getElementById("user-repos").textContent = data.public_repos;
    document.getElementById("user-followers").textContent = data.followers;
    document.getElementById("user-following").textContent = data.following;
  
    if (data.location) {
      document.getElementById("user-location").textContent = data.location;
    } else {
      document.getElementById("user-location").style.display = "none";
    }
  
    if (data.twitter_username) {
      document.getElementById("user-twitter").querySelector("a").href = `https://twitter.com/${data.twitter_username}`;
      document.getElementById("user-twitter").style.display = "block";
    } else {
      document.getElementById("user-twitter").style.display = "none";
    }
  
    if (data.blog) {
      document.getElementById("user-website").querySelector("a").href = data.blog;
      document.getElementById("user-website").style.display = "block";
    } else {
      document.getElementById("user-website").style.display = "none";
    }
  
    if (data.company) {
      document.getElementById("user-organization").querySelector("a").href = data.html_url; 
      document.getElementById("user-organization").querySelector("a").textContent = data.company;
      document.getElementById("user-organization").style.display = "block";
    } else {
      document.getElementById("user-organization").style.display = "none";
    }
  }
  
  async function submitForm(e) {
    e.preventDefault();
  
    const usernameInput = document.getElementById("github-username");
    const username = usernameInput.value.trim();
  
    if (!username) {

      return;
    }
  
    const userData = await getUserData(username);
    printUserData(userData);
  
    usernameInput.value = "";
  }
  

  document.querySelector(".search-container").addEventListener("submit", submitForm);
  

  function switchTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  

    const themeSwitchText = document.getElementById("theme-switch-text");
    if (body.classList.contains("dark-mode")) {
      themeSwitchText.textContent = "Light";
    } else {
      themeSwitchText.textContent = "Dark";
    }
  

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    }
  }
  