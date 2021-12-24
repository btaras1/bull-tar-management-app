import React, {useEffect}  from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    InputTextArea,
    FormOneRow
} from './MatingFormStyle';
import {Button} from '../Button/ButtonStyle';
import { useState } from 'react/cjs/react.development';
import { getAllMales } from '../../api/male';
import { getAllFemales } from '../../api/female';
import { SuccessMessage } from '../../lib/style/generalStyles';
import DataLoader from '../DataLoader/DataLoader';
import { addMating } from '../../api/mating';



const MatingForm = (props) => {

    const [mating, setMating] = useState(null);
    const [males, setMales] = useState([]);
    const [females, setFemales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRequestFinished, setIsRequestFinished] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); 

    async function getMales() {;getAllMales().then(items => setMales(items));}
    async function getFemales() {getAllFemales().then(items => setFemales(items));}
    useEffect(() => {
      getMales();
      getFemales();
    }, [])

    const formik = useFormik({
        initialValues: {
            id: '',
            male: '',
            female: '',
            date: ''
        },
        validationSchema: Yup.object({
            male: Yup.string()
                .required('Male is required!'),
            female: Yup.string()
                .required('Female is required!'),
            date: Yup.string()
                .required('Date is required!')
        }),
    onSubmit: (values, {resetForm}) => {
        setIsLoading(true);
            setIsRequestFinished(false);
            const mating = {
                date: values.date,
                male: JSON.parse(values.male),
                female: JSON.parse(values.female)
            }
        addMating(mating)
                .then(res => {
                    resetForm({});
                    setIsLoading(false);
                    setIsRequestFinished(true);
                    setIsError(false);
                    setSuccessMessage('User is registered successfully !');
                    setTimeout(() => {
                    setIsRequestFinished(false);
                    }, 4000);
                    props.get();
                })
                .catch(err => {
                    setIsLoading(false);
                    setIsRequestFinished(true);
                    setIsError(true);
                    setSuccessMessage('User registration failed!');
                })
                setIsLoading(false);
            alert(JSON.stringify(values));
    },
    })
    return(
        <>
    
        {!isLoading ? (
<Form onSubmit={formik.handleSubmit}>
                            <FormOneRow>
                                <InputLabel htmlFor='male'>Mužjak</InputLabel>
                                <SelectText
                                    id='male'
                                    type='select'
                                    {...formik.getFieldProps('male')}
                                >
                                {males.map(dog => 
                                    <OptionText value={JSON.stringify(dog)}>{dog.name}</OptionText>
                                    )}
                                    
                                </SelectText>
                                {formik.touched.male && formik.errors.male
                                    ?<InputError>{formik.errors.male}</InputError>
                                    : null
                                }
                            </FormOneRow>
                            <FormOneRow>
                                <InputLabel htmlFor='female'>Ženka</InputLabel>
                                <SelectText
                                   
                                   id='female'
                                   type='select'
                                   {...formik.getFieldProps('female')}
                               >
                                   {females.map(dog => 
                                    <OptionText value={JSON.stringify(dog)}>{dog.name}</OptionText>
                                    )}
                               </SelectText>
                                {formik.touched.female_id && formik.errors.female_id
                                    ?<InputError>{formik.errors.female}</InputError>
                                    : null
                                }
                            </FormOneRow>
                            <FormRow>
                                <LeftColumn>
                                <InputLabel htmlFor='date'>Datum</InputLabel>
                                <InputText
                                    id='date'
                                    type='date'
                                    {...formik.getFieldProps('date')}
                                >

                                </InputText>
                                {formik.touched.date && formik.errors.date
                                    ?<InputError>{formik.errors.date}</InputError>
                                    : null
                                }
                                </LeftColumn>
                            </FormRow>                                             
                            <FormRow>
                                <Button type="submit">Add event</Button>
                            </FormRow>
                            {isRequestFinished && <FormRow><SuccessMessage isError={isError}>{successMessage}</SuccessMessage></FormRow>}
                        </Form>
                        )
                        : (
                            <DataLoader />
                        )
}
</>


           
    );
}

export default MatingForm;