import React from 'react'
import './css/Modals.css'
import googleSearch from "./../assets/google-apps/google-apps-1/google-search.png"
import googleMap from "./../assets/google-apps/google-apps-1/google-map.png"
import youtube from "./../assets/google-apps/google-apps-1/youtube.png"
import googlePlayStore from "./../assets/google-apps/google-apps-1/google-playStore.png"
import googleNews from "./../assets/google-apps/google-apps-1/google-news.png"
import googleMail from "./../assets/google-apps/google-apps-1/google-mail.png"
import googleMeet from "./../assets/google-apps/google-apps-1/google-meet.png"
import googleContact from "./../assets/google-apps/google-apps-1/google-contact.png"
import googleDrive from "./../assets/google-apps/google-apps-1/google-drive.png"
import googleCalendar from "./../assets/google-apps/google-apps-1/google-calendar.png"
import googleTranslate from "./../assets/google-apps/google-apps-1/google-translate.png"
import googlePhotos from "./../assets/google-apps/google-apps-1/google-photos.png"
import googleGemini from "./../assets/google-apps/google-apps-1/google-gemini.png"
function GoogleAppsModal() {
  const GOOGLE_APPS = {
    first_wrapper: [
      {
        app_icon: googleSearch,
        app_text: "search",
        style_width: "38px"
      },
      {
        app_icon: googleMap,
        app_text: "search",
        style_width: "28px"
      },
      {
        app_icon: youtube,
        app_text: "search",
        style_width: "40px"
      },
      {
        app_icon: googlePlayStore,
        app_text: "search",
        style_width: "42px"
      },
      {
        app_icon: googleNews,
        app_text: "search",
        style_width: "42px"
      },
      {
        app_icon: googleMail,
        app_text: "search",
        style_width: "58px"
      },
      {
        app_icon: googleMeet,
        app_text: "search",
             style_width: "44px"
      },
      {
        app_icon: googleContact,
        app_text: "search",
          style_width: "44px"
      },
      {
        app_icon: googleDrive,
        app_text: "search",
        style_width: "42px"
      },
      {
        app_icon: googleCalendar,
        app_text: "search",
         style_width: "63px"
      },
      {
        app_icon: googleTranslate,
        app_text: "search",
         style_width: "50px"
      },
      {
        app_icon: googlePhotos,
        app_text: "search",
         style_width: "38px"
      },
      {
        app_icon: googleGemini,
        app_text: "search",
         style_width: "42px"
      },
    ],
    second_wrapper: [
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
      {
        app_icon: googleSearch,
        app_text: "search"
      },
    ]
  }
  return (
    <div className='apps__modal'>
      <div className='apps__wrapper'>
        {
          GOOGLE_APPS.first_wrapper.map((app, key) => (
            <a key={key} href="#" className='app__container'>
              <img className='app__img' style={{ width: app.style_width, height: "auto" }} src={app.app_icon} alt="" />
              <p className='app__text'> {app.app_text} </p>
            </a>
          ))
        }
      </div>
      <div className='apps__wrapper'>
        {
          GOOGLE_APPS.second_wrapper.map((app, key) => (
            <a key={key} href="#" className='app__container'>
              <img className='app__img' src={app.app_icon} alt="" />
              <p className='app__text'> {app.app_text} </p>
            </a>
          ))
        }
      </div>



      <div className='border-btn-container app__btn-container'>
        <button className='border-btn app__btn'><a className='border-btn-link' href="https://about.google/products/" target='_blank'>Googleın diğer ürünleri</a></button>
      </div>
    </div>
  )
}

export default GoogleAppsModal