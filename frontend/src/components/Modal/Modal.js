import {ModalWrapper, FormWrapper,FormRow, Title} from './ModalStyle'
import { GrClose } from 'react-icons/gr'
const Modal = (props) => {

    return(
        <>
        <ModalWrapper>
        <FormWrapper>
            <FormRow>
                    <Title>{props.title}</Title>
                    <GrClose onClick={()=>props.setModal()}/>
            </FormRow>
            <FormRow>
            </FormRow>
        </FormWrapper>
        </ModalWrapper>
        </>
    );
}
export default Modal;