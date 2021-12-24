import React  from 'react';
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
    FormOneRow
} from './DogFormStyle';
import {Button} from '../Button/ButtonStyle';
import { useState } from 'react/cjs/react.development';
import { addMale } from '../../api/male';
import { addFemale } from '../../api/female';
import { SuccessMessage } from '../../lib/style/generalStyles';
import DataLoader from '../DataLoader/DataLoader';


const DogForm = (props) => {


    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRequestFinished, setIsRequestFinished] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); 

    const formik = useFormik({
    
        initialValues: {

            id: '',
            name: '',
            color: '',
            dob: '',
            pedigree_name: ''
        
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required!'),
            color: Yup.string()
                .required('Color is required!'),
            dob: Yup.string()
                .required('Date of birth is required!'),
            pedigree_name: Yup.string()
                .required('Pedigree_name is required')
        }),
        onSubmit: (values, {resetForm}) => {
            setIsLoading(true);
            setIsRequestFinished(false);
            const dog = {
                name: values.name,
                color: values.color,
                dob: values.dob,
                pedigree_name: values.pedigree_name
            }
            if(props.gender===true){
            addMale(dog)
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
            }
            else if (props.gender===false){
                addFemale(dog)
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
            }
            
        },
        })
    return(
        <>
    
        {!isLoading ? (
            
                        <Form onSubmit={formik.handleSubmit}>
                            <FormOneRow>
                                <InputLabel htmlFor='title'>Naziv</InputLabel>
                                <InputText
                                    id='name'
                                    type='text'
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name
                                    ?<InputError>{formik.errors.name}</InputError>
                                    : null
                                }
                            </FormOneRow>
                            <FormOneRow>
                                <InputLabel htmlFor='description'>Boja</InputLabel>
                                <SelectText
                                   
                                   id='color'
                                   type='select'
                                   {...formik.getFieldProps('color')}
                               >
                                   <OptionText value="Tigrasto bijela">Tigrasto bijela</OptionText>
                                   <OptionText value="Crno bijela">Crno bijela</OptionText>
                                   <OptionText value="Crveno bijela">Crveno bijela</OptionText>
                               </SelectText>
                                {formik.touched.color && formik.errors.color
                                    ?<InputError>{formik.errors.color}</InputError>
                                    : null
                                }
                            </FormOneRow>
                            <FormRow>
                                <LeftColumn>
                                <InputLabel htmlFor='date'>Datum rođenja</InputLabel>
                                <InputText
                                    id='dob'
                                    type='date'
                                    {...formik.getFieldProps('dob')}
                                >

                                </InputText>
                                {formik.touched.date && formik.errors.date
                                    ?<InputError>{formik.errors.date}</InputError>
                                    : null
                                }
                                </LeftColumn>
                                <RightColumn>
                                <InputLabel htmlFor='text'>Pedigree</InputLabel>
                                <InputText
                                    id='pedigree_name'
                                    type='text'
                                    {...formik.getFieldProps('pedigree_name')}
                                />
                                {formik.touched.pedigree_name && formik.errors.pedigree_name
                                    ?<InputError>{formik.errors.pedigree_name}</InputError>
                                    : null
                                }
                                </RightColumn>
                            </FormRow>                                             
                            <FormRow>
                                <Button type="submit">Dodaj</Button>
                            </FormRow>
                       
                            {isRequestFinished && <FormRow><SuccessMessage isError={isError}>{successMessage}</SuccessMessage></FormRow>}
                        </Form> )
                        : (
                            <DataLoader />
                        )
        }

</>
           
    );
}

export default DogForm;