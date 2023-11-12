import React, { Fragment } from 'react';
import { Animated } from 'react-animated-css';

//import de imagenes
import frame from 'assets/img/frame.svg';
import slider from 'assets/img/slide1-1.jpg';
import onlineinterviewicon from 'assets/img/online-interview-icon.svg';
import fingerprint1 from 'assets/img/finger-print-1.svg';
import britishamericanflags from 'assets/img/british-american--flags.svg';
import phoneticsicon from 'assets/img/phonetics-icon.svg';
import clock_icon from 'assets/img/clock-icon.svg';
import headphonegirl from 'assets/img/headphonegirl.jpg';
import robot_circle from 'assets/img/robot-circle.png';
import crowd_circle from 'assets/img/crowd-circle.png';
import teacher_circle from 'assets/img/teacher-circle.png';
import student_circle from 'assets/img/student-circle.png';
import brain from 'assets/img/brain.jpg';
import mouth from 'assets/img/mouth.jpg';
import arbol_enseñanza from 'assets/img/arbol-enseñanza.png';
import conversation from 'assets/img/conversation.jpg';
import sprinter from 'assets/img/sprinter.png';
import number1 from 'assets/img/number1.png';
import number2 from 'assets/img/number2.png';
import number3 from 'assets/img/number3.png';
import individual_class_icon from 'assets/img/individual-class-icon.svg';
import group_class_icon from 'assets/img/group-class-icon.svg';
import teacher2 from 'assets/img/teacher2.jpg';
import feather from 'assets/img/feather.jpg';
import martinlutherking from 'assets/img/martinlutherking.jpg';
import cotejo from 'assets/img/cotejo.svg';
import chat2 from 'assets/img/chat2.svg';
import cutsquare1 from 'assets/img/cut-square-1.svg';
import cutsquare2 from 'assets/img/cut-square-2.svg';
import cutsquare3 from 'assets/img/cut-square-3.svg';
import cutsquare4 from 'assets/img/cut-square-4.svg';
import mic_audience from 'assets/img/mic-audience.jpg';
import program1 from 'assets/img/program1.svg';
import number3byhand from 'assets/img/number3-by-hand.svg';
import number2byhand from 'assets/img/number2-by-hand.svg';
import number1byhand from 'assets/img/number1-by-hand.svg';
import fingers from 'assets/img/fingers.svg';

//styles global
import 'bootstrap/dist/css/bootstrap.css';

