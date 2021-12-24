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
} from './LitterFormStyle';
import {Button} from '../Button/ButtonStyle';
import { useState } from 'react/cjs/react.development';
import { getMatingsWithoutLitter } from '../../api/mating';
import { SuccessMessage } from '../../lib/style/generalStyles';
import DataLoader from '../DataLoader/DataLoader';
import { addLitter } from '../../api/litter';



const LitterForm = (props) => {

    const [matings, setMatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRequestFinished, setIsRequestFinished] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); 

    async function getMatings() {getMatingsWithoutLitter().then(items => setMatings(items))}

    useEffect(() => {
        getMatings();
      }, [])

    const formik = useFormik({
        initialValues: {
            date: '',
            mating: ''
            
        },
        validationSchema: Yup.object({
            date: Yup.string()
                .required('Date is required!'),
            mating: Yup.string()
                .required('Female is required!')
        }),
    onSubmit: (values, {resetForm}) => {
        setIsLoading(true);
            setIsRequestFinished(false);
            const litter = {
                date: values.date,
                mating: JSON.parse(values.mating)
            }
        addLitter(litter)
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
        
<Form onSubmit={formik.handleSubmit}>
                            <FormOneRow>
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
                            </FormOneRow>
                            <FormOneRow>
                                <InputLabel htmlFor='mating'>Parenje</InputLabel>
                                <SelectText
                                   
                                   id='mating'
                                   type='select'
                                   {...formik.getFieldProps('mating')}
                               >
                                {matings.map(mating =>
                                    <OptionText value={JSON.stringify(mating)}>{mating.male.name + ' ' + mating.female.name}</OptionText>
                                    )}
                               </SelectText>
                                {formik.touched.mating && formik.errors.mating
                                    ?<InputError>{formik.errors.mating}</InputError>
                                    : null
                                }
                            </FormOneRow>                                           
                            <FormRow>
                                <Button type="submit">Dodaj</Button>
                            </FormRow>
                            {isRequestFinished && <FormRow><SuccessMessage isError={isError}>{successMessage}</SuccessMessage></FormRow>}
                        </Form>
                        


           
    );
}

export default LitterForm;