function toggleSignup(){
    document.getElementById("login-toggle").style.backgroundColor="#fff";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.backgroundColor="#222";
     document.getElementById("signup-toggle").style.color="#fff";
     document.getElementById("login-form").style.display="none";
     document.getElementById("signup-form").style.display="block";
 }
 
 function toggleLogin(){
     document.getElementById("login-toggle").style.backgroundColor="#222";
     document.getElementById("login-toggle").style.color="#fff";
     document.getElementById("signup-toggle").style.backgroundColor="#fff";
     document.getElementById("signup-toggle").style.color="#222";
     document.getElementById("signup-form").style.display="none";
     document.getElementById("login-form").style.display="block";
 }
 

 function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
 function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
  }
 function validation(){
        var email = document.getElementById("email").value;
        var gender = document.getElementById("gender").value;
        var birthday = document.getElementById("bday").value;
        var state = document.getElementById("state").value;
        var password = document.getElementById("password").value;


        var status = false;    
        var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if(email=="")
        {
            alert("Please Enter Email!");
        }
        else if (email.search(emailRegEx) == -1)
         {  
                  alert("Please enter a valid email address.");
        }
        else if(gender == ""){
            alert("Please Select Gender!");
        }
        else if(state == ""){
            alert("Please Select State!");
        }
        
        else if(!birthday)           //To validate if birth date is empty
        {
            alert("Please select Birth Date")
        }
    //    else if(submitBday('bday')>18)//To check age greater than 16
    //     {
    //        alert("Age should be greater than 16");

    //     }
        else if (getAge(birthday) < 18) {
           
            alert("Age should be 18++");
        } 

        else if(password=="")
        {
            alert("Please Enter Password");
        }
        // else if (password.length < 8) {
        //     alert("Your password must be at least 8 characters");
        
        // }
        // else if(password.search(/[a-z]/i) < 0){
        //     alert("Your password must contain at least one lowercase letter.");
        // }else if(password.search(/[A-Z]/i) < 0){
        //     alert("Your password must contain at least one uppercase letter.");
        // }
        // else if(password.search(/[0-9]/) < 0) {
        //     alert("Your password must contain at least one digit."); 
        // }
        
        else if(password.search('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$') < 0) {
            
            alert("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."); 
        }
        else
        {

        alert("Email = " + email
                + "\n" + 'Gender = ' + gender
                + "\n" + "DOB = " + formatDate(birthday)
                + "\n" + "State = " + state
                + "\n" + "Password = " + password
            );
        }

 }
 
 function register(){
    validation();
}



window.fbAsyncInit = function() {
    // FB JavaScript SDK configuration and setup
    FB.init({
      appId      : '1583334008488263', // FB App ID
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
    
    // Check whether the user already logged in
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            //display user data
            getFbUserData();
        }
    });
};

// Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook login with JavaScript SDK
function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            // Get and display the user profile data
            getFbUserData();
        } else {
            // document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
            alert('User cancelled login or did not fully authorize.')
        }
    }, {scope: 'email'});
}

// Fetch the user profile data from facebook
function getFbUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
        document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.first_name + '!';
        document.getElementById('userData').innerHTML = '<p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>Locale:</b> '+response.locale+'</p><p><b>Picture:</b> <img src="'+response.picture.data.url+'"/></p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
    });
}

// Logout from facebook
function fbLogout() {
    FB.logout(function() {
        document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
        document.getElementById('fbLink').innerHTML = '<img src="fblogin.png"/>';
        document.getElementById('userData').innerHTML = '';
        document.getElementById('status').innerHTML = 'You have successfully logout from Facebook.';
    });
}

