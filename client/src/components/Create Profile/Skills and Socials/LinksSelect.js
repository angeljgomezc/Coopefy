import React, {useState} from 'react'

//UI and Styles
import './LinksSelect.css'
import Button from '../../UI/Button'

//Redux
import {profileLinks} from '../../../redux/actions/profile';
import {connect} from 'react-redux';

const LinksSelect = ({profileLinks, unSelectLinks, selectedLinks}) => {

  const [formData, setFormData] = useState({
    facebook: '',
    instagram: '',
    github: '',
    linkedin: '',
    twitter: '',
    behance: '',
    dribbble: '',
    producthunt: ''
  });

  const {
  github,
  instagram,
  linkedin,
  facebook,
  twitter,
  behance,
  dribbble,
  producthunt
  } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    profileLinks(formData);
  }

  return (
  <div>
    <div onClick={unSelectLinks} className='link-backdrop'>
    </div>

      <div className='links-select'>
        <div className='links-box'>
        <header>Add Links</header>

          <form className='links-inputs'>
            <small>Add your ID or Username only</small>
            <br></br>
            <i className="fab fa-product-hunt"></i>
            <input name='producthunt' value={producthunt} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-github-square"></i>
            <input name='github' value={github} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-twitter-square"></i>
            <input name='twitter' value={twitter} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-behance-square"></i>
            <input name='behance' value={behance} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-dribbble-square"></i>
            <input name='dribbble' value={dribbble} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-facebook-square"></i>
            <input name='facebook' value={facebook} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-instagram-square"></i>
            <input name='instagram' value={instagram} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-linkedin-square"></i>
            <input name='linkedin' value={linkedin} onChange={e => onChange(e)}></input>

            <div className='links-buttons'>
              <Button
                className='primary'
                onClick={e => onSubmit(e)}
                >
                Add Links
              </Button>
              <Button
                className='bad'
                onClick={unSelectLinks}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
    </div>
  </div>
  )
}

export default connect(null, {profileLinks})(LinksSelect)
