import styled, {css} from 'styled-components';
import {
    colors,
    breakpoints,
    boxShadow,
    boxShadowHover
} from '../../lib/style/theme';

 export const Table = styled.table`
 border-collapse: collapse;
 margin: 25px auto;
table-layout: fixed;
 white-space:nowrap;
 max-width:100%;
 border-radius: 15px;
 overflow:hidden;
 box-shadow: ${boxShadowHover};
 `;
 export const PuppyTable = styled.table`
 border-collapse: collapse;
 margin: 25px auto;
table-layout: fixed;
 white-space:nowrap;
 max-width:100%;

 overflow:hidden;
 box-shadow: ${boxShadowHover};
 `;
export const THead = styled.thead`
  background-color: ${colors.red};
  width: 100%;
  
  
`;

export const TableBody = styled.tbody`
  width: 100%;
`;
export const TableRow = styled.tr`
width: 100%;
  :nth-of-type(even) {
    background-color: #F8F8F8;
}

`;
 export const TableHead = styled.th`
 color: ${colors.white};
 line-height: 40px;
 padding: 12px 15px;
 width: 15%;
 text-align: left;
 @media screen and (max-width: 576px) {
 :nth-child(n+3):nth-child(-n+7){
   display: none;
 }
}
 @media screen and (${breakpoints.mobileLarge}) and (max-width: 768px) {
  :nth-child(n+4):nth-child(-n+6){
    display: none;
  }
 }
 `;

 export const TableData = styled.td`
 padding: 12px 15px;
 line-height: 40px;
 width: 15%;
 text-align: left;
 @media screen and (max-width: 576px) {
  :nth-child(n+3):nth-child(-n+7){
    display: none;
  }
}
  @media screen and (${breakpoints.mobileLarge}) and (max-width: 768px) {
    :nth-child(n+4):nth-child(-n+6){
      display: none;
    }
   }
   ${props => props.inside === true && css`
   column-span: all;
   `
       
   }
 `;

 export const DeleteTableData = styled.td`
 padding: 12px 15px;
 line-height: 40px;
 width: 15%;
 text-align: left;
 padding-top:20px;
 :hover{
   color:${colors.red}
 }
 `;

 export const Text = styled.p`
  text-align:center;
  padding: 12px 15px;
 `;

 export const PuppyWrapper = styled.div`


 `;