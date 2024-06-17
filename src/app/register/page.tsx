import RegisterFooter from '@/components/layout/FooterForm';
import RegisterForm from '@/components/layout/Form/RegisterForm';

export default function Register() {
  return (
    <div className="max-w-screen-md mx-auto md:p-0 p-5">
      <RegisterForm />
      <div className="md:w-1/2 mx-auto text-center mt-10">
        <RegisterFooter text={`Sudah punya akun? \t`} href="/login" pushText="Masuk Sekarang" />
      </div>
    </div>
  );
}
