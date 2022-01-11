import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
   email: string;
   password: string;
}

const SignIn: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const { signIn } = useAuth();

   const hadleSubmit = useCallback(
      async (data: SignInFormData) => {
         try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('E-mail Obrigatório!')
                  .email('Digite um e-mail válido!'),
               password: Yup.string().required('Senha Obrigatória!'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            signIn({
               email: data.email,
               password: data.password,
            });
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const errors = getValidationErrors(err);
               formRef.current?.setErrors(errors);
            }
         }
      },
      [signIn],
   );

   return (
      <Container>
         <Content>
            <img src={logoImg} alt="Barbeiro" />
            <Form ref={formRef} onSubmit={hadleSubmit}>
               <h1>Faça seu logon</h1>
               <Input name="email" icon={FiMail} placeholder="E-mail" />
               <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
               />

               <Button type="submit">Entrar</Button>

               <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="login">
               <FiLogIn />
               Criar conta
            </a>
         </Content>
         <Background />
      </Container>
   );
};

export default SignIn;
