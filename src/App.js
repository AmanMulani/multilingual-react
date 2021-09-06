import React from 'react';
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import detectBrowserLanguage from 'detect-browser-language'
// import classNames from 'classnames'


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },

  {
    code: 'ar',
    name: 'Arablic',
    country_code: 'sau',
  },

]

function App() {

  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  const releaseDate = new Date('2021-08-25')
  const timeDifference = new Date() - releaseDate
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <div className="container">
      <h1>{detectBrowserLanguage()}</h1>
      <div className="language-select">
        <div className="d-flex justify-content-end align-items-center language-select-root">
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select language
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <span className="dropdown-item-text">{t('language')}</span>
              </li>
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <a
                    href="#"
                    className='dropdown-item'
                    onClick={() => {
                      i18next.changeLanguage(code)
                    }}
                  >
                    <span
                      className={`flag-icon flag-icon-${country_code} mx-2`}
                      style={{
                        opacity: currentLanguageCode === code ? 0.5 : 1,
                      }}
                    ></span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">{t('welcome_message')}</h1>
        <p>{t('days_since_release', { number_of_days })}</p>
        <div style={{ padding: "10px" }}>
          <label id="Name" style={{ padding: "30px" }}>{t('name')}</label>
          <TextField variant="outlined" id="Name" placeholder={t('name')}></TextField>
        </div>

        <div style={{ padding: "10px" }}>
          <label id="n" style={{ padding: "30px" }}>{t('company')}</label>
          <TextField variant="outlined" id="n" placeholder={t('company')}></TextField>
        </div>

        <div style={{ padding: "10px" }}>
          <label id="m" style={{ padding: "30px" }}>{t('address')}</label>
          <TextField variant="outlined" id="m" placeholder={t('address')}></TextField>
        </div>

        <div style={{ padding: "10px" }}>
          <label id="demo-simple-select-filled-label" style={{ padding: "30px" }}>{t('label')}</label>
          <FormControl variant="filled" className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-filled-label">{t('label')}</InputLabel> */}
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={age}
              onChange={handleChange}
              style={{
                minWidth: "210px"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>{t('option1')}</MenuItem>
              <MenuItem value={20}>{t('option2')}</MenuItem>
              <MenuItem value={30}>{t('option3')}</MenuItem>
            </Select>
          </FormControl>

        </div>


      </div>
    </div>
  );
}

export default App;
