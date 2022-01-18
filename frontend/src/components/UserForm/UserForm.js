import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormRow,
  InputLabel,
  InputText,
  InputError,
  SelectText,
  OptionText,
  RightColumn,
  LeftColumn,
  FormOneRow,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { addUser, updateUser } from "../../api/user";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";

const UserForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      active: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Korisničko ime je obavezno"),
      password: Yup.string()
        .min(6, "Lozinka mora biti minimalne duljine 6 znakova")
        .required("Lozinka je obavezna"),
      role: Yup.string().required("Uloga je obavezna"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      let user = {};

      if (props.user !== null) {
        user = {
          username: values.username,
          password: values.password,
          active: values.active,
          roles: values.role,
        };
      } else {
        user = {
          username: values.username,
          password: values.password,
          role: values.role,
        };
      }

      if (props.user !== null) {
        console.log(props.user.id);
        updateUser(props.user.id, user, authToken)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
            setTimeout(() => {
              setIsRequestFinished(false);
            }, 4000);
          })
          .catch((err) => {
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(true);
            setSuccessMessage("Došlo je do greške!");
          });
        setIsLoading(false);
        props.get();
      } else {
        addUser(user, authToken)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
            setTimeout(() => {
              setIsRequestFinished(false);
            }, 4000);
          })
          .catch((err) => {
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(true);
            setSuccessMessage("Došlo je do greške!");
          });
        setIsLoading(false);
        props.get();
      }
      props.setAddPressed(false);
    },
  });

  useEffect(() => {
    if (props.user !== null) {
      const fields = ["username", "password", "active"];
      fields.forEach((field) =>
        formik.setFieldValue(field, props.user[field], false)
      );
      formik.setFieldValue("role", props.user["roles"], false);
    }
  }, []);
  return (
    <>
      {!isLoading ? (
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="username">Korisničko ime</InputLabel>
            <InputText
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <InputError>{formik.errors.username}</InputError>
            ) : null}
          </FormOneRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="password">Lozinka</InputLabel>
              <InputText
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <InputError>{formik.errors.password}</InputError>
              ) : null}
            </LeftColumn>
            <RightColumn></RightColumn>
          </FormRow>
          <FormRow>
            <RightColumn>
              <InputLabel htmlFor="active">Aktivan</InputLabel>
              <SelectText
                disabled={props.user !== null ? false : true}
                id="active"
                type="select"
                {...formik.getFieldProps("active")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value={true}>DA</OptionText>
                <OptionText value={false}>NE</OptionText>)
              </SelectText>
              {formik.touched.active && formik.errors.active ? (
                <InputError>{formik.errors.active}</InputError>
              ) : null}
            </RightColumn>
            <LeftColumn>
              <InputLabel htmlFor="role">Uloga</InputLabel>
              <SelectText
                id="role"
                type="select"
                {...formik.getFieldProps("role")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value={"ADMIN"}>Admin</OptionText>
                <OptionText value={"USER"}>User</OptionText>
              </SelectText>
              {formik.touched.color && formik.errors.color ? (
                <InputError>{formik.errors.color}</InputError>
              ) : null}
            </LeftColumn>
          </FormRow>
          <FormRow>
            <Button type="submit">Dodaj</Button>
          </FormRow>
          {isRequestFinished && (
            <FormRow>
              <SuccessMessage isError={isError}>
                {successMessage}
              </SuccessMessage>
            </FormRow>
          )}
        </Form>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default UserForm;
