import FormInput from '@/components/authentication/form-input/form-input';
import Button from '@/components/button/button';

import './style.scss';

export default function Page() {
  const click = () => {
    console.log('Test');
  };

  return (
    <div className="sign-in">
      <div className="sign-in__header">
        <h1>Sign In</h1>
      </div>
      <div className="sign-in__form-container">
        <div className="sign-in__description">
          <p className="sign-in__welcome">Welcome back!</p>
          <p className="sign-in__text">Sign in back to your account.</p>
        </div>
        <div className="sign-in__form">
          <form>
            <FormInput
              title="email"
              type="email"
              hint="Enter your email."
            />
            <FormInput
              title="email"
              type="email"
              hint="Enter your email."
            />
          </form>
        </div>
        <div className="sign-in__reset-password">
          <p>
            Forgot your password? <span>Reset</span>
          </p>
        </div>
      </div>
      <div className="sign-in__button-container">
        <Button
          title="Login"
          type="rounded"
        />
        <p>
          Dont have an account? <span>Help</span>
        </p>
      </div>
    </div>
  );
}
