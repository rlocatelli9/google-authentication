import React, { useCallback, useState } from "react";
import GoogleLogin from "react-google-login";

import logo from './assets/Finance_back_logo.svg'
import logo_mini from './assets/Finance.svg'

function App() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [profilePic, setProfilePic] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleSuccessGoogle = useCallback((response) => {
		console.log(response);
		const {
			profileObj: { name, email, imageUrl },
		} = response;
		setName(name);
		setEmail(email);
		setProfilePic(imageUrl);
		setIsLoggedIn(true);
	}, []);

  const handleErrorGoogle = useCallback((response) => {
    //{"error":"popup_closed_by_user"}
    // quando usuário fechar o poup
    const {error} = response;
    if(error !== 'popup_closed_by_user') alert("Houve um problema.");

  }, [])

	return (
		<div className="container">
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <main>
        <header>
          <img src={logo_mini} alt="Logo" />

          <h2>invoice manager</h2>

          <p>Bem-vindo!</p>
        </header>

        <section id="login">
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Continuar com o Google"
            onSuccess={handleSuccessGoogle}
            onFailure={handleErrorGoogle}
          />
          <p id="msg-p">* É necessário o login com sua conta Google para importar arquivos</p>
          {isLoggedIn ? (
            <div style={{ textAlign: "center" }}>
              <h1>User Information</h1>
              <img className="profile" src={profilePic} alt="Profile" />
              <p>Name: {name}</p>
              <p>Email: {email}</p>
            </div>
          ) : (
            ""
          )}
        </section>
      </main>
		</div>
	);
}

export default App;
