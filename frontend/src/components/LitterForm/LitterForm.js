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
  FormOneRow,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { getMatingsWithoutLitter } from "../../api/mating";
import { SuccessMessage } from "../../lib/style/generalStyles";
import { addLitter, updateLitter } from "../../api/litter";
import DataLoader from "../DataLoader/DataLoader";

const LitterForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [matings, setMatings] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function getMatings() {
    getMatingsWithoutLitter(authToken).then((items) => setMatings(items));
  }

  useEffect(() => {
    getMatings();
  }, []);

  const formik = useFormik({
    initialValues: {
      date: "",
      mating: "",
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Datum je obavezan!"),
      mating: Yup.string().required("Odaberite parenje"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const litter = {
        date: values.date,
        mating: JSON.parse(values.mating),
      };
      if (props.litter !== null) {
        updateLitter(props.litter.id, litter, authToken)
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
        addLitter(litter, authToken)
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
    if (props.litter !== null) {
      const newList = matings;
      newList.push(props.litter.mating);
      setMatings(newList);
      formik.setFieldValue(
        "mating",
        JSON.stringify(props.litter["mating"]),
        false
      );
      formik.setFieldValue("date", props.litter["date"], false);
    }
  }, [matings]);
  return (
    <>
      {!isLoading ? (
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="date">Datum</InputLabel>
            <InputText
              id="date"
              type="date"
              {...formik.getFieldProps("date")}
            ></InputText>
            {formik.touched.date && formik.errors.date ? (
              <InputError>{formik.errors.date}</InputError>
            ) : null}
          </FormOneRow>
          <FormOneRow>
            <InputLabel htmlFor="mating">Parenje</InputLabel>
            <SelectText
              id="mating"
              type="select"
              {...formik.getFieldProps("mating")}
            >
              <OptionText value="">--Odaberi--</OptionText>
              {matings.map((mating) => (
                <OptionText value={JSON.stringify(mating)}>
                  {mating.male.name + " " + mating.female.name}
                </OptionText>
              ))}
            </SelectText>
            {formik.touched.mating && formik.errors.mating ? (
              <InputError>{formik.errors.mating}</InputError>
            ) : null}
          </FormOneRow>
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

export default LitterForm;
