import React, { Fragment } from 'react';

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
import mic_audience from 'assets/img/mic-audience.jpg';
import program1 from 'assets/img/program1.svg';
import number3byhand from 'assets/img/number3-by-hand.svg';
import number2byhand from 'assets/img/number2-by-hand.svg';
import number1byhand from 'assets/img/number1-by-hand.svg';
import fingers from 'assets/img/fingers.svg';

const Movil = () => {
  return (
    <Fragment>
      <article
        className="h-100"
        id="mobil-slide-1"
        style={{ marginBottom: '100px', position: 'relative' }}
      >
        <img className="img-fluid " src={slider} />
        <p className="text-left p-2 mt-4" style={{ marginBottom: '100px' }}>
          Branak es una plataforma de aprendizaje de Inglés de estilo personalizado; es
          moderna y cómoda, como cualquier aplicación, pero más personal que una clase
          tradicional.
        </p>
        <img
          className="img-fluid"
          src={frame}
          style={{ position: 'absolute', bottom: '10px', left: '0' }}
        />
      </article>

      <article id="mobil-slide-2">
        <header className="w-100 slide-title">
          <div className="circle g-circle d-flex justify-content-start">
            <h1 className="text-left m-auto">Combinación Efectiva</h1>
          </div>
        </header>
        <img className="img-fluid" src={headphonegirl} />
        <div className="row text-left p-3">
          <img className="icon col-3" src={onlineinterviewicon} />
          <div className="col-9">
            <h2 className="subtitle">Clases en Vivo</h2>
            <p>cara a cara con el profesor y en tiempo real</p>
          </div>
        </div>
        <div className="row text-left p-3">
          <img className="icon col-3" src={fingerprint1} />
          <div className="col-9">
            <h2 className="subtitle">Personalizada</h2>
            <p>
              Cada clase es única y enfocada en la necesidad individual de cada estudiante
            </p>
          </div>
        </div>
        <div className="row text-left p-3">
          <img className="icon col-3 p-0 pl-2" src={britishamericanflags} />
          <div className="col-9">
            <h2 className="subtitle">Profesores Nativos del Idioma</h2>
            <p>
              El Inglés es la lengua materna de todos los profesores de Branak, ya sea, el
              Inglés británico,o el Inglés Americano
            </p>
          </div>
        </div>
        <div className="row text-left p-3">
          <img className="icon col-3" src={phoneticsicon} />
          <div className="col-9">
            <h2 className="subtitle">Expertos en Fonética</h2>
            <p>
              La Fonética es uno de nuestros fuertes, y las clases son impartidas por
              fonetístas especializados
            </p>
          </div>
        </div>
        <div className="row text-left p-3">
          <img
            className="icon col-3"
            src={clock_icon}
            style={{ width: '55px', height: '55px' }}
          />
          <div className="col-9 m-auto">
            <h2 className="subtitle">Horario Flexible 24h</h2>
          </div>
        </div>
      </article>

      <article className="mt-5" id="mobil-slide-3" style={{ position: 'relative' }}>
        <header className="col-12 slide-title mb-2">
          <div className="circle p-circle d-flex justify-content-start">
            <h1 className="m-auto">Como funciona</h1>
          </div>
        </header>
        <div
          className="circle-slide-3 g-circle"
          style={{ position: 'absolute', top: '100px', left: '40px' }}
        ></div>
        <div
          className="row justify-content-end mx-2"
          style={{ position: 'relative', bottom: '30px' }}
        >
          <img
            className="circle-image img-fluid align-self-center "
            src={robot_circle}
            style={{ position: 'relative', left: '10px' }}
          />
          <h2
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '200px',
              whiteSpace: 'nowrap'
            }}
          >
            Branak no es una apliación
          </h2>
        </div>
        <div
          className="row justify-content-start mx-2"
          style={{ position: 'relative', bottom: '45px' }}
        >
          <img
            className="circle-image img-fluid align-self-center "
            src={crowd_circle}
            style={{ position: 'relative', right: '10px' }}
          />
          <h2 style={{ position: 'absolute', top: '50%', right: '0', width: '220px' }}>
            No es una escuela gigante
          </h2>
        </div>
        <div
          className="row justify-content-end mx-2"
          style={{ position: 'relative', bottom: '55px' }}
        >
          <img
            className="circle-image img-fluid align-self-center "
            src={teacher_circle}
            style={{ position: 'relative', left: '10px' }}
          />
          <h2
            className="text-left"
            style={{ position: 'absolute', top: '60%', left: '0', width: '240px' }}
          >
            Nuestro equipo conoce por nombre a cada estudiante y como aprende
          </h2>
        </div>
        <div
          className="row justify-content-start mx-2"
          style={{ position: 'relative', bottom: '70px' }}
        >
          <img
            className="col-9 img-fluid align-self-center "
            src={student_circle}
            style={{ position: 'relative', right: '10px' }}
          />
          <div style={{ position: 'relative', top: '-20px' }}>
            <div
              className="circle-slide-3 p-circle"
              style={{ position: 'absolute', top: '-80px', right: '20px' }}
            ></div>
            <p className="text-left">
              Las clases son conducidas por un profesor cara a cara y en tiempo real. En
              Branak inicialmente recibirás una entrevista online donde evaluaremos tu
              Inglés y conoceremos tus metas de aprendizaje. A partir de allí
              personalizaremos nuestro curso de Ingles adaptado a tus necesidades.Solo
              necesitas un dispositivo movil, tablet o computador personal y elejir dentro
              de nuestro horario 24/7 el horario que te conviene
            </p>
          </div>
        </div>
      </article>

      <article className="" id="mobil-slide-4">
        <header className="col-12 slide-title">
          <div className="circle dp-circle d-flex justify-content-center">
            <h1 className="m-auto">Metodología</h1>
          </div>
        </header>
        <img alt="" className="img-fluid" src={brain} />
        <p
          className="text-left mb-4"
          style={{ fontStyle: 'italic', lineHeight: 'normal' }}
        >
          Conocer como adquiere el cerebro un idioma es lo que más nos ayuda a enseñarlo
        </p>
        <p className="text-left">
          Los idiomas no se aprenden, se adquieren. El método de enseñanza consiste en
          recrear el proceso natural de adquisición del idioma primario, pero de manera
          sistemática, no por exposición. Conocemos parte del proceso cognitivo que tiene
          lugar en el cerebro y que hace posible el lenguaje hablado y la adquisición de
          un idioma. Logramos optimizar el potencial de este proceso por medio a la
          inducción fonética, una de las practicas más efectivas de nuestras clases de
          Inglés .
        </p>
      </article>

      <article className=" mt-5" id="mobil-slide-5">
        <header className="col-12 slide-title">
          <div className="circle g-circle d-flex justify-content-center">
            <div className="m-auto" style={{ position: 'relative', bottom: '10px' }}>
              <h2 className="text-center">Pilar 1</h2>
              <h1 className="text-center">Fonética</h1>
            </div>
          </div>
        </header>
        <img alt="" className="img-fluid mb-4" src={mouth} />
        <p className="text-left">
          El secreto para hablar buen Inglés está en su pronunciacion, el Inglés es un
          idioma esencialmente acústico y dominar sus sonidos es el mayor desafio que las
          personas tienen para hablarlo El proceso de aprendizaje resulta bastante simple
          y rápido para nuestros estudiantes porque nuestra herramienta fundamental de
          enseñanza es la fonética y con ella nuestros estudiantes se familiarizan con los
          sonidos del Ingles de una manera plena Nuestras clases de fonética también son
          requeridas por hablantes experimentados que buscan una real o mayor fluidez en
          el idioma.
        </p>
      </article>

      <article className="mt-5" id="mobil-slide-6">
        <header className="col-12 slide-title">
          <div className="circle p-circle d-flex justify-content-start">
            <div className="m-auto" style={{ position: 'relative', bottom: '10px' }}>
              <h2 className="text-left">Pilar 2</h2>
              <h1 className="text-left">Estructura/Grámatica</h1>
            </div>
          </div>
        </header>
        <img alt="" className="img-fluid" src={arbol_enseñanza} />
        <p className="square m-0 text-left">
          como segundo componente, estas clases de fonética se combinan con la enseñanza
          de la estructura del Inglés, en una especie de gramática simplificada, pero
          procurando que el estudiante domine tanto la métrica como el uso práctico de
        </p>
      </article>

      <article className=" mt-5" id="mobil-slide-7">
        <header className="col-12 slide-title">
          <div className="circle dp-circle d-flex justify-content-center">
            <div className="m-auto" style={{ position: 'relative', bottom: '10px' }}>
              <h2 className="text-center">Pilar 3</h2>
              <h1 className="text-left">Conversación</h1>
            </div>
          </div>
        </header>
        <section className="" style={{ position: 'relative', marginBottom: '100px' }}>
          <img alt="" className="img-fluid " src={conversation} />
          <div
            className="circle-p m-auto d-flex"
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-10px',
              color: 'white'
            }}
          >
            <div className="m-auto text-center">
              <h1 style={{ fontSize: '1.6rem' }}>3 Conversación</h1>
              <p
                className="text-left pl-3"
                style={{ fontSize: '1.1rem', color: 'white', lineHeight: 'normal' }}
              >
                Romper el hielo y la timidez, ejercitar desarollar un lenguaje
                completamente fluido y natural
              </p>
            </div>
          </div>
        </section>
      </article>

      <article className="" id="mobil-slide-8">
        <div
          className="row justify-content"
          style={{
            margin: '0',
            position: 'relative',
            backgroundColor: 'rgba(255,255,255,0.3)'
          }}
        >
          <h1 className="text-center col-12">El curso</h1>
          <img alt="" className="img-fluid col-8 align-self-center" src={sprinter} />
        </div>
        <section className="row niveles text-left ">
          <div
            className="col-9 mt-4 offset-3 p-2"
            style={{ backgroundColor: 'rgba(239,80,252,0.2)' }}
          >
            <img alt="" className="number" src={number3} />
            <ul className="p-0 m-0">
              <li>
                Puedes hacer exposiciones y, y hasta ser bastante convincente
                desarrollando tus argumentos
              </li>
              <li>
                Puedes mantener largas conversaciones sin necesidad de ser asistido o
                corregido regularmente
              </li>
              <li className="m-0">
                Puedes hablar Inglés con fluidez y naturalidad, y asumir cualquier
                posicion gerencial donde solo se hable Ingles. Tambien puedes tomar
                nuestro curso especial de oratoria y literatura
              </li>
            </ul>
          </div>
          <div
            className="col-9 mx-auto p-2"
            style={{ backgroundColor: 'rgba(0,255,0,0.2)' }}
          >
            <img alt="" className="number" src={number2} />
            <ul className="p-0 m-0">
              <li>
                Comienza a hablar de lo cotidiano extendiendo tambien tu vocabulario
              </li>
              <li>
                Comienza a pensar en Inglés y a entender poco a poco a hablantes diversos
              </li>
              <li className="m-0">
                Comienza a aumentar tu velocidad de conversación e interpretacion, ya
                podras hacer correciones ayudando tambiién a otros
              </li>
            </ul>
          </div>
          <div className="col-9 p-2" style={{ backgroundColor: 'rgba(31,227,252,0.2)' }}>
            <img alt="" className="number" src={number1} />
            <ul className="p-0 m-0">
              <li>Conoce bien la ciencia de aprender un nuevo idioma</li>
              <li>
                Familiarizate con los sonidos del Inglés y comprende la estructura
                elemental
              </li>
              <li className="m-0">
                Adquiere una solida base que te dará confianza y te permitirá comunicacion
                simples pero consciente
              </li>
            </ul>
          </div>
        </section>
        <p className="text-left">
          El curso standard de Branak comprende 3 niveles: Básico, Intermedio, y Avanzado.
          Luego de esto hay un nivel Special (opcional) que abarca oratoria y literatura
          con objetivos de refinamiento. Hay cursos especiales también donde se trabaja
          algun aspecto particular del idioma o donde el estudiante tiene un objetivo
          específico de aprendizaje. Por ahora
        </p>
      </article>

      <article className="mt-5" id="mobil-slide-9">
        <header className="col-12 slide-title">
          <div className="circle p-circle d-flex justify-content-start">
            <div className="m-auto">
              <h1>Tipos de Clases</h1>
            </div>
          </div>
        </header>
        <section className="row">
          <div className="offset-1 col-3 d-flex flex-column align-items-center">
            <img
              alt=""
              className="img-fluid m-auto"
              src={individual_class_icon}
              style={{ width: 'auto' }}
            />
            <h2 style={{ whiteSpace: 'nowrap', fontSize: '1rem' }}>
              Clases individuales
            </h2>
          </div>
          <div className="offset-4 col-3 d-flex flex-column align-items-center">
            <img
              alt=""
              className="img-fluid m-auto"
              src={group_class_icon}
              style={{ width: 'auto' }}
            />
            <h2 style={{ whiteSpace: 'nowrap', fontSize: '1rem' }}>Clases de Grupo</h2>
          </div>
        </section>
        <section className="row text-left ">
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
        <h1 className="text-center">Profesores</h1>
        <section className="row ">
          <img
            alt="teacher smiling"
            className="img-fluid m-auto col-12 align-self-center"
            src={teacher2}
          />
          <p className="m-auto col-12 text-left">
            Todos los profesores son hablantes nativos del idioma Inglés, de tal manera
            que, puedan transmitir a los estudiantes la correcta pronunciación del Inglés.
            Los maestros en Branak son gente apasionada por la enseñanza, este ha sido el
            principal requisito de su selección
          </p>
        </section>
      </article>

      <article className="mt-5" id="mobil-slide-10">
        <header className="col-12 slide-title">
          <div className="circle dp-circle d-flex justify-content-start">
            <div className="m-auto">
              <h1 className="text-left">Literatura</h1>
              <h2 className="text-left">El cuarto nivel opcional</h2>
            </div>
          </div>
        </header>
        <img alt="" className="img-fluid" src={feather} />
        <p className="text-left">
          Conoce lo más bello del idioma, y deja que esa belleza también sea parte de una
          mejor forma de comunicarte. Disfruta del arte que más se disfruta, y el que más
          ha influido la sociedad humana a traves de la historia …la literatura Este es un
          peldaño más arriba de lo ordinario; un curso para quienes quieren llegar más
          lejos, expresarse mejor, y disfrutar el idioma como arte escencial Conoce los
          clásicos, los vanguardistas, los movimientos literarios, los estilos, y sobre
          todo, maneja las técnicas en una métrica lineal de la mano de un linguista
          especializado Este curso va dirigido a estudiantes del Inglés como segunda
          lengua cuando ya dominan bastante el idioma; muchas veces cuando ya han
          completado nuestro curso Standard de Branak. Está dirigido también a hablantes
          nativos del Inglés que buscan refinamiiento por objetivos académicos o por el
          disfrute del arte literario
        </p>
      </article>

      <article className="mt-5" id="mobil-slide-11">
        <header className="col-12 slide-title">
          <div className="circle g-circle d-flex justify-content-start">
            <div className="m-auto">
              <h1 className="text-left">Oratoria</h1>
              <h2 className="text-left">El quinto nivel opcional</h2>
            </div>
          </div>
        </header>
        <img alt="" className="img-fluid" src={mic_audience} />
        <p className="text-left">
          Micrófono al frente, un silencio repentino ha invadido el auditorio y todos
          clavan la mirada sobre ti. Están a la expectative de lo que tienes que decir,
          estás un poco nervioso, pero ya no hay tiempo para pensarlo …es tu turno, mejor
          que lo hagas bien, muy bien Si vas a hablar en público es bueno que estes bien
          preparado, no solo respecto al material a mostrar, sino a la forma en que hagas
          tu exposicion. Las palabras que uses, como las uses, la pronunciación, la
          modulación, entonación, el ritmo, las pausas, la coneccion con el público, la
          postura, la confianza, y el crescendo final, …todo lo que haga que tu mensaje
          sea efectivo y realmente convincente. ya sea que el Inglés sea tu lengua nativa
          o tu Segundo idioma aprendido,
        </p>
        <img alt="" className="img-fluid p-5" src={martinlutherking} />
        <p className="text-left">
          en Branak te puedemos ayudar a llegar a ser un excelente orador y asegurar el
          éxito en tus charlas, tus presentaciones o conferencias En caso de que no no
          hayas tomado el curso aún, y y que ya tengas una presentación en agenda, te
          podemos ayudar a que la misma sea un exito cercano
        </p>
      </article>

      <article className=" mt-5" id="mobil-slide-12">
        <div
          className="circle p-circle d-flex justify-content-start"
          style={{ marginBottom: '50px', transform: 'translateX(50%)' }}
        >
          <div className="m-auto">
            <h1 className="text-center" style={{ whiteSpace: 'nowrap' }}>
              Porque elegir Branak
            </h1>
          </div>
        </div>
        <ul className="text-left ml-2" style={{ fontSize: '1.3rem' }}>
          <li>
            Porque somos la escuela más personalizada en la red
            <img
              alt=""
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-5px',
                height: '20px',
                width: 'auto'
              }}
            />
          </li>
          <li>
            Tenemos el método de enseñanza más científico y natural
            <img
              alt=""
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-5px',
                height: '20px',
                width: 'auto'
              }}
            />
          </li>
          <li>
            La fonética es nuestra mayor especialidad, y es la mayor dificultad de la
            gente al aprender
            <img
              alt=""
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-5px',
                height: '20px',
                width: 'auto'
              }}
            />
          </li>
          <li>
            Nuestros profesores son gente a las que les apasiona enseñar
            <img
              alt=""
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-5px',
                height: '20px',
                width: 'auto'
              }}
            />
          </li>
          <li>
            Simplificamos los procesos, Y el aprendizaje
            <img
              alt=""
              src={cotejo}
              style={{
                margin: 'auto',
                display: 'inline',
                position: 'relative',
                top: '-5px',
                height: '20px',
                width: 'auto'
              }}
            />
          </li>
        </ul>
        <div
          className="circle p-circle d-flex justify-content-start"
          style={{ marginTop: '50px' }}
        >
          <div className="m-auto">
            <h2 className="text-left" style={{ whiteSpace: 'nowrap' }}>
              Cómo Empezar?
            </h2>
          </div>
        </div>

        <section className="row" id="pasos">
          <div className="col-4 p-4">
            <img alt="" src={number1byhand} style={{ width: '60px', margin: 'auto' }} />
            <p className="text-center">
              Tome un examen de nivel o una entrevista en linea
            </p>
          </div>
          <div className="col-4 p-4">
            <img alt="" src={number2byhand} style={{ width: '60px', margin: 'auto' }} />
            <p className="text-center">
              Regístrese despues de tomar su examen o entrevista
            </p>
          </div>
          <div
            className="col-4 p-4 d-flex flex-column"
            style={{ position: 'relative', top: '-175px' }}
          >
            <img
              alt=""
              src={fingers}
              style={{
                margin: 'auto',
                position: 'relative',
                left: '-125px',
                top: '55px',
                width: '170px'
              }}
            />
            <img alt="" src={number3byhand} style={{ width: '60px', margin: 'auto' }} />
            <p className="text-center">Listo, es su primer dia de clases</p>
          </div>
        </section>
        <p className="text-left">
          Solicita mediante el chat
          <img alt="" src={chat2} style={{ width: '36px' }} />
          una entravista en linea donde des a conocer tus objetivos, experiencia con el
          idioma, y posibles dificultades; esta entrevista puede servir también para
          conocer más el programa y coordinar un horario de clases con un representante.
          También puedes programar esta entrevista en el siguiente enlace
          <img alt="" src={program1} style={{ display: 'inline', width: '36px' }} />
        </p>
      </article>
    </Fragment>
  );
};

export default React.memo(Movil);
