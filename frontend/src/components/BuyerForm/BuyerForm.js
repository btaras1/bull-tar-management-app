import React, { useEffect, useState } from "react";
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
import { addBuyerToPuppy } from "../../api/puppy";
import { updateBuyer } from "../../api/buyer";
import { getAllCountries } from "../../api/country";
import { getAllCitiesByCountryId } from "../../api/city";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";

const BuyerForm = (props) => {
  const authToken = localStorage.getItem("authToken");

  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function getCountries() {
    getAllCountries(authToken).then((items) => setCountries(items));
  }
  async function fetchCities(id) {
    getAllCitiesByCountryId(authToken, id).then((items) => setCities(items));
    setIsDisabled(false);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      adress: "",
      city: "",
      mobile_number: "",
      dob: "",
      id_number: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Ime je obavezno"),
      mobile_number: Yup.string().required("Broj telefona je obavezan"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsRequestFinished(false);
      const buyer = {
        name: values.name,
        dob: values.dob,
        adress: values.adress,
        city: JSON.parse(values.city),
        mobile_number: values.mobile_number,
        id_number: values.id_number,
      };
      if (props.buyer !== null) {
        updateBuyer(props.buyer.id, buyer, authToken)
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
        addBuyerToPuppy(props.puppyId, buyer, authToken)
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
    getCountries();
    if (props.buyer !== null) {
      const fields = ["name", "dob", "adress", "mobile_number", "id_number"];
      fields.forEach((field) =>
        formik.setFieldValue(field, props.buyer[field], false)
      );
      fetchCities(props.buyer["city"].country.id);
      setCountry(props.buyer["city"].country.id);
      formik.setFieldValue("city", JSON.stringify(props.buyer["city"]), false);
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
              <InputLabel htmlFor="adress">Adresa</InputLabel>
              <InputText
                id="adress"
                type="text"
                {...formik.getFieldProps("adress")}
              />
              {formik.touched.adress && formik.errors.adress ? (
                <InputError>{formik.errors.adress}</InputError>
              ) : null}
            </LeftColumn>
            <RightColumn>
              <InputLabel htmlFor="mobile_number">Telefon</InputLabel>
              <InputText
                id="mobile_number"
                type="text"
                {...formik.getFieldProps("mobile_number")}
              />
              {formik.touched.mobile_number && formik.errors.mobile_number ? (
                <InputError>{formik.errors.mobile_number}</InputError>
              ) : null}
            </RightColumn>
          </FormRow>
          <FormRow>
            <RightColumn>
              <InputLabel htmlFor="country">Država</InputLabel>
              <SelectText
                value={country}
                onChange={(e) => fetchCities(e.target.value)}
                type="select"
              >
                <OptionText value="">--Odaberi--</OptionText>
                {countries &&
                  countries.map((country) => (
                    <OptionText key={country.id} value={country.id}>
                      {country.name}
                    </OptionText>
                  ))}
              </SelectText>
              {formik.touched.country && formik.errors.country ? (
                <InputError>{formik.errors.country}</InputError>
              ) : null}
            </RightColumn>
            <LeftColumn>
              <InputLabel htmlFor="city">Grad</InputLabel>
              <SelectText
                disabled={isDisabled}
                id="city"
                type="select"
                {...formik.getFieldProps("city")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                {cities &&
                  cities.map((city) => (
                    <OptionText value={JSON.stringify(city)}>
                      {city.name}
                    </OptionText>
                  ))}
              </SelectText>
              {formik.touched.city && formik.errors.city ? (
                <InputError>{formik.errors.city}</InputError>
              ) : null}
            </LeftColumn>
          </FormRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="dobb">Datum</InputLabel>
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
              <InputLabel htmlFor="id_number">oib</InputLabel>
              <InputText
                id="id_number"
                type="text"
                {...formik.getFieldProps("id_number")}
              />
              {formik.touched.id_number && formik.errors.id_number ? (
                <InputError>{formik.errors.id_number}</InputError>
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

export default BuyerForm;
