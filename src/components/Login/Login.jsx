import React, { useState } from "react";
import Form from "../../common/components/Form/Form";
import PageLayout from "../../common/components/PageLayout/PageLayout";
import LockIcon from "../../common/components/LockIcon/LockIcon";
import { Authentication } from "../../common/api";

const LoginPage = () => {
  const fields = [
    {
      type: "email",
      label: "Email",
      name: "email",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
    },
  ];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name, e.target.value);
    if (e.target.name === "email") {
      setFormData({ ...formData, username: e.target.value });
    }
    setFormData({ ...formData, [e.target?.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const loginRes = await Authentication.login(formData);
    console.log({ loginRes });
  };

  return (
    <PageLayout>
      <LockIcon label="Sign in" />
      <Form
        fields={fields}
        buttonCta="SIGN IN"
        formData={formData}
        formHandler={formHandler}
        handleSubmit={handleSubmit}
      />
    </PageLayout>
  );
};

export default LoginPage;
