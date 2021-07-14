import React from 'react'

import './ProfileEdit.css'

import ImageUpload from './Image'

const CreateProfile = ({profileImage}) => {
  return (
    <div className='edit-box'>
      <ImageUpload />

      <div className='top-inputs'>
        <div className='top-inputs-name'>
          <input
          placeholder='Name'
          className='m-1'>
          </input>
        </div>

       <div className='top-inputs-status'>
          <input
          placeholder='Status'
          className='m-1'>
          </input>
        </div>
      </div>

      <div className='bottom-inputs'>
          <textarea
          maxLength='100'
          cols="30"
          rows="5"
          type='text'
          placeholder='Bio'
          className=''>
          </textarea>

          <input
          placeholder='Location'>
          </input>

          <input
          placeholder='Website'
          className=''>
          </input>
        </div>
      </div>
  )
}

export default CreateProfile

// profileimage={formData.profileimage}
