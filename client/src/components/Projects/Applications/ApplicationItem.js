import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from '../../UI/Spinner';

//Redux & Router
import {getProfileByUsername} from "../../../redux/actions/profile";
import {useDispatch, useSelector} from "react-redux";

const ApplicationItem = ({
  projectowner,
  applicantname,
  applicantusername,
  applicationtext}) => {

  const dispatch = useDispatch();
  const authData = useSelector(state => state.authenticate);
  const profileData = useSelector(state => state.profile);

  const {userData, isAuth} = authData;
  const {profiledata} = profileData;

  const [imagePrev, setImagePrev] = useState();

  const [loadedItem, setLoadedItem] = useState(false);

  const loadProfile = async () => {
    await dispatch(getProfileByUsername(applicantusername));
    setLoadedItem(true);
  }

  useEffect(() => {
    loadProfile();
    console.log('wow')
  }, [loadedItem])

  useEffect(() => {
    if (profiledata && profiledata.profileimage) {
      const fileContents = new Buffer(profiledata.profileimage, 'base64');
      setImagePrev(fileContents);
    }
  }, [profiledata])

  const hirePerson = () => {
    console.log(userData._id);
  }

  return (
    <>{!loadedItem ? <Spinner/> :

    <ApplicationBox>
      <ApplicantInfo>
      <ApplicantPicture src={imagePrev}/>
        <ApplicantName>
          {applicantname}{' '}
        <ApplicantUsername>
          @{applicantusername}
        </ApplicantUsername>
        </ApplicantName>
      </ApplicantInfo>
      <ApplicationText>
        {applicationtext}
      </ApplicationText>
      {isAuth && userData._id === projectowner &&
        <SelectApplicant
          className='button primary'
          onClick={hirePerson}
        >
          Hire
        </SelectApplicant>
      }
    </ApplicationBox>
  }</>
  )
}

export default ApplicationItem;

const ApplicationBox = styled.div`
  box-sizing: border-box;
  margin-top: 1px;
  margin-bottom: 1px;
  padding: 1rem;
  width: auto;
  height: auto;
  background-color: #EEEEEE;
  border: 1px solid #lightgray;
  border-radius: 18px;
`;

const ApplicationText = styled.div`
  margin-left: 2%;
  padding: 5px;
`;

const ApplicantInfo = styled.div`
  display: inline;
  margin-left: 2.5%;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const ApplicantPicture = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 180px;
  background-color: black;
`

const ApplicantName = styled.h2`
  font-size: 1rem;
`
const ApplicantUsername = styled.span`
  font-weight: normal;
`

const SelectApplicant = styled(Button)`
`;
