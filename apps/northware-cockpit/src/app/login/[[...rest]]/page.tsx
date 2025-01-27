import { LoginForm, LoginWrapper } from '@northware/ui/components';

const LoginPage = () => {
  return (
    <LoginWrapper>
      <LoginForm service="cockpit" />
    </LoginWrapper>
  );
};

export default LoginPage;
