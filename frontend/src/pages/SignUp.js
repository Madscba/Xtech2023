import PlainWrapper from '../layouts/PlainWrapper';

function SignUp() {

    return (
        <PlainWrapper>
            <div className="w-full md:w-8/12 md:max-w-container-limit mx-auto text-center flex flex-col gap-4 items-center justify-center">
                <h1 className="text-primary">Please contact Sens-Vue, if you would like to access this prototype.</h1>
                <p className="text-dark">Do you have an account? <a href="/login" className="text-primary">Sign in now</a></p>
            </div>
        </PlainWrapper>
    );
  }
  
export default SignUp;
  