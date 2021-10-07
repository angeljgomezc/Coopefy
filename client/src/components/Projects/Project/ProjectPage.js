import React, {useState, useEffect} from 'react'

//UI & CSS
import './ProjectPage.css'
import Spinner from '../../UI/Spinner'
import Error404 from '../../UI/Error404'

//Redux & Router
import {getProjectById} from '../../../redux/actions/project';
import {connect} from 'react-redux';

const Project = ({project: {project, loading}, match, getProjectById}) => {

  const getProjectData = async () => {
    getProjectById(match.params.id);
    setLoadProject(true)
    console.log(project);
  }

  const [loadProject, setLoadProject] = useState(false);

  useEffect(() => {
    getProjectData();
  }, [project])

  return (
    <div>
      {!loadProject ? <Spinner/> :
        <>
        {project ?

        <div className='project-box'>

          {project.projectname}

        </div>
         : <Error404/>}
        </>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})
export default connect(mapStateToProps, {getProjectById})(Project)
