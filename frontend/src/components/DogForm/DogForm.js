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
    InputTextArea,
    FormOneRow
} from './DogFormStyle';
import {Button} from '../Button/ButtonStyle';
import { useState } from 'react/cjs/react.development';



const DogForm = (props) => {

    const [dog, setDog] = useState(null);

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
    onSubmit: values => {
        values["id"]=22;
        console.log(values);
        setDog([values]);
        console.log(props.addPressed);
        props.setAddPressed(!props.addPressed);
        console.log(dog);
    },
    })
    return(
        
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
                                <Button type="submit">Add event</Button>
                            </FormRow>
                        </Form>
                        


           
    );
}

export default DogForm;