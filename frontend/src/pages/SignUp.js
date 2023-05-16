import PlainWrapper from '../layouts/PlainWrapper';

function SignUp() {

    return (
        <PlainWrapper>
            <div className="w-2/3 mx-auto text-center flex flex-col gap-4 items-center justify-center">
                <h1 className="text-primary">To access this prototype, get the credentials from Sens-Vue</h1>
                <p className="text-dark">Do you have an account? <a href="/" className="text-primary">Sign in now</a></p>
            </div>
        </PlainWrapper>
    );
  }
  
export default SignUp;
  