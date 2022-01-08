import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
   const formRef = useRef<FormHandles>(null);

   const hadleSubmit = useCallback(async (data: object) => {
      try {
         const schema = Yup.object().shape({
            name: Yup.string().required('Nome Obrigatório!'),
            email: Yup.string()
               .required('E-mail Obrigatório!')
               .email('Digite um e-mail válido!'),
            password: Yup.string().min(6, 'Mínimo de 6 dígitos'),
         });

         await schema.validate(data, {
            abortEarly: false,
         });
      } catch (err) {
         console.log(err);

         if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            formRef.current?.setErrors({ name: 'Nome Obrigatório' });
         }
      }
   }, []);
   return (
      <Container>
         <Background />
         <Content>
            <img src={logoImg} alt="Barbeiro" />
            <Form ref={formRef} onSubmit={hadleSubmit}>
               <h1>Faça seu Cadastro</h1>
               <Input name="name" icon={FiUser} placeholder="Nome" />
               <Input name="email" icon={FiMail} placeholder="E-mail" />
               <Input
                  name="password"
                  icon={FiLock}
                  type="password"
                  placeholder="Senha"
               />

               <Button type="submit">Cadastrar</Button>
            </Form>

            <a href="login">
               <FiArrowLeft />
               Voltar para logon
            </a>
         </Content>
      </Container>
   );
};

export default SignUp;
