var socket = io.connect('http://localhost:3000');
socket.on('ack', function(data) {
    if (data.init) {
        console.log("socket initialized...accepting facebook login...");
        // Additional JS functions here
        
        // Load the SDK Asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '333483723421810', // App ID
                channelUrl : './channel.html', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });
        };



        //event listeners
        document.getElementById("FacebookLogin").addEventListener("click", getLogin, false);
      
        function login() {
            FB.login(function(response) {
                if (response.authResponse) {
                    // connected
                    getLogin();
                } else {
                    // cancelled
                }
            }, {scope:'user_status, user_photos'});
        }
        
        function getLogin() {
            // Additional init code here
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    $("FacebookLogin").hide();
                    testAPI();
                    // connected
                    var uid = response.authResponse.userID;
                    console.log("UserID: " + uid);
                } else if (response.status === 'not_authorized') {
                    // not_authorized
                    $("FacebookLogin").show();
                    console.log("not authorized");
                    login();
                } else {
                    // not_logged_in
                    $("FacebookLogin").show();
                    console.log("not logged in");
                    login();
                }
                
            });
        }



        function testAPI() {
          console.debug("testAPi"); 
          FB.api('/me?fields=photos.fields(likes),statuses.limit(10)', function(response) {
            console.debug(response)
            /*
            console.debug(response);
            socket.emit('userBadgeRequest',{userID:response.id});
            var my_badges;
            socket.on('userBadgeResponse', function(user_badge_data){
              if(!user_badge_data.badges) {
                console.debug("no badges");
                my_badges = null;
              } else 
                console.debug("badges: " + user_badge_data.badges);
                my_badges = user_badge_data.badges;
            });

            for (i = 0; i < response.statuses.data.length; i++) {
              status = response.statuses.data[i];
              if (status.likes != null) {
                console.debug(status.likes.data.length);
                //if( !checkForBadge("Too Many Likes", my_badges) && status.likes.data.length > 10) {
                if (true) {
                  giveNewBadge("Too Many Likes", response.id);
                }

              break;
              }

              if (status.place != null ) {
                console.debug(status.place.location);
              }
            }
            */
          });
        }
      }
});