import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size:16px;
background: transparent;
border:2px solid var(--lightPink);
color:var(--lightPink);
border-radius:5px;
padding:2px 5px;
cursor:pointer;
margin:10px;
transition:all 0.5s ease-in-out;
&:hover{
    background: var(--lightPink);
    color:var(--mainDark)
}
&:focus {
    outline:none
}
`;