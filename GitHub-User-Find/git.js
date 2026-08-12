let userName = document.getElementById("userName");
let searchBtn = document.getElementById("searchBtn");
let loading = document.getElementById("loading");
let error = document.getElementById("error");
let gitHubInfo = document.getElementById("gitHubInfo");
userName.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchBtn.click();
    }
});
searchBtn.addEventListener("click", async function(){
    if(userName.value === ""){
        alert("Please search any Username!");
        return;
    }
    loading.innerText = "loading...";
    try{
        let name = userName.value;
        let url = `https://api.github.com/users/${name}`;
        gitHubInfo.innerHTML = "";
        let response = await fetch(url);
        if(!response.ok){
            throw new Error("User not found");
        }
        let data = await response.json();
        console.log(data);
        let profileCard = document.createElement("div");
        profileCard.className = "profileCard";
        let img = document.createElement("img");
        img.src = data.avatar_url;
        let h2 = document.createElement("h2");
        h2.innerText = "Name: " + data.login;
        let bio = document.createElement("p");
        bio.innerText = data.bio;
        let followers = document.createElement("p");
        followers.innerText = "Followers: " + data.followers;
        let following = document.createElement("p");
        following.innerText = "Following: " + data.following;
        let publicRepos = document.createElement("p");
        publicRepos.innerText = "Public Repos: " + data.public_repos;
        let accountCreated = document.createElement("p");
        let date = new Date(data.created_at);
        let formattedDate = date.toLocaleDateString();
        accountCreated.innerText = "Account Created: " + formattedDate;
        let link = document.createElement("a");
        link.href = data.html_url;
        link.innerText = "View GitHub Profile";
        link.target = "_blank";
        profileCard.appendChild(img);
        profileCard.appendChild(h2);
        profileCard.appendChild(bio);
        profileCard.appendChild(followers);
        profileCard.appendChild(following);
        profileCard.appendChild(publicRepos);
        profileCard.appendChild(accountCreated);
        profileCard.appendChild(link);
        gitHubInfo.appendChild(profileCard);
    }
    catch{
        error.innerText = "User not found!";
        loading.innerText = "";
    }
        
});
