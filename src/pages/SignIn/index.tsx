import React from 'react';
import { Form } from '@unform/web';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
   function hadleSubmit(data: object): void {
      console.log(data);
   }

   return (
      <Container>
         <Content>
            <img src={logoImg} alt="Barbeiro" />
            <Form onSubmit={hadleSubmit}>
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
