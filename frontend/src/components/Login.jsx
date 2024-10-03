// Create the login form: email / pwd
// Create register form.. email / pwd / repeat pwd
// When user clicks on 'Need An Account? Register link, 
// use javascript to hide the login form and show the register form
// Both forms should have an action of javascript:alert('Form Submitted'), alerting that
// the form was submitted
//Hide login form when creating new account, use Javascript to hide the login form and show the register form
import TextInput from "./TextInput"
function Login() {

    return (
        <form id="login-form" className="row g-3 justify-content-center" action="post">
            <div className="col-6">
                <TextInput name="email" type="email" placeholder="Email Address" /> 
                <TextInput name="password" type="password" placeholder="Password" />  
            </div>
            <div class="col-12">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div class="col-12">
                <a href="./register" id="registerBtn" className="btn btn-outline-primary">Need an Account? <br/> Register Here!</a>
            </div>
            <br/>
        </form>
    )

}

export default Login