import { LoginForm, LoginWrapper } from '@northware/ui/components/auth/login';

const LoginPage = () => {
  return (
    <LoginWrapper>
      <LoginForm service="cockpit" />
    </LoginWrapper>
  );
};

export default LoginPage;
