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
import { SuccessMessage } from "../../lib/style/generalStyles";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { addPuppy, updatePuppy } from "../../api/puppy";
import DataLoader from "../DataLoader/DataLoader";

const PuppyForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      gender: "",
      color: "",
      microchip: " ",
      buyer_paid: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Naziv je obavezan!"),
      gender: Yup.string().required("Spol je obavezan!"),
      color: Yup.string().required("Boja je obavezna!"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const puppy = {
        name: values.name,
        gender: values.gender,
        color: values.color,
        microchip: values.microchip,
        buyer_paid: values.buyer_paid,
        litters: props.litter,
      };
      if (props.puppy !== null) {
        updatePuppy(props.puppy.id, puppy, authToken)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
            props.get();
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
        alert(JSON.stringify(values));
      } else {
        addPuppy(props.litterId, puppy, authToken)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
            props.get();
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
        alert(JSON.stringify(values));
      }
    },
  });
  useEffect(() => {
    if (props.puppy !== null) {
      formik.setFieldValue("name", props.puppy["name"], false);
      formik.setFieldValue("gender", props.puppy["gender"], false);
      formik.setFieldValue("color", props.puppy["color"], false);
      formik.setFieldValue("microchip", props.puppy["microchip"], false);
      formik.setFieldValue("buyer_paid", props.puppy["buyer_paid"], false);
    }
  }, []);
  return (
    <>
      {!isLoading ? (
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="name">Naziv</InputLabel>
            <InputText
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <InputError>{formik.errors.name}</InputError>
            ) : null}
          </FormOneRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="color">Boja</InputLabel>
              <SelectText
                id="color"
                type="select"
                {...formik.getFieldProps("color")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value="Tigrasto bijela">Tigrasto bijela</OptionText>
                <OptionText value="Crno bijela">Crno bijela</OptionText>
                <OptionText value="Crveno bijela">Crveno bijela</OptionText>
              </SelectText>
              {formik.touched.color && formik.errors.color ? (
                <InputError>{formik.errors.color}</InputError>
              ) : null}
            </LeftColumn>
            <RightColumn>
              <InputLabel htmlFor="gender">Spol</InputLabel>
              <SelectText
                id="gender"
                type="select"
                {...formik.getFieldProps("gender")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value={true}>Muški</OptionText>
                <OptionText value={false}>Ženski</OptionText>
              </SelectText>
              {formik.touched.gender && formik.errors.gender ? (
                <InputError>{formik.errors.gender}</InputError>
              ) : null}
            </RightColumn>
          </FormRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="microchip">Mikročip</InputLabel>
              <InputText
                id="microchip"
                type="text"
                {...formik.getFieldProps("microchip")}
              ></InputText>
              {formik.touched.microchip && formik.errors.microchip ? (
                <InputError>{formik.errors.microchip}</InputError>
              ) : null}
            </LeftColumn>
            <RightColumn>
              <InputLabel htmlFor="buyer_paid">Kupac platio</InputLabel>
              <SelectText
                id="buyer_paid"
                type="select"
                {...formik.getFieldProps("buyer_paid")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value={true}>Da</OptionText>
                <OptionText value={false}>Ne</OptionText>
              </SelectText>
              {formik.touched.buyer_paid && formik.errors.buyer_paid ? (
                <InputError>{formik.errors.buyer_paid}</InputError>
              ) : null}
            </RightColumn>
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

export default PuppyForm;
