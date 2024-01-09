
// import { useState } from 'react';
// import { Menu, MenuItem, Button } from '@material-ui/core';
import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MedicationIcon from '@mui/icons-material/Medication';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from 'react-router-dom';


const StyledContainer = styled.div`
  width: 80%;
  height: 50px;
  position: relative;
  background: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: black;
    cursor: pointer;

    svg {
      color: white;
    }

    span {
      color: white;
    }
  }
`;

const StyledSubContainer = styled.div`
  width: 60%;
  height: 50px;
  position: relative;
  background: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: black;
    cursor: pointer;

    svg {
      color: white;
    }

    span {
      color: white;
    }
  }
`;

const StyledMedicationIcon = styled(MedicationIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 2rem;
  color: black;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 2rem;
  color: black;
`;

const StyledGavelIcon = styled(GavelIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 1.7rem;
  color: black;
`;

const StyledDescriptionIcon = styled(DescriptionIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 1.7rem;
  color: black;
`;

const StyledQuestionMarkIcon = styled(QuestionMarkIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 2rem;
  color: black;
`;

const StyledHowToRegIcon = styled(HowToRegIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 2rem;
  color: black;
`;

const StyledReceiptLongIcon = styled(ReceiptLongIcon)`
  position: absolute;
  top: 15%;
  left: 15%;
  font-size: 1.7rem;
  color: black;
`;

const StyledText = styled.span`
  margin-left: 40px;
  position: absolute;
  top: 25%;
  left: 20%;
  user-select: none;
  font-size: 16px;
  color: black;
`;

const StyledSubText = styled.span`
  margin-left: 40px;
  position: absolute;
  top: 25%;
  left: 20%;
  user-select: none;
  font-size: 14px;
  color: black;
`;

const Menu = () => {
    const navigate = useNavigate();

    return(
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', border: 1 }}>
            <StyledContainer onClick={() => {navigate("/器官捐贈移植")}}>
                <StyledFavoriteIcon />
                <StyledText>器官捐贈移植</StyledText>
            </StyledContainer>
            <StyledSubContainer onClick={() => {window.open('https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=L0020024', '_blank');}}>
                <StyledGavelIcon />
                <StyledSubText>法令規章</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/器官捐贈移植/相關文件")}}>
                <StyledDescriptionIcon />
                <StyledSubText>相關文件</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/器官捐贈移植/常見問答")}}>
                <StyledQuestionMarkIcon />
                <StyledSubText>常見問答</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/器官捐贈移植/線上申請")}}>
                <StyledHowToRegIcon />
                <StyledSubText>線上申請</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/器官捐贈移植/申請紀錄")}}>
                <StyledReceiptLongIcon />
                <StyledSubText>申請紀錄</StyledSubText>
            </StyledSubContainer>
            <StyledContainer>
                <StyledMedicationIcon />
                <StyledText>病人自主及安寧緩和</StyledText>
            </StyledContainer>
            <StyledSubContainer onClick={() => {window.open('https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=L0020024', '_blank');}}>
                <StyledGavelIcon />
                <StyledSubText>法令規章</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/病人自主及安寧緩和/相關文件")}}>
                <StyledDescriptionIcon />
                <StyledSubText>相關文件</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/病人自主及安寧緩和/常見問答")}}>
                <StyledQuestionMarkIcon />
                <StyledSubText>常見問題</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer>
                <StyledHowToRegIcon onClick={() => {navigate("/器官捐贈移植/線上申請")}}/>
                <StyledSubText>線上申請</StyledSubText>
            </StyledSubContainer>
            <StyledSubContainer onClick={() => {navigate("/器官捐贈移植/申請紀錄")}}>
                <StyledReceiptLongIcon />
                <StyledSubText>申請紀錄</StyledSubText>
            </StyledSubContainer>
          </div>

    );
}

export default Menu;