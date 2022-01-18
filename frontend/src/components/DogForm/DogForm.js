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
import { addMale, updateMale } from "../../api/male";
import { addFemale, updateFemale } from "../../api/female";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";

const DogForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      color: "",
      dob: "",
      pedigree_name: " ",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Naziv je obavezan!"),
      color: Yup.string().required("Boja je obavezna"),
      dob: Yup.string().required("Datum je obavezan"),

      pedigree_name: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const dog = {
        name: values.name,
        color: values.color,
        dob: values.dob,
        pedigree_name: values.pedigree_name,
      };
      if (props.dog !== null) {
        if (props.gender === true) {
          updateMale(props.dog.id, dog, authToken)
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
        } else if (props.gender === false) {
          updateFemale(props.dog.id, dog, authToken)
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
              setSuccessMessage("Došlo je do greške");
            });
          setIsLoading(false);
        }
      } else {
        if (props.gender === true) {
          addMale(dog, authToken)
            .then((res) => {
              resetForm({});
              setIsLoading(false);
              setIsRequestFinished(true);
              setIsError(false);
              setSuccessMessage("Uspješno ste dodali novog psa!");
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
        } else if (props.gender === false) {
          addFemale(dog, authToken)
            .then((res) => {
              resetForm({});
              setIsLoading(false);
              setIsRequestFinished(true);
              setIsError(false);
              setSuccessMessage("Uspješno ste dodali novog psa!");
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
        }
      }
    },
  });
  useEffect(() => {
    if (props.dog !== null) {
      const fields = ["id", "name", "color", "dob", "pedigree_name"];
      fields.forEach((field) =>
        formik.setFieldValue(field, props.dog[field], false)
      );
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
          <FormOneRow>
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
          </FormOneRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="dob">Datum rođenja</InputLabel>
              <InputText
                id="dob"
                type="date"
                {...formik.getFieldProps("dob")}
              ></InputText>
              {formik.touched.dob && formik.errors.dob ? (
                <InputError>{formik.errors.dob}</InputError>
              ) : null}
            </LeftColumn>
            <RightColumn>
              <InputLabel htmlFor="pedigree_name">Pedigree</InputLabel>
              <InputText
                id="pedigree_name"
                type="text"
                {...formik.getFieldProps("pedigree_name")}
              />
              {formik.touched.pedigree_name && formik.errors.pedigree_name ? (
                <InputError>{formik.errors.pedigree_name}</InputError>
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

export default DogForm;
