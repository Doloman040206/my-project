import React from 'react';
import Head from 'next/head';
import { PublicPizaList } from '../components/PublicPizaList';
import { PublicWeatherWidget } from '../components/WeatherWidget';

const App = () => {
  return (
    <>
      <Head>
        <title>My page title</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Переключатель навигации"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav justify-content-between w-100">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Головна <span className="sr-only">(текущая)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Про нас">
                  Про нас
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#choise">
                  Наше меню{' '}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Наші найбільші філіали
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Контакт
                </a>
              </li>
            </ul>
            <div className="language d-inline-block d-lg-none">
              <a href="#">RU</a>|
              <a className="activ" href="#">
                ENG
              </a>
            </div>
          </div>
        </nav>
        <div className="top-line d-none d-lg-block"></div>
        <div className="d-flex justify-content-between align-items-start align-items-lg-end  flex-column flex-lg-row">
          <div className="logo">
            Pizza <br /> Day
          </div>
          <div className="adress">
            Мережа магазинів <br /> по продажу піци
          </div>
          <div className="language d-none d-lg-block">
            <a href="#">RU</a>|
            <a className="activ" href="#">
              ENG
            </a>
          </div>
        </div>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide mt-4"
          data-ride="carousel"
          data-interval="3000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <picture className="d-block w-100">
                <source media="(max-width: 991.98px)" srcSet="./img/slyder/7.jpg" />
                <img className="img-fluid w-100" src="./img/slyder/1.jpg" alt="slyder" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture className="d-block w-100">
                <source media="(max-width: 991.98px)" srcSet="./img/slyder/8.jpg" />
                <img className="img-fluid w-100" src="./img/slyder/2.jpeg" alt="slyder" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture className="d-block w-100">
                <source media="(max-width: 991.98px)" srcSet="./img/slyder/9.jpg" />
                <img className="img-fluid w-100" src="./img/slyder/3.jpg" alt="slyder" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture className="d-block w-100">
                <source media="(max-width: 991.98px)" srcSet="./img/slyder/10.jpg" />
                <img className="img-fluid w-100" src="./img/slyder/4.jpg" alt="slyder" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture className="d-block w-100">
                <source media="(max-width: 991.98px)" srcSet="./img/slyder/11.jpg" />
                <img className="img-fluid w-100" src="./img/slyder/5.jpg" alt="slyder" />
              </picture>
            </div>
            <div className="carousel-item">
              <picture className="d-block w-100">
                <source media="(max-width: 991.98px)" srcSet="./img/slyder/12.jpg" />
                <img className="img-fluid w-100" src="./img/slyder/6.jpg" alt="slyder" />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <section id="Про нас" className="about-us bg-grey">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-center">
              <h2>Про нас</h2>
              <p>
                Привіт,ми PIZZA DAY (піца з собою) — ми компанія, <br /> що динамічно розвиваємо
                мережу піцерій.
              </p>
              <p>
                Вже 170 закладів у 19 містах. <br />
                Ми на ринку з 2017 року.
              </p>
              <p>Швидко готуємо (5 хвилин — 1 піца).</p>
            </div>
          </div>
        </div>
      </section>
      <section id="f-img w-1000">
        <p id="choise">Наше меню</p>
        <PublicPizaList></PublicPizaList>
        <PublicWeatherWidget></PublicWeatherWidget>
      </section>
      <section id="portfolio" className="portfolio bg-grey">
        <div className="text-center">
          <h2>Наші найбільші філіали</h2>
        </div>
        <div className="d-flex">
          <img className="img-fluid w-50" src="./img/3.jpg" alt="big" />
          <img className="img-fluid w-50" src="./img/4.jpg" alt="big" />
        </div>
        <h5 className="text-center">
          Місто Київ: <br />
          Львівська площа та вулиця Лариси Руденко.
        </h5>
        <div className="d-flex">
          <img className="img-fluid w-50" src="./img/11.jpeg" alt="big" />
          <img className="img-fluid w-50" src="./img/2.jpeg" alt="big" />
        </div>
        <h5 className="text-center">
          Місто Дніпро: <br />
          вулиця Калинова та проспект Гагаріна.
        </h5>
        <div className="d-flex">
          <img className="img-fluid w-50" src="./img/5.jpg" alt="big" />
          <img className="img-fluid w-50" src="./img/6.jpg" alt="big" />
        </div>
        <h5 className="text-center ">
          Місто Запоріжжя: <br />
          вулиця Новокузнецька та Північно-Кільцева вулиця.
        </h5>
      </section>
      <section id="contact" className="contact">
        <div className="d-flex align-items-center justify-content-center soc">
          <div className="d-flex">
            <a href="#">
              <img src="./img/in.svg" alt="in" />
            </a>
            <a href="#">
              <img src="./img/insta.svg" alt="insta" />
            </a>
            <a href="#">
              <img src="./img/be.svg" alt="be" />
            </a>
            <a href="#">
              <img src="./img/surface.svg" alt="surface" />
            </a>
          </div>
        </div>
        <div className="copiright text-center">
          Like us on <br />
          LinkedIn, Instagram, Behance, Dribble
        </div>
      </section>
    </>
  );
};

export default App;
