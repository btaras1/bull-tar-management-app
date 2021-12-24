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
} from './PuppyFormStyle';
import {Button} from '../Button/ButtonStyle';
import { useState } from 'react/cjs/react.development';



const PuppyForm = (props) => {

    const [dog, setDog] = useState(null);

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            gender: '',
            color: '',
            microchip: '',
            buyer_paid:'',
            buyer_name: '',
            adress: '',
            mobile_number:'',
            id_number:''
        },
        validationSchema: Yup.object({
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
                                <InputLabel htmlFor='name'>Naziv</InputLabel>
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
                            <FormRow>
                                <LeftColumn>
                                <InputLabel htmlFor='color'>Boja</InputLabel>
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
                                </LeftColumn>
                                <RightColumn>
                                <InputLabel htmlFor='gender'>Spol</InputLabel>
                                <SelectText
                                   
                                   id='gender'
                                   type='select'
                                   {...formik.getFieldProps('gender')}
                               >
                                   <OptionText value="true">Muški</OptionText>
                                   <OptionText value="false">Ženski</OptionText>
                               </SelectText>
                                {formik.touched.gender && formik.errors.gender
                                    ?<InputError>{formik.errors.gender}</InputError>
                                    : null
                                }
                                </RightColumn>
                            </FormRow>
                            <FormRow>
                                <LeftColumn>
                                <InputLabel htmlFor='microchip'>Mikročip</InputLabel>
                                <InputText
                                    id='microchip'
                                    type='text'
                                    {...formik.getFieldProps('microchip')}
                                >

                                </InputText>
                                {formik.touched.microchip && formik.errors.microchip
                                    ?<InputError>{formik.errors.microchip}</InputError>
                                    : null
                                }
                                </LeftColumn>
                                <RightColumn>
                                <InputLabel htmlFor='buyer_paid'>Kupac platio</InputLabel>
                                <SelectText
                                   
                                   id='buyer_paid'
                                   type='select'
                                   {...formik.getFieldProps('buyer_paid')}
                               >
                                   <OptionText value="true">Da</OptionText>
                                   <OptionText value="false">Ne</OptionText>
                               </SelectText>
                               {formik.touched.buyer_paid && formik.errors.buyer_paid
                                    ?<InputError>{formik.errors.buyer_paid}</InputError>
                                    : null
                                }
                                </RightColumn>
                            </FormRow>
                            <FormRow>
                                <LeftColumn>
                                <InputLabel htmlFor='buyer_name'>Naziv kupca</InputLabel>
                                <InputText
                                   
                                   id='buyer_name'
                                   type='text'
                                   {...formik.getFieldProps('colbuyer_nameor')}
                               >
                               </InputText>
                                {formik.touched.buyer_name && formik.errors.buyer_name
                                    ?<InputError>{formik.errors.buyer_name}</InputError>
                                    : null
                                }
                                </LeftColumn>
                                <RightColumn>
                                <InputLabel htmlFor='adress'>Adresa</InputLabel>
                                <InputText
                                   
                                   id='adress'
                                   type='text'
                                   {...formik.getFieldProps('adress')}
                               >

                               </InputText>
                                {formik.touched.adress && formik.errors.adress
                                    ?<InputError>{formik.errors.adress}</InputError>
                                    : null
                                }
                                </RightColumn>
                            </FormRow>
                            <FormRow>
                                <LeftColumn>
                                <InputLabel htmlFor='mobile_number'>Broj mobitela</InputLabel>
                                <InputText
                                   
                                   id='mobile_number'
                                   type='text'
                                   {...formik.getFieldProps('mobile_number')}
                               >
                               </InputText>
                                {formik.touched.mobile_number && formik.errors.mobile_number
                                    ?<InputError>{formik.errors.mobile_number}</InputError>
                                    : null
                                }
                                </LeftColumn>
                                <RightColumn>
                                <InputLabel htmlFor='id_number'>OIB</InputLabel>
                                <InputText
                                   
                                   id='id_number'
                                   type='text'
                                   {...formik.getFieldProps('id_number')}
                               >
                               </InputText>
                                {formik.touched.id_number && formik.errors.id_number
                                    ?<InputError>{formik.errors.id_number}</InputError>
                                    : null
                                }
                                </RightColumn>
                            </FormRow>                                   
                            <FormRow>
                                <Button type="submit">Dodaj</Button>
                            </FormRow>
                        </Form>
                        


           
    );
}

export default PuppyForm;