const Desktop = () => {
  return (
    <Fragment>
      <Animated
        animationIn="fadeInRight"
        animationInDuration={1500}
        isVisible={true}
        className="h-100"
      >
        <article className="description p-2 h-100 " id="info-slide-1">
          <div className="fluid-container p-0 m-0 h-100">
            <div className="row">
              <p className="col-12 col-sm-5 m-auto text-left">
                Branak es una plataforma de aprendizaje de Inglés de estilo personalizado;
                es moderna y cómoda, como cualquier aplicación, pero más personal que una
                clase tradicional.
              </p>
              <img alt="" className="img-fluid col-4 align-self-center" src={slider} />
              <img
                className="img-fluid col-12"
                src={frame}
                style={{ position: 'absolute', bottom: '0' }}
              />
            </div>
          </div>
        </article>
      </Animated>

      <article className="description p-0 h-100 mb-5" id="info-slide-2">
        <header className="col-12 slide-title">
          <div className="circle g-circle d-flex justify-content-start">
            <h1 className="text-left m-auto">Combinación Efectiva</h1>
          </div>
        </header>
        <div className="row p-0 m-0 mt-2">
          <section className="col-4 d-flex flex-column text-left pl-5">
            <div style={{ marginBottom: '35px' }}>
              <img className="icon ml-0" src={onlineinterviewicon} />
              <h2 className="subtitle">Clases en Vivo</h2>
              <p>cara a cara con el profesor y en tiempo real</p>
            </div>
            <div>
              <img className="icon ml-0" src={fingerprint1} />
              <h2 className="subtitle">Personalizada</h2>
              <p>
                Cada clase es única y enfocada en la necesidad individual de cada
                estudiante
              </p>
            </div>
            <div>
              <img
                className="icon ml-0"
                src={britishamericanflags}
                style={{ position: 'relative', top: '10px', width: '120px' }}
              />
              <h2 className="subtitle">Profesores Nativos del Idioma</h2>
              <p>
                El Inglés es la lengua materna de todos los profesores de Branak, ya sea,
                el Inglés británico,o el Inglés Americano
              </p>
            </div>
            <div>
              <img className="icon ml-0" src={phoneticsicon} />
              <h2 className="subtitle">Expertos en Fonética</h2>
              <p>
                La Fonética es uno de nuestros fuertes, y las clases son impartidas por
                fonetístas especializados
              </p>
            </div>
            <div>
              <img
                className="icon ml-0"
                src={clock_icon}
                style={{ width: '55px', height: '55px' }}
              />
              <h2 className="subtitle">Horario Flexible 24/7</h2>
            </div>
          </section>
          <section className="mx-auto col-7">
            <img
              className="img-fluid"
              src={headphonegirl}
              style={{ position: 'relative', top: '40px' }}
            />
          </section>
        </div>
      </article>

      <article id="info-slide-3" style={{ position: 'relative' }} className="mb-5 mt-5">
        <div
          className="position-absolute circle-slide-3 p-circle"
          style={{ left: '65%', top: '100%', backgroundColor: 'rgba(138,218,247,0.3)' }}
        ></div>
        <div
          className="position-absolute circle-slide-3 g-circle"
          style={{ left: '3%', bottom: '2%', backgroundColor: 'rgba(28,6,183,0.20)' }}
        ></div>
        <div
          className="position-absolute circle g-circle"
          style={{ left: '79%', top: '-14%', zIndex: '2' }}
        ></div>
        <section className="d-flex flex-column h-100" style={{ marginTop: '16em' }}>
          <header className="col-12 slide-title">
            <div className="circle p-circle d-flex justify-content-start">
              <h1 className="m-auto">Como funciona</h1>
            </div>
          </header>
          <div className="row justify-content-center m-auto">
            <div className="col-3">
              <img className="img-fluid align-self-center w-100 p-0" src={robot_circle} />
              <h2>Branak no es una apliación</h2>
            </div>
            <div className="col-3">
              <img className="img-fluid align-self-center w-100 p-0" src={crowd_circle} />
              <h2>No es una escuela gigante</h2>
            </div>
            <div className="col-3">
              <img
                className=" img-fluid align-self-center w-100 p-0"
                src={teacher_circle}
              ></img>
            </div>
            <div className="col-3">
              <img
                className="img-fluid align-self-center w-100 p-0"
                src={student_circle}
              />
            </div>
            <h2 className="offset-6" style={{ width: '300px' }}>
              Nuestro equipo conoce por nombre a cada estudiante y como aprende
            </h2>
            <p className="text-left mt- p-5">
              Las clases son conducidas por un profesor cara a cara y en tiempo real. En
              Branak inicialmente recibirás una entrevista online donde evaluaremos tu
              Inglés y conoceremos tus metas de aprendizaje. A partir de allí
              personalizaremos nuestro curso de Ingles adaptado a tus necesidades.Solo
              necesitas un dispositivo movil, tablet o computador personal y elejir dentro
              de nuestro horario 24/7 el horario que te conviene
            </p>
          </div>
        </section>
      </article>

      <article id="info-slide-4">
        <section className="w-100">
          <header className="col-12 slide-title">
            <div className="circle dp-circle d-flex justify-content-start">
              <h1 className="m-auto">Metodología </h1>
            </div>
          </header>

          <div className="row h-100">
            <div className="col-3 m-auto">
              <p className="text-left">
                Los idiomas no se aprenden, se adquieren. El método de enseñanza consiste
                en recrear el proceso natural de adquisición del idioma primario, pero de
                manera sistemática, no por exposición. Conocemos parte del proceso
                cognitivo que tiene lugar en el cerebro y que hace posible el lenguaje
                hablado y la adquisición de un idioma. Logramos optimizar el potencial de
                este proceso por medio a la inducción fonética, una de las practicas más
                efectivas de nuestras clases de Inglés .
              </p>
            </div>
            <div className="col-8 " style={{ position: 'relative', marginRight: '10px' }}>
              <img alt="" className="img-fluid m-auto" src={brain} />
              <p
                className="text-center w-100"
                style={{ color: 'white', fontSize: '1rem', fontStyle: 'italic' }}
              >
                Conocer como adquiere el cerebro un idioma es lo que más nos ayuda a
                enseñarlo
              </p>
            </div>
          </div>
        </section>
      </article>

      <article id="info-slide-5">
        <section className="m-auto mouth" style={{ width: '100%', position: 'relative' }}>
          <header className="col-12 slide-title">
            <div className="circle g-circle d-flex flex-column justify-content-start">
              <div className="my-auto" style={{ position: 'relative', bottom: '15px' }}>
                <h1 className="my-auto text-left" style={{ fontSize: '1.2em' }}>
                  Pilar 1
                </h1>
                <h1 className="my-auto">Fonética</h1>
              </div>
            </div>
          </header>
          <p className="px-4 text-left m-auto col-8">
            El secreto para hablar buen Inglés está en su pronunciacion, el Inglés es un
            idioma esencialmente acústico y dominar sus sonidos es el mayor desafio que
            las personas tienen para hablarlo
          </p>
          <img alt="" className="img-fluid m-auto col-8" src={mouth} />
          <p className="px-4 text-left m-auto col-8">
            El proceso de aprendizaje resulta bastante simple y rápido para nuestros
            estudiantes porque nuestra herramienta fundamental de enseñanza es la fonética
            y con ella nuestros estudiantes se familiarizan con los sonidos del Ingles de
            una manera plena Nuestras clases de fonética también son requeridas por
            hablantes experimentados que buscan una real o mayor fluidez en el idioma
          </p>
        </section>
      </article>

      <article className="row p-4 " id="info-slide-6">
        <header className="col-12 slide-title" style={{ marginTop: '0' }}>
          <div className="circle g-circle d-flex flex-column justify-content-start">
            <div className="my-auto" style={{ position: 'relative', bottom: '15px' }}>
              <h1 className="my-auto text-left" style={{ fontSize: '1.2em' }}>
                Pilar 2
              </h1>
              <h1 className="my-auto">Estructura/Grámatica</h1>
            </div>
          </div>
        </header>
        <section className="m-auto h-100 " style={{ position: 'relative' }}>
          <img
            alt=""
            className="m-auto col-8"
            src={arbol_enseñanza}
            style={{ position: 'relative' }}
          />
          <section
            className="mt-auto"
            style={{
              position: 'relative',
              bottom: '170px',
              width: '40vw',
              left: '460px'
            }}
          >
            <div className="square p-2 text-left">
              como segundo componente, estas clases de fonética se combinan con la
              enseñanza de la estructura del Inglés, en una especie de gramática
              simplificada, pero procurando que el estudiante domine tanto la métrica como
              el uso práctico de
            </div>
          </section>
        </section>
      </article>

      <article id="info-slide-7">
        <header className="col-12 slide-title">
          <div className="circle dp-circle d-flex flex-column justify-content-start">
            <div className="my-auto" style={{ position: 'relative', bottom: '15px' }}>
              <h1 className="my-auto text-left" style={{ fontSize: '1.2em' }}>
                Pilar 3
              </h1>
              <h1 className="my-auto">Conversación</h1>
            </div>
          </div>
        </header>
        <section className="col-12 m-auto " style={{ position: 'relative' }}>
          <img alt="" className="img-fluid" src={conversation} />
          <div
            className="circle-p m-auto d-flex"
            style={{ position: 'absolute', bottom: '10%', right: '20%', color: 'white' }}
          >
            <div className="m-auto text-center">
              <h1 style={{ fontSize: '1.2em' }}>3 Conversación</h1>
              <p style={{ fontSize: '0.9rem', color: 'white' }}>
                Romper el hielo y la timidez, ejercitar y desarollar un lenguaje
                completamente fluido y natural
              </p>
            </div>
          </div>
        </section>
      </article>

      <article className="container-fluid" id="info-slide-8">
        <section
          className="text-left justify-content-start m-3"
          style={{
            margin: '0',
            position: 'relative',
            height: '200px',
            backgroundColor: 'rgba(255,255,255,0.3)'
          }}
        >
          <img
            alt=""
            className=""
            src={sprinter}
            style={{ position: 'absolute', left: '0', height: '100%', width: 'auto' }}
          />
          <h1 className="text-center mt-4" style={{ fontSize: '1.7rem' }}>
            El curso
          </h1>
        </section>
        <section className="row niveles text-left justify-content-center">
          <section className="col-4">
            <header className="d-flex mx-auto">
              <h1 className="m-auto p-4" style={{ fontSize: '1rem' }}>
                Nivel
              </h1>
              <img alt="" className="number m-auto" src={number1} />
            </header>
            <ul
              className="px-5"
              style={{ marginLeft: '10px', backgroundColor: 'rgba(31,227,252,0.2)' }}
            >
              <li>Conoce bien la ciencia de aprender un nuevo idioma</li>
              <li>
                Familiarizate con los sonidos del Inglés y comprende la estructura
                elemental
              </li>
              <li>
                Adquiere una solida base que te dará confianza y te permitirá comunicacion
                simples pero consciente
              </li>
            </ul>
          </section>
          <section className="col-4">
            <header className="d-flex mx-auto">
              <h1 className="m-auto p-4" style={{ fontSize: '1rem' }}>
                Nivel
              </h1>
              <img alt="" className="number m-auto" src={number2} />
            </header>
            <ul className="px-5" style={{ backgroundColor: 'rgba(0,255,0,0.2)' }}>
              <li>
                Comienza a hablar de lo cotidiano extendiendo tambien tu vocabulario
              </li>
              <li>
                Comienza a pensar en Inglés y a entender poco a poco a hablantes diversos
              </li>
              <li>
                Comienza a aumentar tu velocidad de conversación e interpretacion, ya
                podras hacer correciones ayudando tambiién a otros
              </li>
            </ul>
          </section>
          <section className="col-4">
            <header className="d-flex mx-auto">
              <h1 className="m-auto p-4" style={{ fontSize: '1rem' }}>
                Nivel
              </h1>
              <img alt="" className="number m-auto" src={number3} />
            </header>
            <ul
              className="px-5"
              style={{ marginRight: '10px', backgroundColor: 'rgba(239,80,252,0.2)' }}
            >
              <li>
                Puedes hacer exposiciones y, y hasta ser bastante convincente
                desarrollando tus argumentos
              </li>
              <li>
                Puedes mantener largas conversaciones sin necesidad de ser asistido o
                corregido regularmente
              </li>
              <li>
                Puedes hablar Inglés con fluidez y naturalidad, y asumir cualquier
                posicion gerencial donde solo se hable Ingles. Tambien puedes tomar
                nuestro curso especial de oratoria y literatura
              </li>
            </ul>
          </section>
        </section>
      </article>

      <article className="fluid-container mb-5" id="info-slide-9">
        <header className="col-12 slide-title">
          <div className="circle p-circle d-flex justify-content-start">
            <h1 className="my-auto">Tipos de Clases</h1>
          </div>
        </header>
        <section className="row" style={{ marginTop: '100px' }}>
          <div className="offset-3 col-2 d-flex flex-column">
            <img
              alt=""
              className="img-fluid m-auto"
              src={individual_class_icon}
              style={{ width: '110px' }}
            />
            <p>Clases individuales</p>
          </div>
          <div className="offset-2 col-2">
            <img
              alt=""
              className="img-fluid m-auto"
              src={group_class_icon}
              style={{ width: '100px' }}
            />
            <p>Clases de Grupo</p>
          </div>
        </section>
        <section className="row text-left p-4" style={{ marginBottom: '80px' }}>
          <p className="p-4">
            En las clases individuales, obviamente, el aprendizadje es más rápido y
            personalizado; en las clases de grupo, es más económico. Existen 2 formas de
            pertenecer a un grupo de clases: 1 Grupo de la escuela 2 grupo formado por el
            estudiainte con personas relacionadas, lo que pudiera ser: amigos, familiares,
            o compañeros de trabajo. Este último representa el tipo de clases más
            económico y da la oportunidad de formar un grupo propio de conversación.
            Recuerda que puedes formar un grupo con personas que esten fisicamente juntas
            al momento de tomar la clase, pero puedes tambien formar un grupo con
            relacionados aún estén en regiones o paises distantes
          </p>
        </section>
        <h1 className="text-center" style={{ fontSize: '1.6rem' }}>
          Profesores
        </h1>
        <section className="row px-4">
          <p className="p-4 col-8 text-left">
            Todos los profesores son hablantes nativos del idioma Inglés, de tal manera
            que, puedan transmitir a los estudiantes la correcta pronunciación del Inglés.
            Los maestros en Branak son gente apasionada por la enseñanza, este ha sido el
            principal requisito de su selección
          </p>
          <img
            alt=""
            className="img-fluid col-4 align-self-center"
            src={teacher2}
            style={{ position: 'relative', top: '-100px' }}
          />
        </section>
      </article>

      <article className="fluid-container " id="info-slide-10">
        <header className="col-12 slide-title">
          <div className="circle g-circle d-flex flex-column justify-content-start">
            <div className="my-auto" style={{ position: 'relative', top: '5px' }}>
              <h1 className="my-auto" style={{ fontSize: '1.6rem' }}>
                Literatura
              </h1>
              <h1 className="my-auto text-left" style={{ fontSize: '1rem' }}>
                El cuarto nivel opcional
              </h1>
            </div>
          </div>
        </header>
        <div className="row h-100 align-items-center">
          <section className="col-4 pr-0 ml-3">
            <p className="text-left mb-3">
              Conoce lo más bello del idioma, y deja que esa belleza también sea parte de
              una mejor forma de comunicarte. Disfruta del arte que más se disfruta, y el
              que más ha influido la sociedad humana a traves de la historia …la
              literatura.
            </p>
            <p className="text-left mb-3">
              Este es un peldaño más arriba de lo ordinario; un curso para quienes quieren
              llegar más lejos, expresarse mejor, y disfrutar el idioma como arte
              escencial Conoce los clásicos, los vanguardistas, los movimientos
              literarios, los estilos, y sobre todo, maneja las técnicas en una métrica
              lineal de la mano de un linguista especializado.
            </p>
            <p className="text-left mb-3">
              Este curso va dirigido a estudiantes del Inglés como segunda lengua cuando
              ya dominan bastante el idioma; muchas veces cuando ya han completado nuestro
              curso Standard de Branak. Está dirigido también a hablantes nativos del
              Inglés que buscan refinamiiento por objetivos académicos o por el disfrute
              del arte literario
            </p>
          </section>
          <section className="col-7 h-100 ml-0">
            <img
              alt=""
              className="m-auto img-fluid"
              src={feather}
              style={{ height: '100%', width: 'auto' }}
            />
          </section>
        </div>
      </article>

      <article className="fluid-container d-flex flex-column" id="info-slide-11">
        <header className="col-12 slide-title">
          <div className="circle g-circle d-flex flex-column justify-content-start">
            <div className="my-auto" style={{ position: 'relative', top: '5px' }}>
              <h1 className="my-auto" style={{ fontSize: '1.6rem' }}>
                Oratoria
              </h1>
              <h1 className="my-auto text-left" style={{ fontSize: '1rem' }}>
                el quinto nivel opcional
              </h1>
            </div>
          </div>
        </header>
        <div className="row align-items-center m-auto">
          <img alt="" className="m-auto img-fluid col-10" src={mic_audience} />
          <p className="text-left mx-auto px-5 col-10" style={{ marginTop: '10px' }}>
            Micrófono al frente, un silencio repentino ha invadido el auditorio y todos
            clavan la mirada sobre ti. Están a la expectative de lo que tienes que decir,
            estás un poco nervioso, pero ya no hay tiempo para pensarlo …es tu turno,
            mejor que lo hagas bien, muy bien Si vas a hablar en público es bueno que
            estes bien preparado, no solo respecto al material a mostrar, sino a la forma
            en que hagas tu exposicion. Las palabras que uses, como las uses, la
            pronunciación, la modulación, entonación, el ritmo, las pausas, la coneccion
            con el público, la postura, la confianza, y el crescendo final, …todo lo que
            haga que tu mensaje sea efectivo y realmente convincente. ya sea que el Inglés
            sea tu lengua nativa o tu Segundo idioma aprendido, en Branak te puedemos
            ayudar a llegar a ser un excelente orador y asegurar el éxito en tus charlas,
            tus presentaciones o conferencias En caso de que no no hayas tomado el curso
            aún, y y que ya tengas una presentación en agenda, te podemos ayudar a que la
            misma sea un exito cercano
          </p>
          <img alt="" className="img-fluid col-6 m-auto" src={martinlutherking} />
        </div>
      </article>

      <article className="col-12 mt-5" id="info-slide-12">
        <header className="col-12 slide-title ">
          <div className="circle p-circle d-flex m-auto justify-content-center">
            <div className="m-auto">
              <h1 style={{ position: 'initial' }}>Porque elegir Branak</h1>
            </div>
          </div>
        </header>
        <ul className="text-left">
          <li>
            Porque somos la escuela más personalizada en la red
            <img
              alt=""
              className="cotejo"
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-15px'
              }}
            />
          </li>
          <li>
            Tenemos el método de enseñanza más científico y natural
            <img
              alt=""
              className="cotejo"
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-15px'
              }}
            />
          </li>
          <li>
            La fonética es nuestra mayor especialidad, y es la mayor dificultad de la
            gente al aprender
            <img
              alt=""
              className="cotejo"
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-15px'
              }}
            />
          </li>
          <li>
            Nuestros profesores son gente a las que les apasiona enseñar
            <img
              alt=""
              className="cotejo"
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-15px'
              }}
            />
          </li>
          <li>
            Simplificamos los procesos, Y el aprendizaje
            <img
              alt=""
              className="cotejo"
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-15px'
              }}
            />
          </li>
        </ul>
        <h2 className="text-center" style={{ marginBottom: '150px', marginTop: '150px' }}>
          Cómo Empezar?
        </h2>

        <section className="row" id="pasos">
          <div className="col-4 p-4">
            <img alt="" src={number1byhand} style={{ width: '80px', margin: 'auto' }} />
            <p>Tome un examen de nivel o una entrevista en linea</p>
          </div>
          <div className="col-4 p-4">
            <img alt="" src={number2byhand} style={{ width: '80px', margin: 'auto' }} />
            <p> Regístrese despues de tomar su examen o entrevista </p>
          </div>
          <div
            className="col-4 p-4 d-flex flex-column"
            style={{ position: 'relative', top: '-251px' }}
          >
            <img
              alt=""
              src={fingers}
              style={{
                margin: 'auto',
                position: 'relative',
                left: '-105px',
                top: '75px',
                width: '240px'
              }}
            />
            <img alt="" src={number3byhand} style={{ width: '80px', margin: 'auto' }} />
            <p> Listo, es su primer dia de clases </p>
          </div>
        </section>
        <p className="text-left">
          Solicita mediante el chat
          <img
            alt=""
            ng-click="homeCtrl.animateChat()"
            src={chat2}
            style={{ width: '36px', cursor: 'pointer' }}
          />
          una entravista en linea donde des a conocer tus objetivos, experiencia con el
          idioma, y posibles dificultades; esta entrevista puede servir también para
          conocer más el programa y coordinar un horario de clases con un representante.
          También puedes programar esta entrevista en el siguiente enlace
          <img alt="" src={program1} style={{ display: 'inline', width: '36px' }} />
        </p>
      </article>

      <article className="fluid-container d-flex flex-column mb-5" id="info-slide-13">
        <header className="col-12 slide-title ">
          <div className="circle dp-circle d-flex m-auto justify-content-start">
            <h1 className="my-auto" style={{ left: '40%' }}>
              Preparación para Exámenes
            </h1>
          </div>
        </header>
        <h2 className="text-center" style={{ fontSize: '1.6rem' }}>
          Branak te ayuda a preparar para los siguiente exámenes
        </h2>
        <table
          className="table table-bordered"
          style={{ color: '#fff', fontSize: '1rem' }}
        >
          <thead>
            <tr>
              <th scope="col">Exámen</th>
              <th scope="col">
                <img
                  alt=""
                  className="m-auto"
                  src={cutsquare1}
                  style={{ width: '50px' }}
                />
                TOELF
              </th>
              <th scope="col">
                <img
                  alt=""
                  className="m-auto"
                  src={cutsquare2}
                  style={{ width: '50px' }}
                />
                TOEIC
              </th>
              <th scope="col">
                <img
                  alt=""
                  className="m-auto"
                  src={cutsquare3}
                  style={{ width: '50px' }}
                />
                CAMBRIGDE
              </th>
              <th scope="col">
                <img
                  alt=""
                  className="m-auto"
                  src={cutsquare4}
                  style={{ width: '50px' }}
                />
                IELTS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Propósito</th>
              <td>Ingresar universidades Estados Unidos o Canada</td>
              <td>Certificación Profesional</td>
              <td>
                Certificación para Instituciones y acceso a universidades de Reino Unido
              </td>
              <td>Migración a Reino Unido y aplicación a Universidad en Reino Unido</td>
            </tr>
            <tr>
              <th scope="row">Duración Exámen</th>
              <td>270 minutos</td>
              <td>120 minutos</td>
              <td>110 to 236 minutos,dependiendo versión del examen</td>
              <td>175 minutos</td>
            </tr>
            <tr>
              <th scope="row">Lugar del Exámen</th>
              <td>Centro autorizado</td>
              <td>Centro autorizado</td>
              <td>Centro autorizado</td>
              <td>Centro autorizado</td>
            </tr>
            <tr>
              <th scope="row">Costo Exámen</th>
              <td>US $160-$250</td>
              <td>$125-$200</td>
              <td>$150-$250</td>
              <td>$200-$300</td>
            </tr>
            <tr>
              <th scope="row">Costo Preparación</th>
              <td colSpan="4">En todos los casos ver costo curso especial</td>
            </tr>
          </tbody>
        </table>
        <p className="text-left">
          Nota: Consultar algunas variantes y detalles con un representante
        </p>
      </article>
    </Fragment>
  );
};

export default React.memo(Desktop);
