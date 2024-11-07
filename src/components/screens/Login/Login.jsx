import React, { useContext, useState } from "react";
import Form from "../../Form/Form";
import PageLayout from "../../PageLayout/PageLayout";
import LockIcon from "../../LockIcon/LockIcon";
import { AuthContext } from "../../Providers/Auth.context";

const LoginPage = () => {
  const linkCta = `Don't have an account? Sign Up`;
  const linkUrl = "/sign-up";
  const fields = [
    {
      type: "email",
      label: "Email",
      name: "username",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
    },
  ];
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const formHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target?.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <PageLayout containerSize="sm" topMargin="4em">
      <LockIcon label="Sign in" />
      <Form
        fields={fields}
        buttonCta="SIGN IN"
        formData={formData}
        formHandler={formHandler}
        handleSubmit={handleSubmit}
        linkToSignup={true}
        linkPosition="flex-start"
        linkCta={linkCta}
        linkUrl={linkUrl}
      />
    </PageLayout>
  );
};

export default LoginPage;
