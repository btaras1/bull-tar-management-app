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
  LeftColumn,
  FormOneRow,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { getAllMales } from "../../api/male";
import { getAllFemales } from "../../api/female";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import { addMating, updateMating } from "../../api/mating";

const MatingForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function getMales() {
    getAllMales(authToken).then((items) => setMales(items));
  }
  async function getFemales() {
    getAllFemales(authToken).then((items) => setFemales(items));
  }
  useEffect(() => {
    getMales();
    getFemales();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      male: "",
      female: "",
      date: "",
    },
    validationSchema: Yup.object({
      male: Yup.string().required("Odaberite mužjaka!"),
      female: Yup.string().required("Odaberite ženku!"),
      date: Yup.string().required("Datum je obavezan!"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const mating = {
        date: values.date,
        male: JSON.parse(values.male),
        female: JSON.parse(values.female),
      };
      if (props.mating !== null) {
        updateMating(props.mating.id, mating, authToken)
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
      } else {
        addMating(mating, authToken)
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
      }
    },
  });
  useEffect(() => {
    if (props.mating !== null) {
      formik.setFieldValue("male", JSON.stringify(props.mating["male"]), false);
      formik.setFieldValue(
        "female",
        JSON.stringify(props.mating["female"]),
        false
      );
      formik.setFieldValue("date", props.mating["date"], false);
    }
  }, []);
  return (
    <>
      {!isLoading ? (
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="male">Mužjak</InputLabel>
            <SelectText
              id="male"
              type="select"
              {...formik.getFieldProps("male")}
            >
              <OptionText value="">--Odaberi--</OptionText>
              {males.map((dog) => (
                <OptionText value={JSON.stringify(dog)}>{dog.name}</OptionText>
              ))}
            </SelectText>
            {formik.touched.male && formik.errors.male ? (
              <InputError>{formik.errors.male}</InputError>
            ) : null}
          </FormOneRow>
          <FormOneRow>
            <InputLabel htmlFor="female">Ženka</InputLabel>
            <SelectText
              id="female"
              type="select"
              {...formik.getFieldProps("female")}
            >
              <OptionText value="">--Odaberi--</OptionText>
              {females.map((dog) => (
                <OptionText value={JSON.stringify(dog)}>{dog.name}</OptionText>
              ))}
            </SelectText>
            {formik.touched.female && formik.errors.female ? (
              <InputError>{formik.errors.female}</InputError>
            ) : null}
          </FormOneRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="date">Datum</InputLabel>
              <InputText
                id="date"
                type="date"
                {...formik.getFieldProps("date")}
              ></InputText>
              {formik.touched.date && formik.errors.date ? (
                <InputError>{formik.errors.date}</InputError>
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

export default MatingForm;
