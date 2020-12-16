document.addEventListener('deviceready', function(){
	let user = null;
	let db = null;

    var taskName;
    
	getRedirectResult();
	document.querySelector('#btn_google_login').addEventListener('click', function(){
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider).then(()=>{
			getRedirectResult();
		});
	});

	function getRedirectResult(){
		firebase.auth().getRedirectResult().then((result)=>{
			if(result.credential){
                user = result.user;
                console.log(user.email);
                if(/^[0-9]+@alumnos.uc3m.es/.test(user.email)){
                    document.querySelector('#page_login').style.display = 'none';
                    document.querySelector('#page_main').style.display = 'block';
                    
                    console.log(user);
                    
                    db = firebase.database();
                    let root_ref = db.ref();
                    let users_ref = db.ref("Users");

                    const page_main = document.querySelector('page_main');
                    //Obtenemos la foto de perfil de la cuenta de google
                    let photoURL = user.photoURL;
                    var img = document.createElement('img');
                    img.src = photoURL;
                    img.id = "userPhoto";
                    document.body.appendChild(img);
                    console.log(user.uid);
                    
                    // Start a scan. Scanning will continue until something is detected or
                    // `QRScanner.cancelScan()` is called.
                    QRScanner.scan(displayContents);

                    function displayContents(err, text){
                        if(err){
                            // an error occurred, or the scan was canceled (error code `6`)
                        } else {
                            // The scan completed, display the contents of the QR code:
                            alert(text);
                        }
                    }

                    // Make the webview transparent so the video preview is visible behind it.
                    QRScanner.show();
                    // Be sure to make any opaque HTML elements transparent here to avoid
                    // covering the video.
                    
                } else {
                    document.querySelector('#page_login').style.display = 'none';
                    document.querySelector('#page_login_failed').style.display = 'block';
                }
            }
		}).catch((error)=>{
			console.log(error);
		});
	}
	
	
    document.querySelector('#btn_add_game').addEventListener('click',function(){
		document.querySelector('#page_add_game').style.display = "block";
		document.querySelector('#page_main').style.display = "none";
	});

});
