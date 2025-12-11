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

import googleSheets from "./../assets/google-apps/google-apps-2/google-sheets.png"
import googleDocs from "./../assets/google-apps/google-apps-2/google-docs.png"
import googleSlides from "./../assets/google-apps/google-apps-2/google-slides.png"
import googleOne from "./../assets/google-apps/google-apps-2/google-one.png"
import googleShopping from "./../assets/google-apps/google-apps-2/google-shopping.png"
import googleFinance from "./../assets/google-apps/google-apps-2/google-finance.png"
import googleKeep from "./../assets/keep-icon.png"
import googleEarth from "./../assets/google-apps/google-apps-2/google-earth.png"
import googleForms from "./../assets/google-apps/google-apps-2/google-forms.png"
import googleCulture from "./../assets/google-apps/google-apps-2/google-culture.png"
import googleClassroom from "./../assets/google-apps/google-apps-2/google-classroom.png"
import googleChromeWeb from "./../assets/google-apps/google-apps-2/google-chrome-web.png"
import googleBooks from "./../assets/google-apps/google-apps-2/google-books.png"
import googleAnalytics from "./../assets/google-apps/google-apps-2/google-analytics.png"
import googleAds from "./../assets/google-apps/google-apps-2/google-ads.png"
import googleBlogger from "./../assets/google-apps/google-apps-2/google-blogger.png"
import googleWallet from "./../assets/google-apps/google-apps-2/google-wallet.png"

