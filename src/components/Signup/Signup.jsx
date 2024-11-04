import React, { useContext, useState } from "react";
import PageLayout from "../../common/components/PageLayout/PageLayout";
import LockIcon from "../../common/components/LockIcon/LockIcon";
import Form from "../../common/components/Form/Form";
import { AuthContext } from "../../common/Provider/Auth.context";

const SignupPage = () => {
  const linkCta = `Already have an account? Sign in`;
  const linkUrl = "/login";
  const fields = [
    {
      type: "text",
      label: "First Name",
      name: "firstName",
      required: true,
    },
    {
      type: "text",
      label: "Last Name",
      name: "lastName",
      required: true,
    },
    {
      type: "email",
      label: "Email Address",
      name: "email",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      required: true,
    },
    {
      type: "password",
      label: "Confirm Password",
      name: "confirmPassword",
      required: true,
    },
    {
      type: "number",
      label: "Contact Number",
      name: "contactNumber",
      required: true,
    },
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    password: "",
    email: "",
    contactNumber: "",
    lastName: "",
  });

  const { signup } = useContext(AuthContext);

  const formHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target?.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <PageLayout>
      <LockIcon label="Sign in" />
      <Form
        fields={fields}
        buttonCta="SIGN UP"
        formData={formData}
        formHandler={formHandler}
        handleSubmit={handleSubmit}
        linkToSignup={true}
        linkPosition="flex-end"
        linkCta={linkCta}
        linkUrl={linkUrl}
      />
    </PageLayout>
  );
};

export default SignupPage;
