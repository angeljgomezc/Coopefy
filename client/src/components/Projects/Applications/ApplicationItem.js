import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

//Redux & Router
import {getProfileByUsername} from "../../../redux/actions/profile";
import {connect} from "react-redux";

const ApplicationItem = ({
  profile: {signedprofile, profile, loading},
  authenticate: {isAuth, user},
  projectowner,
  application,
  getProfileByUsername}) => {

  const {
    applicantname,
    applicantusername,
    applicantid,
    applicationtext,
    applicationdate
  } = application;

  const [imagePrev, setImagePrev] = useState();

  useEffect(() => {
    if (!profile) {
      getProfileByUsername(applicantusername);
    }

    if (profile && !imagePrev) {
      const fileContents = new Buffer(profile.profileimage, "base64");
      setImagePrev(fileContents);

      console.log(imagePrev)
    }

  }, [getProfileByUsername, application])

  const hirePerson = () => {

  }

  return (
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
      {isAuth && user._id === projectowner &&
        <SelectApplicant className='button primary'>
          Hire
        </SelectApplicant>
      }
    </ApplicationBox>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  authenticate: state.authenticate
})

export default connect(mapStateToProps, {getProfileByUsername})(ApplicationItem)

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

const ApplicantImage = styled.div`
  padding: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 180px;
  background-color: black;
`;

const SelectApplicant = styled(Button)`
`