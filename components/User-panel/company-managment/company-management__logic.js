import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import AUTH from '../../../API/authorisation'
import GET from '../../../API/get'
import POST from '../../../API/post'
import { setPopupWindowActive, logoutUser } from '../../../Redux/actions'

const CompanyManagementLogic = ({ render }) => {

  const [ companies, setCompanies ] = useState([]);
  const [ employers, setEmployers ] = useState([]);
  const [ employeesWindow, setEmployeesWindow ] = useState({
    isActive: false,
    owners: [],
    employees: [],
    company: ''
  });
  const [ jobAdsWindow, setJobAdsWindow ] = useState({
    isActive: false,
    companyID: '',
    jobAds: []
  });
  const [ isLoading, setLoading ] = useState({
    deleteCompany: false,
    archivise: false
  });
  const [ isArchiviseActive, setArchiviseActive ] = useState({
    bool: false,
    id: ''
  });

  const dispatch = useDispatch();
  const language = useSelector( s => s.language.source );

  const getUserCompanies = async() => {
    const authorisation = await AUTH();

    if( authorisation.status === 'authorised' ){
      const userCompanies = await GET( `get-user-companies/${ authorisation.username }` );
      setCompanies( userCompanies.companies );
    }
    else{
      dispatch( setPopupWindowActive({
        title: language.general.popups.wrong.title,
        messenge: language.general.popups.wrong.messenge
      }) );
      dispatch( logoutUser() );
    }
  }

  const getUserEmployers = async() => {
    const authorisation = await AUTH();

    if( authorisation.status === 'authorised' ){
      const userCompanies = await GET( `get-user-employers/${ authorisation.username }` );
      setEmployers( userCompanies.companies );
    }
    else{
      dispatch( setPopupWindowActive({
        title: language.general.popups.wrong.title,
        messenge: language.general.popups.wrong.messenge
      }) );
      dispatch( logoutUser() );
    }
  }

  const handleEmployeeListButton = ( owners, employees, company ) => {
    
    if( employeesWindow.isActive ){
      const window = {
        ...employeesWindow,
        isActive: false,
        owners: [],
        employees: [],
        company: ''
      }
      setEmployeesWindow( window );
    }
    else{
      const window = {
        ...employeesWindow,
        isActive: true,
        owners,
        employees,
        company
      }
      setEmployeesWindow( window );
    }
  }

  const handleAddOwnerButton = async ( nick, company ) => {
    
    const data = await POST( 'add-shareholder', {
      username: nick,
      company
    } );

    if( data.status === 'ok' ){
      const index = employeesWindow.employees.indexOf( nick );
      const newEmployees = [ ...employeesWindow.employees ];
      newEmployees.splice( index, 1 );

      const window = {
        ...employeesWindow,
        owners: [ ...employeesWindow.owners, nick ],
        employees: newEmployees
      }

      setEmployeesWindow( window );
    }
    
  }

  const handleRemoveOwnerButton = async ( nick, company ) => {
    const data = await POST( 'remove-shareholder', {
      username: nick,
      company
    } );

    if( data.status === 'removed' ){
      const index = employeesWindow.owners.indexOf( nick );
      const newOwners = [ ...employeesWindow.owners ];
      newOwners.splice( index, 1 );

      const window = {
        ...employeesWindow,
        owners: newOwners,
        employees: [ ...employeesWindow.employees, nick ]
      }

      setEmployeesWindow( window );
    }
  }
  
  const handleRemoveEmployeeButton = async ( nick, company ) => {
    const data = await POST( 'remove-user-from-company', {
      username: nick,
      company
    } );

    if( data.status === 'deleted' ){
      const index = employeesWindow.employees.indexOf( nick );
      const newEmployees = [ ...employeesWindow.employees ];
      newEmployees.splice( index, 1 );

      const window = {
        ...employeesWindow,
        employees: newEmployees
      }

      setEmployeesWindow( window );
    }
  }

  const handleDeleteCompanyButton = async ( id, logo ) => {
    setLoading({ ...isLoading, deleteCompany: true });
    const deleteData = await POST( 'delete-company', { id, logo } );
    if( deleteData.status === 'deleted' ){
      setLoading({ ...isLoading, deleteCompany: false });
      getUserCompanies();
    }
  }

  const handleManageJobAdsButton = async ( companyID, close ) => {
    if( close ) setJobAdsWindow({ ...jobAdsWindow, isActive: false });
    else{
      const ads = await GET( `get-job-ads/${ companyID }` );

      console.log( ads.ads );

      setJobAdsWindow({
        ...jobAdsWindow,
        isActive: true,
        companyID,
        jobAds: ads.ads
      });
    }
  }

  const handleArchiviseJobAd = ( adID, cancel ) => {
    
    if( cancel ) setArchiviseActive({ bool: false, id: '' }); // use if button 'cancel' has been clicked
    else{
      if( isArchiviseActive.bool && adID !== isArchiviseActive.id ){
        // if other option is under archivisation
        setArchiviseActive({ ...isArchiviseActive, id: adID });
      }
      else if( isArchiviseActive.bool ){
        // use if button 'yes' has been clicked
        return async () => {
          setLoading({ ...isLoading, archivise: true });
          const archivise = await POST( 'archive-job-ad', { id: adID } );
          if( archivise.status === 'ok' ){
            const ads = await GET( `get-job-ads/${ jobAdsWindow.companyID }` );
            setJobAdsWindow({
              ...jobAdsWindow,
              isActive: true,
              jobAds: ads.ads
            });
            setArchiviseActive({ bool: false, id: '' });
            setLoading({ ...isLoading, archivise: false });
          }
        }
      }
      else{ // use if icon 'archivise' has been clicked
        setArchiviseActive({ bool: true, id: adID });
      }
    }
  }

  useEffect(
    () => {
      getUserCompanies();
      getUserEmployers();
    },
    []
  );

  return render({
    state: {
      companies,
      employers,
      employeesWindow,
      isLoading,
      jobAdsWindow,
      isArchiviseActive
    },
    handlers: {
      handleEmployeeListButton,
      handleAddOwnerButton,
      handleRemoveOwnerButton,
      handleRemoveEmployeeButton,
      handleDeleteCompanyButton,
      handleManageJobAdsButton,
      handleArchiviseJobAd
    }
  })
}

CompanyManagementLogic.propTypes = {
  render: PropTypes.func.isRequired
}

export default CompanyManagementLogic;