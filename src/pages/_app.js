//import Head from 'next/head'
//import Script from 'next/script'
import '@/shared/styles/vendor/bootstrap@5.1.3/css/bootstrap.min.css'
//import 'react-quill/dist/quill.snow.css'
import '@/shared/styles/style.css'
//import { UserStoreProvider } from '@/shared/stores/user.store'
//import { CourseStoreProvider } from '@/shared/stores/course.store'
//import Footer from '@/shared/components/Footer'

export default function App({ Component, pageProps }) {
  return (
  <>
    <>{/*<Script src='/vendor/tinymce/tinymce.min.js' />
    <Script src='https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.6/dist/ffmpeg.min.js' crossOrigin='anonymous'/>
    <Script src='https://cdn.dashjs.org/latest/dash.all.min.js' crossOrigin='anonymous'/>
    */}</>
    <>{/*
      <UserStoreProvider>
      <CourseStoreProvider>
  */}</>
      	<div id="dcrypted-container">
          <Component {...pageProps} />
          <>{/*<Footer />*/}</>
        </div>
    <>{/*  
      </CourseStoreProvider>
      </UserStoreProvider>
    */}</>
  </>
  )
}