function GoogleAppsModal() {
  const GOOGLE_APPS = {
    first_wrapper: [
      {
        app_icon: googleSearch,
        app_text: "search",
        style_width: "38px",
        app_link: "https://www.google.com/"
      },
      {
        app_icon: googleMap,
        app_text: "Maps",
        style_width: "28px",
        app_link: "https://www.google.com/maps?authuser=0"
      },
      {
        app_icon: youtube,
        app_text: "youtube",
        style_width: "40px",
        app_link: "https://www.youtube.com/?authuser=0"
      },
      {
        app_icon: googlePlayStore,
        app_text: "play",
        style_width: "42px",
        app_link: "http://play.google.com/store/games"
      },
      {
        app_icon: googleNews,
        app_text: "news",
        style_width: "42px",
        app_link: "https://www.google.com/maps?authuser=0"
      },
      {
        app_icon: googleMail,
        app_text: "gmail",
        style_width: "58px",
        app_link: "https://mail.google.com/mail/u/0/"

      },
      {
        app_icon: googleMeet,
        app_text: "meet",
        style_width: "44px",
        app_link: "https://meet.google.com/landing?hs=197&authuser=0"
      },
      {
        app_icon: googleContact,
        app_text: "contact",
        style_width: "44px",
        app_link: "https://contacts.google.com/"
      },
      {
        app_icon: googleDrive,
        app_text: "drive",
        style_width: "42px",
        app_link: "https://drive.google.com/drive/home"
      },
      {
        app_icon: googleCalendar,
        app_text: "calendar",
        style_width: "63px",
        app_link: "https://calendar.google.com/calendar/u/0/r?pli=1"
      },
      {
        app_icon: googleTranslate,
        app_text: "translate",
        style_width: "50px",
        app_link: "https://translate.google.com/?sl=tr&tl=en&op=translate"
      },
      {
        app_icon: googlePhotos,
        app_text: "photos",
        style_width: "38px",
        app_link: "https://photos.google.com/?pli=1"
      },
      {
        app_icon: googleGemini,
        app_text: "gemini",
        style_width: "42px",
        app_link: "https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all"
      },
    ],
    second_wrapper: [
      {
        app_icon: googleSheets,
        app_text: "sheets",
        style_width: "52px",
        app_link: "https://docs.google.com/spreadsheets/u/0/"

      },
      {
        app_icon: googleDocs,
        app_text: "documents",
        style_width: "42px",
        app_link: "https://docs.google.com/document/u/0/"
      },
      {
        app_icon: googleSlides,
        app_text: "slides",
        style_width: "35px",
        app_link: "https://docs.google.com/presentation/u/0/",
      },
      {
        app_icon: googleOne,
        app_text: "google one",
        style_width: "43px",
        app_link: "https://one.google.com/?utm_source=app_launcher&utm_medium=web&utm_campaign=all&utm_content=google_oo&g1_landing_page=1"
      },
      {
        app_icon: googleShopping,
        app_text: "shopping",
        style_width: "42px",
        app_link: "https://www.google.com/shopping?source=og&authuser=0"
      },
      {
        app_icon: googleFinance,
        app_text: "finance",
        style_width: "44px",
        app_link: "https://www.google.com/finance/?authuser=0"
      },
      {
        app_icon: googleKeep,
        app_text: "keep",
        style_width: "44px",
        app_link: "https://keep.google.com/#home"
      },
      {
        app_icon: googleClassroom,
        app_text: "classroom",
        style_width: "50px",
        app_link: "https://classroom.google.com/"
      },
      {
        app_icon: googleEarth,
        app_text: "earth",
        style_width: "44px",
        app_link: "https://earth.google.com/web/@0,-0.61634022,0a,22251752.77375655d,35y,0h,0t,0r/data=CgRCAggBOgMKATBCAggBSg0I____________ARAA?authuser=0"
      },
      {
        app_icon: googleAds,
        app_text: "google ads",
        style_width: "44px",
        app_link: "https://ads.google.com/aw/signup/aboutyourbusiness?authuser=0&ocid=7862595824&uscid=7862595824&__c=6158174576&euid=1573882467&__u=2832649483&cmpnInfo=%7B%228%22%3A%22cdb13057-fc1a-4561-8c72-4f92bdd6cba8%22%7D&subid=ww-ww-xs-ip-awhc-a-ogb_cons%21o2-ogbait-TR-en-xs-ip-ogb_ai-sf-dw-uao-s500g500%7Cib%3A6653296821%7C-unqsi-CJOyk-aWtZEDFXbHuwgdTXQynw-unqsi-uao-agembe-acce&currentStep=business"

      },
      {
        app_icon: googleForms,
        app_text: "forms",
        style_width: "46px",
        app_link: "https://docs.google.com/forms/u/0/"
      },
      {
        app_icon: googleCulture,
        app_text: "culture and art",
        style_width: "45px",
        app_link: "https://artsandculture.google.com/"
      },
      {
        app_icon: googleChromeWeb,
        app_text: "chrome web store",
        style_width: "48px",
        app_link: "https://chromewebstore.google.com/?utm_source=app-launcher&authuser=0"
      },
      {
        app_icon: googleBooks,
        app_text: "books",
        style_width: "44px",
        app_link: "https://books.google.com/?authuser=0"
      },
      {
        app_icon: googleAnalytics,
        app_text: "Analytics",
        style_width: "45px",
        app_link: "https://analytics.google.com/analytics/web/provision/?utm_source=OGB&utm_medium=app&authuser=0#/provision"
      },
      {
        app_icon: googleBlogger,
        app_text: "blogs",
        style_width: "44px",
        app_link: "https://www.blogger.com/about/?bpli=1"
      },
      {
        app_icon: googleWallet,
        app_text: "wallet",
        style_width: "44px",
        app_link: "https://wallet.google.com/wallet/forbidden?referer=/home?utm_source%3Dwalletweb"
      },
    ]
  }
  return (
    <div className='apps__modal'>
      <div className='apps__wrapper'>
        {
          GOOGLE_APPS.first_wrapper.map((app, key) => (
            <a key={key} href={app.app_link} target='_blank' className='app__container'>
              <img className='app__img' style={{ width: app.style_width, height: "auto" }} src={app.app_icon} alt="" />
              <p className='app__text'> {app.app_text} </p>
            </a>
          ))
        }
      </div>
      <div className='apps__wrapper'>
        {
          GOOGLE_APPS.second_wrapper.map((app, key) => (
            <a key={key} href={app.app_link} target='_blank' className='app__container'>
              <img className='app__img' style={{ width: app.style_width, height: "auto" }} src={app.app_icon} alt="" />
              <p className='app__text'> {app.app_text} </p>
            </a>
          ))
        }
      </div>



      <div className='border-btn-container app__btn-container'>
        <button className='border-btn app__btn'><a className='border-btn-link' href="https://about.google/products/" target='_blank'>Other Google products</a></button>
      </div>
    </div>
  )
}

export default GoogleAppsModal